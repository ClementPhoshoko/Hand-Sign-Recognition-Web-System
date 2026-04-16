import { useMemo, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useMediaDevices from '../../../hooks/useMediaDevices'
import DevicePicker from '../DevicePicker'
import PrimaryModal from '../../../components/modals/primary/PrimaryModal'
import './MeetingId.css'

function MeetingId() {
	const navigate = useNavigate()
	const {
		videoRef,
		screenVideoRef,
		cameraOn,
		micOn,
		screenOn,
		audioLevel,
		errors,
		devices,
		selectedDevices,
		toggleCamera,
		toggleMic,
		toggleScreenShare,
		switchDevice,
	} = useMediaDevices()

	const [layoutMode, setLayoutMode] = useState('stage')
	const [isAutoLayout, setIsAutoLayout] = useState(true)
	const [isVideoMaximized, setIsVideoMaximized] = useState(false)
	const [pinnedParticipant, setPinnedParticipant] = useState('Host Camera')
	const [isSpeakerOn, setIsSpeakerOn] = useState(true)
	const [isFullScreen, setIsFullScreen] = useState(false)
	const [isHostSpeaking, setIsHostSpeaking] = useState(false) // New state for host speaking status
	const [currentPage, setCurrentPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	const [activePanel, setActivePanel] = useState('people') // 'people' | 'info' | 'transcript'
	const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
	const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
	const participantsPerPage = 6

	const scrollRef = useRef(null) // Ref for the scrollable body container

	const [transcriptData, setTranscriptData] = useState([
		{ id: 1, time: '10:02', speaker: 'Lebo M.', text: 'Hi everyone, thanks for joining the strategy meeting today.' },
		{ id: 2, time: '10:03', speaker: 'Ana K.', text: 'Glad to be here. Excited to see the new project updates.' },
		{ id: 3, time: '10:05', speaker: 'Host Camera', text: 'Let\'s start by reviewing the Q2 goals. I\'ll share my screen.' },
		{ id: 4, time: '10:07', speaker: 'David N.', text: 'The timeline for the Alpha phase looks solid, but we need to verify the resources.' },
		{ id: 5, time: '10:10', speaker: 'Nia S.', text: 'I can help with the resource allocation audit next week.' },
		{ id: 6, time: '10:12', speaker: 'Lebo M.', text: 'I\'ll share the project timeline again.' },
		{ id: 7, time: '10:14', speaker: 'Ana K.', text: 'I\'ll share the project updates.' },
		{ id: 8, time: '10:16', speaker: 'Host Camera', text: 'We\'ll continue the discussion.' },
		{ id: 9, time: '10:18', speaker: 'David N.', text: 'I\'ll share the project updates.' },
		{ id: 10, time: '10:20', speaker: 'Nia S.', text: 'I can help with the resource allocation audit next week.' },
		{ id: 11, time: '10:22', speaker: 'Lebo M.', text: 'I\'ll share the project timeline again.' },
		{ id: 12, time: '10:24', speaker: 'Ana K.', text: 'I\'ll share the project updates.' },
		{ id: 13, time: '10:26', speaker: 'Host Camera', text: 'We\'ll continue the discussion.' },
		{ id: 14, time: '10:28', speaker: 'David N.', text: 'I\'ll share the project updates.' },
		{ id: 15, time: '10:30', speaker: 'Nia S.', text: 'Adding more rows to test scrolling performance.' },
		{ id: 16, time: '10:32', speaker: 'Lebo M.', text: 'Row 16 of the transcript is here.' },
		{ id: 17, time: '10:34', speaker: 'Ana K.', text: 'Row 17 confirming the scroll works.' },
		{ id: 18, time: '10:36', speaker: 'David N.', text: 'Row 18 - checking if this is visible.' },
		{ id: 19, time: '10:38', speaker: 'Host Camera', text: 'Row 19 - almost at twenty.' },
		{ id: 20, time: '10:40', speaker: 'Nia S.', text: 'Row 20 - scrolling should definitely be active now.' },
	])

	// Effect to update isHostSpeaking based on audioLevel
	useEffect(() => {
		// Define a threshold for audio level to consider someone "speaking"
		const speakingThreshold = 0.05 // Adjust this value as needed
		setIsHostSpeaking(audioLevel > speakingThreshold)
	}, [audioLevel])

	// Auto-scroll to bottom for transcripts
	useEffect(() => {
		if (activePanel === 'transcript' && shouldAutoScroll && scrollRef.current) {
			const { scrollHeight, clientHeight } = scrollRef.current;
			scrollRef.current.scrollTo({
				top: scrollHeight - clientHeight,
				behavior: 'smooth'
			});
		}
	}, [transcriptData, activePanel, shouldAutoScroll]);

	const handleScroll = () => {
		if (!scrollRef.current) return;
		const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
		// If user is near the bottom (within 20px), enable auto-scroll
		const isAtBottom = scrollHeight - scrollTop <= clientHeight + 20;
		setShouldAutoScroll(isAtBottom);
	};

	// Single piece of state: which menu is open ('view' | 'info' | null)
	const [openMenu, setOpenMenu] = useState(null)

	const meetingPageRef = useRef(null)
	const viewportRef = useRef(null)
	const viewMenuRef = useRef(null)

	const meetingCode = 'HSR-2419'
	const roomName = 'Project Alpha - Strategy Meeting'

	// Close when clicking outside view menu
	useEffect(() => {
		const handleClickOutside = (e) => {
			const insideView = viewMenuRef.current?.contains(e.target)
			if (!insideView) setOpenMenu(null)
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	// Close on Escape
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') setOpenMenu(null)
		}
		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [])

	// Track native fullscreen state
	useEffect(() => {
		const handleFullScreenChange = () => {
			setIsFullScreen(!!document.fullscreenElement)
		}
		document.addEventListener('fullscreenchange', handleFullScreenChange)
		return () => document.removeEventListener('fullscreenchange', handleFullScreenChange)
	}, [])

	const toggleMenu = (name) => setOpenMenu((prev) => (prev === name ? null : name))

	const handlePillClick = (panelName) => {
		setActivePanel(panelName)
		// If in native fullscreen, exit it
		if (document.fullscreenElement) {
			document.exitFullscreen()
		}
		// Exit maximized video mode
		setIsVideoMaximized(false)
		// Switch layout manually
		setIsAutoLayout(false)
		
		// Transcript is docked to Stage view; others go to Grid/Gallery view
		if (panelName === 'transcript') {
			setLayoutMode('stage')
		} else {
			setLayoutMode('grid')
		}
	}

	const toggleFullScreen = async () => {
		if (!document.fullscreenElement) {
			try {
				await viewportRef.current?.requestFullscreen()
			} catch (err) {
				console.error(`Error attempting to enable full-screen mode: ${err.message}`)
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen()
			}
		}
		setOpenMenu(null)
	}

	const participants = useMemo(
		() => [
			{ id: 'cam-host', name: 'Host Camera', initials: 'HC', role: 'Presenter', status: 'Live', sharing: false, isSpeaking: isHostSpeaking },
			{ id: 'cam-1', name: 'Lebo M.', initials: 'LM', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-2', name: 'Ana K.', initials: 'AK', role: 'Participant', status: 'Muted', sharing: false, isSpeaking: false },
			{ id: 'cam-3', name: 'David N.', initials: 'DN', role: 'Participant', status: 'Online', sharing: false, isSpeaking: true },
			{ id: 'cam-4', name: 'Nia S.', initials: 'NS', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-5', name: 'Marcus T.', initials: 'MT', role: 'Participant', status: 'Muted', sharing: false, isSpeaking: false },
			{ id: 'cam-6', name: 'Sarah J.', initials: 'SJ', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-7', name: 'James W.', initials: 'JW', role: 'Participant', status: 'Muted', sharing: false, isSpeaking: false },
			{ id: 'cam-8', name: 'Elena R.', initials: 'ER', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-9', name: 'Frank G.', initials: 'FG', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-10', name: 'Grace H.', initials: 'GH', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-11', name: 'Ivan I.', initials: 'II', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-12', name: 'Judy K.', initials: 'JK', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-13', name: 'Kevin L.', initials: 'KL', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-14', name: 'Mia N.', initials: 'MN', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-15', name: 'Oscar P.', initials: 'OP', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-16', name: 'Quinn R.', initials: 'QR', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-17', name: 'Sam T.', initials: 'ST', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
			{ id: 'cam-18', name: 'Uma V.', initials: 'UV', role: 'Participant', status: 'Online', sharing: false, isSpeaking: false },
		],
		[isHostSpeaking]
	)

	const filteredParticipants = useMemo(() => {
		if (!searchQuery) return participants
		return participants.filter((p) =>
			p.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
	}, [participants, searchQuery])

	const totalPages = Math.ceil(filteredParticipants.length / participantsPerPage)
	const displayedParticipants = useMemo(() => {
		const start = (currentPage - 1) * participantsPerPage
		return filteredParticipants.slice(start, start + participantsPerPage)
	}, [filteredParticipants, currentPage, participantsPerPage])

	// Reset to page 1 when search changes
	useEffect(() => {
		setCurrentPage(1)
	}, [searchQuery])

	const someoneIsSharing = useMemo(
		() => participants.some((p) => p.sharing) || screenOn,
		[participants, screenOn]
	)

	const autoLayoutMode = useMemo(() => {
		if (someoneIsSharing) return 'stage'
		return 'grid'
	}, [someoneIsSharing])

	const effectiveLayoutMode = (screenOn || activePanel === 'transcript') ? 'stage' : (isAutoLayout ? autoLayoutMode : layoutMode)
	const isGridMode = effectiveLayoutMode === 'grid'
	const canMaximizeVideo = !isGridMode
	const isVideoEffectivelyMaximized = canMaximizeVideo && isVideoMaximized

	const autoLayoutReason =
		someoneIsSharing
			? screenOn
				? 'Screen sharing (Local)'
				: 'Screen sharing (Peer)'
			: 'No active share'

	const layoutClassName = [
		'gl-meeting-layout',
		`gl-meeting-layout--${effectiveLayoutMode}`,
		isVideoEffectivelyMaximized ? 'gl-meeting-layout--video-max' : '',
		screenOn ? 'is-sharing' : '',
	]
		.filter(Boolean)
		.join(' ')

	const onLayoutModeChange = (mode) => {
		if (isAutoLayout) return
		setLayoutMode(mode)
		if (mode === 'grid') setIsVideoMaximized(false)
		setOpenMenu(null)
	}

	const onToggleVideoMaximize = () => {
		if (!canMaximizeVideo || isAutoLayout) return
		setIsVideoMaximized((prev) => !prev)
		toggleFullScreen()
		setOpenMenu(null)
	}

	const onToggleAutoLayout = () => {
		setIsAutoLayout((prev) => !prev)
		if (document.fullscreenElement) {
			document.exitFullscreen()
		}
		setOpenMenu(null)
	}

	const onLeaveMeeting = () => {
		setShowLeaveConfirm(true)
	}

	const handleConfirmLeave = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen()
		}
		navigate('/liveroom')
	}

	const handleCancelLeave = () => {
		setShowLeaveConfirm(false)
	}

	return (
		<div className="gl-meeting-page" ref={meetingPageRef}>
			{/* ── NEW: Persistent Meeting Controls Bar ── */}
			<header className="gl-meeting-controls-bar">
				<h2 className="gl-controls-title">{roomName}</h2>

				{/* Toolbar: React-controlled dropdowns */}
				<div className="gl-meeting-toolbar" aria-label="Meeting controls">
					{/* View dropdown */}
					<div className="gl-toolbar-menu" ref={viewMenuRef}>
						<button
							type="button"
							className={`gl-toolbar-pill${openMenu === 'view' ? ' is-open' : ''}`}
							aria-haspopup="true"
							aria-expanded={openMenu === 'view'}
							aria-label="Meeting view options"
							onClick={() => toggleMenu('view')}
						>
							<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-pill-icon">
								<path d="M4 6h7v5H4V6Zm9 0h7v5h-7V6ZM4 13h7v5H4v-5Zm9 2.5 3-2.5 3 2.5-3 2.5-3-2.5Z" fill="currentColor" />
							</svg>
							<span>View</span>
							<svg
								viewBox="0 0 24 24"
								aria-hidden="true"
								className={`gl-pill-caret${openMenu === 'view' ? ' is-flipped' : ''}`}
							>
								<path d="m7 10 5 5 5-5H7Z" fill="currentColor" />
							</svg>
						</button>

						{openMenu === 'view' && (
							<div className="gl-toolbar-menu__panel" role="menu">
								<button
									type="button"
									className="gl-toolbar-menu__item"
									role="menuitem"
									onClick={onToggleAutoLayout}
								>
									<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
										<path d="M12 3 4 7v6c0 5 3.4 8.4 8 8.9 4.6-.5 8-3.9 8-8.9V7l-8-4Zm0 3.2 5 2.5v4.3c0 3.3-2 5.8-5 6.6-3-.8-5-3.3-5-6.6V8.7l5-2.5Z" fill="currentColor" />
									</svg>
									{isAutoLayout ? 'Auto layout: On' : 'Auto layout: Off'}
								</button>

								<button
									type="button"
									className="gl-toolbar-menu__item"
									role="menuitem"
									onClick={() => onLayoutModeChange(isGridMode ? 'stage' : 'grid')}
									disabled={isAutoLayout || screenOn}
									title={screenOn ? 'Layout is locked to Stage while you are sharing' : undefined}
								>
									{isGridMode ? (
										<>
											<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
												<path d="M3 5h18v14H3V5Zm2 2v10h14V7H5Z" fill="currentColor" />
											</svg>
											Stage view (Manual)
										</>
									) : (
										<>
											<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-pill-icon">
												<path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
											</svg>
											Grid view (Manual)
										</>
									)}
								</button>

								<button
									type="button"
									className="gl-toolbar-menu__item"
									role="menuitem"
									onClick={onToggleVideoMaximize}
									disabled={!canMaximizeVideo}
								>
									{isFullScreen ? (
										<>
											<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
												<path d="M4 14h6v6H8v-4H4v-2Zm10 6h2v-4h4v-2h-6v6ZM4 4h6v6H8V6H4V4Zm16 0v6h-6V4h2v2h4V4Z" fill="currentColor" />
											</svg>
											Restore screen
										</>
									) : (
										<>
											<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
												<path d="M4 10V4h6v2H6v4H4Zm10-6h6v6h-2V6h-4V4ZM4 20v-6h2v4h4v2H4Zm14-6h2v6h-6v-2h4v-4Z" fill="currentColor" />
											</svg>
											Full screen view
										</>
									)}
								</button>

								<button
									type="button"
									className="gl-toolbar-menu__item"
									role="menuitem"
									onClick={toggleScreenShare}
								>
									<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
										<path d="M3 5h18v11H3V5Zm2 2v7h14V7H5Zm5 11h4v2h-4v-2Z" fill="currentColor" />
									</svg>
									{screenOn ? 'Stop screen sharing' : 'Start screen sharing'}
								</button>
							</div>
						)}
					</div>

					<div className="gl-toolbar-sep" aria-hidden="true" />

					{/* Participants toggle */}
					<button
						type="button"
						className={`gl-toolbar-pill${activePanel === 'people' ? ' is-open' : ''}`}
						onClick={() => handlePillClick('people')}
						aria-label={`Participants: ${participants.length}`}
					>
						<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-pill-icon">
							<path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 2a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0 2c-2.2 0-4 1.2-4 2.7V20h8v-2.3C12 16.2 10.2 15 8 15Zm8-2c-2.7 0-5 1.6-5 3.5V20h10v-3.5C21 14.6 18.7 13 16 13Z" fill="currentColor" />
						</svg>
						<span>People</span>
						<span className="gl-toolbar-badge">{participants.length}</span>
					</button>

					{/* Transcript toggle */}
					<button
						type="button"
						className={`gl-toolbar-pill${activePanel === 'transcript' ? ' is-open' : ''}`}
						onClick={() => handlePillClick('transcript')}
						aria-label="Meeting transcript"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-pill-icon">
							<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" fill="currentColor" />
						</svg>
						<span>Transcript</span>
					</button>

					{/* Info toggle */}
					<button
						type="button"
						className={`gl-toolbar-pill${activePanel === 'info' ? ' is-open' : ''}`}
						onClick={() => handlePillClick('info')}
						aria-label="Meeting information"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-pill-icon">
							<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" fill="currentColor" />
						</svg>
						<span>Info</span>
					</button>
				</div>

				{/* Leave button remains in header for accessibility/escape route */}
				<div className="gl-meeting-media-controls" role="group" aria-label="Essential controls">
					<button
						type="button"
						className="gl-media-btn gl-media-btn--leave"
						onClick={onLeaveMeeting}
						aria-label="Leave meeting"
						title="Leave"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M3 12.4c2.1-2.1 5.3-3.4 9-3.4s6.9 1.3 9 3.4l-2.4 2.5a9.7 9.7 0 0 0-13.2 0L3 12.4Zm9 2.2a1.9 1.9 0 0 1 1.9 1.9v3a1.9 1.9 0 0 1-3.8 0v-3A1.9 1.9 0 0 1 12 14.6Z" fill="currentColor" />
						</svg>
					</button>
				</div>
			</header>

			<section className={layoutClassName} aria-label="Meeting room layout">
				{!isGridMode && (
					<section className="gl-stage" aria-label="Primary video stage">
						<div className="gl-stage__viewport" role="img" aria-label="Main stage video preview" ref={viewportRef}>
							{/* Video Feed (Screen Share has priority) */}
							{screenOn ? (
								<video
									ref={screenVideoRef}
									className="gl-stage__video is-screen-share"
									autoPlay
									playsInline
								/>
							) : cameraOn ? (
								<video
									ref={videoRef}
									className="gl-stage__video"
									autoPlay
									playsInline
									muted
								/>
							) : (
								<div className="gl-stage__placeholder">
									No one is sharing or has their camera on.
								</div>
							)}

							{/* Floating Media Controls inside viewport */}
							<div className="gl-viewport-controls liveroom-preview__controls" role="group" aria-label="Media controls">
								{/* Audio level indicator — always visible */}
								<div className="liveroom-audio-level" aria-hidden="true" data-tooltip="Audio Level Indicator">
									{[0.02, 0.06, 0.12, 0.20, 0.35].map((threshold, i) => (
										<span
											key={i}
											className={`liveroom-audio-level__bar${audioLevel >= threshold ? ' liveroom-audio-level__bar--active' : ''}`}
										/>
									))}
								</div>

								<DevicePicker
									kind="audioinput"
									label="Microphone"
									devices={devices.audioinput}
									selectedId={selectedDevices.audioinput}
									onSelect={switchDevice}
									icon={
										<button
											type="button"
											className={`liveroom-ctrl liveroom-ctrl--mic${micOn ? ' liveroom-ctrl--mic-on' : ' liveroom-ctrl--off'}${errors.mic ? ' liveroom-ctrl--error' : ''}`}
											onClick={(e) => {
												e.stopPropagation()
												toggleMic()
											}}
											aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'}
											data-tooltip={micOn ? 'Mic on' : 'Mic off'}
										>
											{micOn ? (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
													<path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
														stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"
														stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											) : (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
													<path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
														stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"
														stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
													<line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
												</svg>
											)}
										</button>
									}
								/>

								<DevicePicker
									kind="videoinput"
									label="Camera"
									devices={devices.videoinput}
									selectedId={selectedDevices.videoinput}
									onSelect={switchDevice}
									icon={
										<button
											type="button"
											className={`liveroom-ctrl liveroom-ctrl--cam${cameraOn ? ' liveroom-ctrl--cam-on' : ''}${errors.camera ? ' liveroom-ctrl--error' : ''}`}
											onClick={(e) => {
												e.stopPropagation()
												toggleCamera()
											}}
											aria-label={cameraOn ? 'Turn off camera' : 'Turn on camera'}
											data-tooltip={cameraOn ? 'Camera on' : 'Camera off'}
										>
											{cameraOn ? (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
													<path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
														stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											) : (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
													<path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
														stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													<line x1="3" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
												</svg>
											)}
										</button>
									}
								/>

								<DevicePicker
									kind="audiooutput"
									label="Speaker"
									devices={devices.audiooutput}
									selectedId={selectedDevices.audiooutput}
									onSelect={switchDevice}
									icon={
										<button
											type="button"
											className={`liveroom-ctrl liveroom-ctrl--speaker${isSpeakerOn ? ' liveroom-ctrl--on' : ' liveroom-ctrl--off'}`}
											onClick={(e) => {
												e.stopPropagation()
												setIsSpeakerOn((p) => !p)
											}}
											aria-label={isSpeakerOn ? 'Mute speaker' : 'Unmute speaker'}
											data-tooltip={isSpeakerOn ? 'Speaker on' : 'Speaker off'}
										>
											{isSpeakerOn ? (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
													<path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
														stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											) : (
												<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
													<path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
														stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
													<line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
												</svg>
											)}
										</button>
									}
								/>

								<button
									type="button"
									className={`liveroom-ctrl liveroom-ctrl--screen${screenOn ? ' liveroom-ctrl--on' : ''}${errors.screen ? ' liveroom-ctrl--error' : ''}`}
									onClick={(e) => {
										e.stopPropagation()
										toggleScreenShare()
									}}
									aria-label={screenOn ? 'Stop sharing screen' : 'Start sharing screen'}
									data-tooltip={screenOn ? 'Stop sharing' : 'Share screen'}
								>
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
										<path d="M3 5h18v11H3V5Zm2 2v7h14V7H5Zm5 11h4v2h-4v-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
							</div>

							<button
								type="button"
								className="gl-stage__maximize-btn"
								onClick={onToggleVideoMaximize}
								disabled={isAutoLayout}
								aria-label={isFullScreen ? 'Restore stage' : 'Maximize video'}
								title={isFullScreen ? 'Restore stage' : 'Maximize video'}
							>
								{isFullScreen ? (
									<svg viewBox="0 0 24 24" aria-hidden="true">
										<path d="M4 14h6v6h-2v-4H4v-2Zm10 6h2v-4h4v-2h-6v6ZM4 4h6v6H8V6H4V4Zm16 0v6h-6V4h2v2h4V4Z" fill="currentColor" />
									</svg>
								) : (
									<svg viewBox="0 0 24 24" aria-hidden="true">
										<path d="M4 10V4h6v2H6v4H4Zm10-6h6v6h-2V6h-4V4ZM4 20v-6h2v4h4v2H4Zm14-6h2v6h-6v-2h4v-4Z" fill="currentColor" />
									</svg>
								)}
							</button>
						</div>
					</section>
				)}

				{!isVideoEffectivelyMaximized && (
					<aside className="gl-people" aria-label={isGridMode ? 'Meeting gallery' : 'Meeting participants'}>
						<header className="gl-people__header">
							<div className="gl-people__meeting-info" role="region" aria-label="Meeting information">
								{activePanel === 'info' ? (
									<h2 className="gl-people__header-title">Meeting Info</h2>
								) : activePanel === 'transcript' ? (
									<h2 className="gl-people__header-title">Transcript</h2>
								) : (
									<div className="gl-people__search-wrapper">
										<svg className="gl-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<circle cx="11" cy="11" r="8"></circle>
											<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
										</svg>
										<input
											type="text"
											className="gl-people__header-search"
											placeholder="Search participants..."
											aria-label="Search participants"
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
										/>
									</div>
								)}
								<div className="gl-people__meeting-timer" aria-label="Meeting duration">
									00:00
								</div>
							</div>
						</header>

						<div 
							ref={scrollRef}
							onScroll={handleScroll}
							key={activePanel} /* Key forces a fresh render & triggers entry animations */
							className={`gl-people__body${(isGridMode && activePanel === 'people') ? ' is-grid' : ''}`}
						>
							{activePanel === 'info' ? (
								<div className="gl-meeting-info-dock">
									<h3 className="gl-info-dock__title">Meeting Details</h3>
									<div className="gl-info-dock__section">
										<label>Room Name</label>
										<p>{roomName}</p>
									</div>
									<div className="gl-info-dock__section">
										<label>Meeting Code</label>
										<div className="gl-info-dock__code-box">
											<code className='gl-info-dock__code-box-code'>{meetingCode}</code>
											<button type="button" onClick={() => navigator.clipboard.writeText(meetingCode)}>Copy</button>
										</div>
									</div>
									<div className="gl-info-dock__section">
										<label>Status</label>
										<p>{isAutoLayout ? `Auto: ${autoLayoutMode}` : `Manual: ${layoutMode}`}</p>
									</div>
									<div className="gl-info-dock__section">
										<label>Participants</label>
										<p>{participants.length} people in this meeting</p>
									</div>
									<div className="gl-info-dock__privacy">
										<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-privacy-icon">
											<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="currentColor" />
										</svg>
										<p>This meeting is secured with end-to-end encryption. Your media and data are private and protected.</p>
									</div>
								</div>
							) : activePanel === 'transcript' ? (
								<div className="gl-transcript-dock">
									{transcriptData.map((entry) => (
										<div key={entry.id} className="gl-transcript-row">
											<div className="gl-transcript-header">
												<span className="gl-transcript-speaker">{entry.speaker}</span>
												<span className="gl-transcript-time">{entry.time}</span>
											</div>
											<p className="gl-transcript-text">{entry.text}</p>
										</div>
									))}
								</div>
							) : (
								(isGridMode ? filteredParticipants : displayedParticipants).map((person) => {
									const isPinned = person.name === pinnedParticipant
									return (
										<article key={person.id} className={`gl-person-card${isPinned ? ' is-pinned' : ''}`}>
											<div className="gl-person-card__left">
												<div className={`gl-person-card__avatar${person.isSpeaking ? ' is-speaking' : ''}`}>
													{person.initials}
												</div>
												<div>
													<p className="gl-person-card__name">{person.name}</p>
													<p className="gl-person-card__meta">{person.role} · {person.status}</p>
												</div>
											</div>
											<button
												type="button"
												className="gl-person-card__pin"
												onClick={() => setPinnedParticipant(person.name)}
											>
												{isPinned ? 'Pinned' : 'Pin'}
											</button>
										</article>
									)
								})
							)}
						</div>

						{!isGridMode && activePanel === 'people' && (
							<footer className="gl-people__footer">
								<div className="gl-pagination">
									<button
										type="button"
										className="gl-pagination__btn"
										aria-label="Previous page"
										disabled={currentPage === 1}
										onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
									>
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<polyline points="15 18 9 12 15 6"></polyline>
										</svg>
										<span>Back</span>
									</button>
									<span className="gl-pagination__label">
										Page {currentPage} of {totalPages}
									</span>
									<button
										type="button"
										className="gl-pagination__btn"
										aria-label="Next page"
										disabled={currentPage === totalPages}
										onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
									>
										<span>Next</span>
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<polyline points="9 18 15 12 9 6"></polyline>
										</svg>
									</button>
								</div>
							</footer>
						)}
					</aside>
				)}
			</section>

			{/* Leave Confirmation Modal */}
			<PrimaryModal
				open={showLeaveConfirm}
				customMsg="Are you sure you want to leave the session? By exiting now, you will lose access to the live stream, real-time transcript updates, and active participant interactions. If you're currently presenting or sharing your screen, those streams will be terminated immediately. You can always rejoin later using the same meeting code."
				firstOption="Let Us Leave"
				secondOption="Let Us Stay"
				onFirstOption={handleConfirmLeave}
				onSecondOption={handleCancelLeave}
				onClose={handleCancelLeave}
			/>
		</div>
	)
}

export default MeetingId