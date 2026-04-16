import { useMemo, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useMediaDevices from '../../../hooks/useMediaDevices'
import DevicePicker from '../DevicePicker'
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

	// Single piece of state: which menu is open ('view' | 'info' | null)
	const [openMenu, setOpenMenu] = useState(null)

	const meetingPageRef = useRef(null)
	const viewportRef = useRef(null)
	const viewMenuRef = useRef(null)
	const infoMenuRef = useRef(null)
	const meetingCode = 'HSR-2419'
	const roomName = 'Project Alpha - Strategy Meeting'

	// Close when clicking outside both menus
	useEffect(() => {
		const handleClickOutside = (e) => {
			const insideView = viewMenuRef.current?.contains(e.target)
			const insideInfo = infoMenuRef.current?.contains(e.target)
			if (!insideView && !insideInfo) setOpenMenu(null)
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
			{ id: 'cam-host', name: 'Host Camera', initials: 'HC', role: 'Presenter', status: 'Live', sharing: false },
			{ id: 'cam-1', name: 'Lebo M.', initials: 'LM', role: 'Participant', status: 'Online', sharing: false },
			{ id: 'cam-2', name: 'Ana K.', initials: 'AK', role: 'Participant', status: 'Muted', sharing: false },
			{ id: 'cam-3', name: 'David N.', initials: 'DN', role: 'Participant', status: 'Online', sharing: false },
			{ id: 'cam-4', name: 'Nia S.', initials: 'NS', role: 'Participant', status: 'Online', sharing: false },
		],
		[]
	)

	const someoneIsSharing = useMemo(
		() => participants.some((p) => p.sharing) || screenOn,
		[participants, screenOn]
	)

	const autoLayoutMode = useMemo(() => {
		if (someoneIsSharing) return 'stage'
		return 'grid'
	}, [someoneIsSharing])

	const effectiveLayoutMode = screenOn ? 'stage' : (isAutoLayout ? autoLayoutMode : layoutMode)
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
		if (document.fullscreenElement) {
			document.exitFullscreen()
		}
		navigate('/liveroom')
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

					{/* Info dropdown */}
					<div className="gl-toolbar-menu" ref={infoMenuRef}>
						<button
							type="button"
							className={`gl-toolbar-pill${openMenu === 'info' ? ' is-open' : ''}`}
							aria-haspopup="true"
							aria-expanded={openMenu === 'info'}
							aria-label="Meeting info"
							onClick={() => toggleMenu('info')}
						>
							<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-pill-icon">
								<path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z" fill="currentColor" />
							</svg>
							<span>Info</span>
							<svg
								viewBox="0 0 24 24"
								aria-hidden="true"
								className={`gl-pill-caret${openMenu === 'info' ? ' is-flipped' : ''}`}
							>
								<path d="m7 10 5 5 5-5H7Z" fill="currentColor" />
							</svg>
						</button>

						{openMenu === 'info' && (
							<div className="gl-toolbar-menu__panel" role="menu">
								<div className="gl-toolbar-menu__meta">
									<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
										<path d="M7 4h10l1 2h3v2H3V6h3l1-2Zm-2 6h14v10H5V10Zm2 2v6h10v-6H7Z" fill="currentColor" />
									</svg>
									Meeting code: {meetingCode}
								</div>
								<div className="gl-toolbar-menu__meta">
									<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
										<path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 2a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0 2c-2.2 0-4 1.2-4 2.7V20h8v-2.3C12 16.2 10.2 15 8 15Zm8-2c-2.7 0-5 1.6-5 3.5V20h10v-3.5C21 14.6 18.7 13 16 13Z" fill="currentColor" />
									</svg>
									Participants: {participants.length}
								</div>
								<div className="gl-toolbar-menu__meta">
									<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
										<path d="M4 6h16v12H4V6Zm2 2v8h12V8H6Zm4 10h4v2h-4v-2Z" fill="currentColor" />
									</svg>
									{isAutoLayout ? `Auto: ${autoLayoutMode}` : `Manual: ${layoutMode}`}
								</div>
								<div className="gl-toolbar-menu__meta">
									<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
										<path d="M12 3a9 9 0 0 0-9 9h2a7 7 0 1 1 7 7v2a9 9 0 0 0 0-18Z" fill="currentColor" />
									</svg>
									{isAutoLayout ? autoLayoutReason : 'Manual controls active'}
								</div>
							</div>
						)}
					</div>
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
							) : cameraOn && (
								<video
									ref={videoRef}
									className="gl-stage__video"
									autoPlay
									playsInline
									muted
								/>
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
							<h2 className="gl-people__title">
								{isGridMode ? 'Gallery View' : `People (${participants.length})`}
							</h2>
						</header>

						<div className={`gl-people__body${isGridMode ? ' is-grid' : ''}`}>
							{participants.map((person) => {
								const isPinned = person.name === pinnedParticipant
								return (
									<article key={person.id} className={`gl-person-card${isPinned ? ' is-pinned' : ''}`}>
										<div className="gl-person-card__left">
											<div className="gl-person-card__avatar">{person.initials}</div>
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
							})}
						</div>
					</aside>
				)}
			</section>
		</div>
	)
}

export default MeetingId