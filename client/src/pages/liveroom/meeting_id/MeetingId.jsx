import { useMemo, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs'
import './MeetingId.css'

function MeetingId() {
	const navigate = useNavigate()
	const [layoutMode, setLayoutMode] = useState('stage')
	const [isAutoLayout, setIsAutoLayout] = useState(true)
	const [isVideoMaximized, setIsVideoMaximized] = useState(false)
	const [pinnedParticipant, setPinnedParticipant] = useState('Host Camera')
	const [hasScreenShare, setHasScreenShare] = useState(false)
	const [isCameraOn, setIsCameraOn] = useState(true)
	const [isMicOn, setIsMicOn] = useState(true)
	const [isSpeakerOn, setIsSpeakerOn] = useState(true)

	// Single piece of state: which menu is open ('view' | 'info' | null)
	const [openMenu, setOpenMenu] = useState(null)

	const viewMenuRef = useRef(null)
	const infoMenuRef = useRef(null)
	const meetingCode = 'HSR-2419'

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

	const toggleMenu = (name) => setOpenMenu((prev) => (prev === name ? null : name))

	const participants = useMemo(
		() => [
			{ id: 'cam-host', name: 'Host Camera', initials: 'HC', role: 'Presenter', status: 'Live' },
			{ id: 'cam-1', name: 'Lebo M.', initials: 'LM', role: 'Participant', status: 'Online' },
			{ id: 'cam-2', name: 'Ana K.', initials: 'AK', role: 'Participant', status: 'Muted' },
			{ id: 'cam-3', name: 'David N.', initials: 'DN', role: 'Participant', status: 'Online' },
			{ id: 'cam-4', name: 'Nia S.', initials: 'NS', role: 'Participant', status: 'Online' },
		],
		[]
	)

	const autoLayoutMode = useMemo(() => {
		if (hasScreenShare) return 'focus'
		if (participants.length >= 6) return 'grid'
		if (participants.length <= 2) return 'focus'
		return 'stage'
	}, [hasScreenShare, participants.length])

	const effectiveLayoutMode = isAutoLayout ? autoLayoutMode : layoutMode
	const isGridMode = effectiveLayoutMode === 'grid'
	const canMaximizeVideo = !isGridMode
	const isVideoEffectivelyMaximized = canMaximizeVideo && (isAutoLayout ? hasScreenShare : isVideoMaximized)

	const autoLayoutReason =
		hasScreenShare
			? 'Screen share active'
			: participants.length >= 6
				? 'Large room'
				: participants.length <= 2
					? 'Small room'
					: 'Balanced room'

	const selectedVideoTitle =
		effectiveLayoutMode === 'focus'
			? `${pinnedParticipant} • Focus view`
			: `${pinnedParticipant} • Stage view`

	const layoutClassName = [
		'gl-meeting-layout',
		`gl-meeting-layout--${effectiveLayoutMode}`,
		isVideoEffectivelyMaximized ? 'gl-meeting-layout--video-max' : '',
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
		setOpenMenu(null)
	}

	const onToggleAutoLayout = () => {
		setIsAutoLayout((prev) => !prev)
		setOpenMenu(null)
	}

	const onToggleScreenShare = () => {
		setHasScreenShare((prev) => !prev)
		setOpenMenu(null)
	}

	const onLeaveMeeting = () => navigate('/liveroom')

	return (
		<div className="gl-meeting-page">
			<Breadcrumbs />

			{/* ── NEW: Persistent Meeting Controls Bar ── */}
			<header className="gl-meeting-controls-bar">
				<h2 className="gl-controls-title">
					{isGridMode ? `Gallery View (${participants.length})` : selectedVideoTitle}
				</h2>

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
									onClick={() => onLayoutModeChange('stage')}
									disabled={isAutoLayout}
								>
									<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
										<path d="M3 5h18v14H3V5Zm2 2v10h14V7H5Z" fill="currentColor" />
									</svg>
									Stage view
								</button>

								<button
									type="button"
									className="gl-toolbar-menu__item"
									role="menuitem"
									onClick={() => onLayoutModeChange('grid')}
									disabled={isAutoLayout}
								>
									<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
										<path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
									</svg>
									Grid view
								</button>

								<button
									type="button"
									className="gl-toolbar-menu__item"
									role="menuitem"
									onClick={() => onLayoutModeChange('focus')}
									disabled={isAutoLayout}
								>
									<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
										<path d="M4 4h16v16H4V4Zm2 2v12h12V6H6Zm3 3h6v6H9V9Z" fill="currentColor" />
									</svg>
									Focus view
								</button>

								<button
									type="button"
									className="gl-toolbar-menu__item"
									role="menuitem"
									onClick={onToggleVideoMaximize}
									disabled={!canMaximizeVideo || isAutoLayout}
								>
									<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
										<path d="M4 10V4h6v2H6v4H4Zm10-6h6v6h-2V6h-4V4ZM4 20v-6h2v4h4v2H4Zm14-6h2v6h-6v-2h4v-4Z" fill="currentColor" />
									</svg>
									{isVideoEffectivelyMaximized ? 'Restore stage' : 'Maximize video'}
								</button>

								<button
									type="button"
									className="gl-toolbar-menu__item"
									role="menuitem"
									onClick={onToggleScreenShare}
								>
									<svg viewBox="0 0 24 24" aria-hidden="true" className="gl-menu-icon">
										<path d="M3 5h18v11H3V5Zm2 2v7h14V7H5Zm5 11h4v2h-4v-2Z" fill="currentColor" />
									</svg>
									{hasScreenShare ? 'Stop share (demo)' : 'Start share (demo)'}
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

				{/* Media controls */}
				<div className="gl-meeting-media-controls" role="group" aria-label="Media controls">
					<button
						type="button"
						className={`gl-media-btn${isCameraOn ? '' : ' is-muted'}`}
						onClick={() => setIsCameraOn((p) => !p)}
						aria-label={isCameraOn ? 'Turn camera off' : 'Turn camera on'}
						title="Camera"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M4 7h11a2 2 0 0 1 2 2v1.2L21 8v8l-4-2.2V15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" fill="currentColor" />
						</svg>
					</button>

					<button
						type="button"
						className={`gl-media-btn${isMicOn ? '' : ' is-muted'}`}
						onClick={() => setIsMicOn((p) => !p)}
						aria-label={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
						title="Microphone"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Zm-5-3H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2a5 5 0 1 1-10 0Z" fill="currentColor" />
						</svg>
					</button>

					<button
						type="button"
						className={`gl-media-btn${isSpeakerOn ? '' : ' is-muted'}`}
						onClick={() => setIsSpeakerOn((p) => !p)}
						aria-label={isSpeakerOn ? 'Mute speaker' : 'Unmute speaker'}
						title="Speaker"
					>
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="M4 10h4l5-4v12l-5-4H4v-4Zm12.5 2a3.5 3.5 0 0 0-1.5-2.9v5.8a3.5 3.5 0 0 0 1.5-2.9Zm2.5 0a6 6 0 0 1-3 5.2v-2.3a4 4 0 0 0 0-5.8V6.8a6 6 0 0 1 3 5.2Z" fill="currentColor" />
						</svg>
					</button>

					<div className="gl-media-sep" aria-hidden="true" />

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
						<div className="gl-stage__viewport" role="img" aria-label="Main stage video preview">
							<div className="gl-stage__badge">HD Stream</div>
						</div>
					</section>
				)}

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
			</section>
		</div>
	)
}

export default MeetingId