import { useState } from 'react'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import useMediaDevices from '../../hooks/useMediaDevices'
import DevicePicker from './DevicePicker'
import Join from './join/Join'
import New from './new/New'
import './LiveroomLayout.css'

function LiveroomLayout() {
	const [activeTab, setActiveTab] = useState('join')
	const { videoRef, cameraOn, micOn, audioLevel, errors, devices, selectedDevices, toggleCamera, toggleMic, switchDevice } = useMediaDevices()

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

							{/* Full-bleed video — direct child of preview card */}
							{cameraOn && (
								<video
									ref={videoRef}
									className="liveroom-preview__video"
									autoPlay
									playsInline
									muted
								/>
							)}

							{/* Center — camera off / error status */}
							{!cameraOn && (
								<div className="liveroom-preview__body">
									<div className={`liveroom-preview__status${errors.camera ? ' liveroom-preview__status--error' : ''}`}>
										{errors.camera ? (
											<>
												<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
													<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
														stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													<line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
													<line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
												</svg>
												<span>{errors.camera}</span>
											</>
										) : (
											<>
												<svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
													<path
														d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
														stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
													/>
													<line x1="3" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
												</svg>
												<span>Camera is off</span>
											</>
										)}
									</div>
								</div>
							)}

							{/* Control buttons */}
							<div className="liveroom-preview__controls">
								{/* Audio level indicator — always visible */}
								<div className="liveroom-audio-level" aria-hidden="true" data-tooltip="Audio Level Indicator">
									{[0.02, 0.06, 0.12, 0.20, 0.35].map((threshold, i) => (
										<span
											key={i}
											className={`liveroom-audio-level__bar${audioLevel >= threshold ? ' liveroom-audio-level__bar--active' : ''}`}
										/>
									))}
								</div>

								{/* Microphone */}
								<button
									type="button"
									className={`liveroom-ctrl liveroom-ctrl--mic${micOn ? ' liveroom-ctrl--mic-on' : ' liveroom-ctrl--off'}${errors.mic ? ' liveroom-ctrl--error' : ''}`}
									aria-label={micOn ? 'Mute microphone' : 'Unmute microphone'}
									data-tooltip={micOn ? 'Mic on' : 'Mic off'}
									onClick={toggleMic}
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

								{/* Camera */}
								<button
									type="button"
									className={`liveroom-ctrl liveroom-ctrl--cam${cameraOn ? ' liveroom-ctrl--cam-on' : ''}${errors.camera ? ' liveroom-ctrl--error' : ''}`}
									aria-label={cameraOn ? 'Turn off camera' : 'Turn on camera'}
									data-tooltip={cameraOn ? 'Camera on' : 'Camera off'}
									onClick={toggleCamera}
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

								{/* Settings */}
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
							<DevicePicker
								kind="audioinput"
								label="Microphone"
								devices={devices.audioinput}
								selectedId={selectedDevices.audioinput}
								onSelect={switchDevice}
								icon={
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"
											stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M19 10v2a7 7 0 01-14 0v-2"
											stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								}
							/>

							<DevicePicker
								kind="audiooutput"
								label="Speaker"
								devices={devices.audiooutput}
								selectedId={selectedDevices.audiooutput}
								onSelect={switchDevice}
								icon={
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"
											stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								}
							/>

							<DevicePicker
								kind="videoinput"
								label="Camera Input"
								devices={devices.videoinput}
								selectedId={selectedDevices.videoinput}
								onSelect={switchDevice}
								icon={
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
											stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								}
							/>

							<div className="liveroom-pill liveroom-pill--disabled">
								<button type="button" className="liveroom-pill__trigger" disabled>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
										<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
									</svg>
									<span className="liveroom-pill__label">Background</span>
									<svg className="liveroom-pill__arrow" width="12" height="12" viewBox="0 0 24 24" fill="none">
										<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
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