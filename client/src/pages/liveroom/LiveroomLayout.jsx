import { useState } from 'react'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import Join from './join/Join'
import New from './new/New'
import './LiveroomLayout.css'

function LiveroomLayout() {
	const [activeTab, setActiveTab] = useState('join')

	return (
		<div className="liveroom-shell">
			<Breadcrumbs />

			{/* ── Ambient orbs ── */}
			<div className="liveroom-canvas" aria-hidden="true">
				<div className="liveroom-orb liveroom-orb--1" />
				<div className="liveroom-orb liveroom-orb--2" />
			</div>

			<div className="liveroom-wrap">
				{/* ── Switch Tabs ── */}
				<div className="liveroom-tabs">
					<button
						type="button"
						className={`liveroom-tab${activeTab === 'join' ? ' liveroom-tab--active' : ''}`}
						onClick={() => setActiveTab('join')}
					>
						Join Room
					</button>
					<button
						type="button"
						className={`liveroom-tab${activeTab === 'create' ? ' liveroom-tab--active' : ''}`}
						onClick={() => setActiveTab('create')}
					>
						Create Room
					</button>
				</div>

				{/* ── Two-column body ── */}
				<div className="liveroom-body">
					{/* Left column: preview + selectors */}
					<div className="liveroom-left">
						{/* ── Preview Card ── */}
						<div className="liveroom-preview">
							{/* Header */}
							<div className="liveroom-preview__header">
								<span className="liveroom-preview__name">Clement Phoshoko</span>
								<button
									type="button"
									className="liveroom-preview__menu"
									aria-label="More options"
								>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
										<circle cx="10" cy="4" r="1.5" fill="currentColor" />
										<circle cx="10" cy="10" r="1.5" fill="currentColor" />
										<circle cx="10" cy="16" r="1.5" fill="currentColor" />
									</svg>
								</button>
							</div>

							{/* Center message */}
							<div className="liveroom-preview__body">
								<div className="liveroom-preview__status">
									<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<path
											d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<line x1="3" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
									</svg>
									<span>Camera is off</span>
								</div>
							</div>

							{/* Control buttons */}
							<div className="liveroom-preview__controls">
								{/* Microphone */}
								<button type="button" className="liveroom-ctrl liveroom-ctrl--mic" aria-label="Toggle microphone">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
										<path
											d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
											stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
										/>
										<path
											d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"
											stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
										/>
									</svg>
								</button>

								{/* Camera off */}
								<button type="button" className="liveroom-ctrl liveroom-ctrl--cam" aria-label="Toggle camera">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
										<path
											d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
											stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
										/>
										<line x1="3" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
									</svg>
								</button>

								{/* Additional control */}
								<button type="button" className="liveroom-ctrl liveroom-ctrl--extra" aria-label="More controls">
									<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
										<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
										<path
											d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
											stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
										/>
									</svg>
								</button>
							</div>
						</div>

						{/* ── Device selectors ── */}
						<div className="liveroom-selectors">
							<div className="liveroom-pill">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
									<path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
										stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M19 10v2a7 7 0 01-14 0v-2"
										stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								<span className="liveroom-pill__label">Microphone</span>
								<svg className="liveroom-pill__arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
									<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>

							<div className="liveroom-pill">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
									<path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
										stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								<span className="liveroom-pill__label">Speaker</span>
								<svg className="liveroom-pill__arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
									<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>

							<div className="liveroom-pill">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
									<path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
										stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
								<span className="liveroom-pill__label">Camera Input</span>
								<svg className="liveroom-pill__arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
									<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>

							<div className="liveroom-pill">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
									<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
									<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
								</svg>
								<span className="liveroom-pill__label">Background</span>
								<svg className="liveroom-pill__arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
									<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>
						</div>
					</div>

					{/* Right column: tab content */}
					<div className="liveroom-content">
						{activeTab === 'join' && (
							<div className="liveroom-content__panel" key="join">
								<Join />
							</div>
						)}
						{activeTab === 'create' && (
							<div className="liveroom-content__panel" key="create">
								<New />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default LiveroomLayout