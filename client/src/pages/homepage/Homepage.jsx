import { useState, useEffect } from 'react'
import heroImg        from '../../assets/avatars/processing_ASL_subtitles_on_laptop.png'
import ovInputImg     from '../../assets/avatars/hello_from_the_video_call_1.png'
import ovDetectImg    from '../../assets/avatars/gesture tracking.png'
import ovTranscribeImg from '../../assets/avatars/processing_ASL_subtitles_on_laptop.png'
import ovOutputImg    from '../../assets/avatars/hello_world_output.png'
import morePanelAvatar from '../../assets/avatars/man_pointing_north_east_seating_2.png'
import './Homepage.css'

const USE_CASES = [
	{
		id: 'accessibility',
		label: 'Accessibility Tools',
		svg: (
			<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<circle cx="24" cy="10" r="4" stroke="currentColor" strokeWidth="2"/>
				<path d="M17 20h14M24 20v10m0 0-5 8m5-8 5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M14 30a12 12 0 1 0 20-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
			</svg>
		),
		heading: 'Breaking communication barriers',
		body: 'Empowers deaf and hard-of-hearing individuals to communicate naturally using hand gestures. The system converts signs into readable text in real time, removing the need for an interpreter and making everyday interactions more independent.',
	},
	{
		id: 'hci',
		label: 'Human-Computer Interaction',
		svg: (
			<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path d="M18 8v20M22 12v16M26 14v14M30 16v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
				<path d="M30 28c0 2 1 4 1 6a7 7 0 0 1-14 0c0-3 1-5 1-8V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		),
		heading: 'Gesture-driven interfaces',
		body: 'Replaces or augments traditional input devices — keyboard, mouse, touch — with natural hand gestures. Ideal for touchless kiosks, medical environments, industrial control panels, and any setting where physical contact with hardware is impractical.',
	},
	{
		id: 'smart',
		label: 'Smart Interfaces',
		svg: (
			<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path d="M27 6 14 26h10l-3 16 13-20H24L27 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		),
		heading: 'Hands-free smart control',
		body: 'Integrate gesture recognition into smart home systems, presentation tools, robotics, and IoT devices. Users can switch lights, scroll through slides, or control machinery without touching a single button.',
	},
	{
		id: 'education',
		label: 'Educational Tools',
		svg: (
			<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path d="M24 10 6 20l18 10 18-10-18-10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M12 25v10c0 3 5 7 12 7s12-4 12-7V25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
				<line x1="42" y1="20" x2="42" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
			</svg>
		),
		heading: 'Interactive sign language learning',
		body: 'Provides real-time feedback for learners practising sign language. The system recognises sign attempts, compares them to a trained model, and guides students toward correct form — making self-paced learning measurable and engaging.',
	},
]

const TECH_STACK = [
	{
		id: 'frontend',
		label: 'Frontend',
		svg: (
			<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<rect x="6" y="8" width="36" height="26" rx="3" stroke="currentColor" strokeWidth="2"/>
				<path d="M16 42h16M24 34v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
				<path d="M18 22l-4-4 4-4M30 14l4 4-4 4M23 26l2-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
			</svg>
		),
		heading: 'React + Webcam API',
		body: 'The client is built with React and leverages the browser\'s native Webcam API to capture live video frames. Frames are sent to the backend at configurable intervals (200–500 ms) and the recognised gesture is displayed instantly without a full page refresh.',
		tags: ['React', 'Vite', 'Webcam API', 'CSS Modules'],
	},
	{
		id: 'backend',
		label: 'Backend API',
		svg: (
			<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<rect x="6" y="8" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
				<rect x="28" y="20" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
				<rect x="6" y="30" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
				<path d="M20 13h6a2 2 0 0 1 2 2v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
				<path d="M28 25h-6a2 2 0 0 0-2 2v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
			</svg>
		),
		heading: 'Node.js + Express Gateway',
		body: 'The Node.js Express server acts as a gateway between the browser client and the Python AI service. It handles request routing, input validation, error handling, and response formatting — keeping the AI service decoupled from the frontend.',
		tags: ['Node.js', 'Express', 'REST API', 'Proxy'],
	},
	{
		id: 'ai',
		label: 'AI Service',
		svg: (
			<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="2"/>
				<circle cx="10" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
				<circle cx="38" cy="14" r="3" stroke="currentColor" strokeWidth="2"/>
				<circle cx="10" cy="34" r="3" stroke="currentColor" strokeWidth="2"/>
				<circle cx="38" cy="34" r="3" stroke="currentColor" strokeWidth="2"/>
				<path d="M13 15.5 19 21M29 27l6 5.5M13 32.5 19 27M29 21l6-5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
			</svg>
		),
		heading: 'Python FastAPI + ML Engine',
		body: 'A Python FastAPI microservice runs the computer vision pipeline. It receives frames, extracts hand landmarks via MediaPipe, and feeds the 21-keypoint vectors into a classifier (rule-based or ML model) to return a gesture label.',
		tags: ['Python', 'FastAPI', 'TensorFlow', 'PyTorch'],
	},
	{
		id: 'cv',
		label: 'CV Library',
		svg: (
			<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path d="M6 24C6 24 12 12 24 12s18 12 18 12-6 12-18 12S6 24 6 24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
				<circle cx="24" cy="24" r="5" stroke="currentColor" strokeWidth="2"/>
				<path d="M8 8l6 6M40 8l-6 6M8 40l6-6M40 40l-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
			</svg>
		),
		heading: 'MediaPipe + OpenCV',
		body: 'MediaPipe\'s Hand Landmarker model extracts 21 3-D keypoints from each hand in under 10 ms. OpenCV handles frame pre-processing — resizing to 224×224, colour normalisation, and noise reduction — before the frame reaches the landmark detector.',
		tags: ['MediaPipe', 'OpenCV', '21 Landmarks', 'Real-time'],
	},
]

function Homepage() {
	const [activeTab,  setActiveTab]  = useState('use-cases')
	const [activeItem, setActiveItem] = useState(USE_CASES[0].id)
	const [openItem,   setOpenItem]   = useState(null) // null on mount so grid starts collapsed

	const items  = activeTab === 'use-cases' ? USE_CASES : TECH_STACK
	const active = items.find(i => i.id === activeItem) ?? items[0]

	// After slide-in animation (≥80ms), open the first item so transition plays from 0fr→1fr
	useEffect(() => {
		const t = setTimeout(() => setOpenItem(activeItem), 80)
		return () => clearTimeout(t)
	}, [activeTab])  // re-runs on tab switch so new list also slides in clean

	const handleTabChange = (tab) => {
		setActiveTab(tab)
		const next = tab === 'use-cases' ? USE_CASES : TECH_STACK
		setActiveItem(next[0].id)
		setOpenItem(null) // reset; useEffect above will open after slide-in
	}

	const handleItemClick = (itemId) => {
		setActiveItem(itemId)
		setOpenItem(itemId) // user click: immediate, no delay needed
	}

	return (
		<main className="homepage-shell">

			{/* ── Animated canvas background ─────────────────────── */}
			<div className="hp-canvas" aria-hidden="true">
				<div className="hp-orb hp-orb--1" />
				<div className="hp-orb hp-orb--2" />
				<div className="hp-orb hp-orb--3" />
				<div className="hp-orb hp-orb--4" />
			</div>

			{/* ── Hero section ──────────────────────────────────── */}
			<section className="homepage-content hp-hero" aria-label="Homepage content">
				<div className="hp-hero-inner">

					{/* Left — text */}
					<div className="hp-hero-text">
						<span className="hp-eyebrow">Real-time &middot; Open &middot; Accessible</span>
						<h1 className="hp-headline">
							Gestures that<br />
							<span className="hp-headline-accent">Speak&nbsp;Louder</span>
							<br />than Words
						</h1>
						<p className="hp-subline">
							The <strong>Gesture to Linguistic Web System</strong> bridges the gap between
							handsign and human language. Point your camera, make a sign, and watch it
							instantly transform into readable text — no special hardware, no downloads.
						</p>
						<p className="hp-subline hp-subline--secondary">
							Powered by <strong>MediaPipe landmark detection</strong> and a high-accuracy
							classification engine, the system works frame-by-frame in real time
							or processes your uploaded videos into fully time-coded subtitle files.
						</p>
						<div className="hp-cta-row">
							<a href="#" className="hp-btn hp-btn--primary">Start Live Translation</a>
							<a href="#" className="hp-btn hp-btn--ghost">Upload a Video</a>
						</div>
					</div>

					{/* Right — hero image */}
					<div className="hp-hero-img-wrap">
						<div className="hp-hero-img-glow" aria-hidden="true" />
						<div className="hp-hero-img-outer">
							<img
								src={heroImg}
								alt="Processing ASL subtitles on laptop"
								className="hp-hero-img"
								loading="eager"
								draggable="false"
							/>
						</div>
					</div>

				</div>
			</section>

			{/* ── Overview section ──────────────────────────────── */}
			<section className="hp-overview" aria-label="System overview">
				<div className="hp-overview-inner">

					<div className="hp-overview-header">
						<h2 className="hp-overview-title">Overview</h2>
						<p className="hp-overview-desc">
							A full pipeline from webcam input to on-screen text, powered by computer vision.
						</p>
					</div>

					<div className="hp-overview-track">

						<div className="hp-ov-card">
							<h3 className="hp-ov-card-title">Input Capture</h3>
							<div className="hp-ov-card-img-wrap">
								<img src={ovInputImg} alt="Webcam input capture" draggable="false" />
							</div>
							<p className="hp-ov-card-desc">
								Your webcam or uploaded video feeds frames directly into the recognition pipeline.
							</p>
						</div>

						<span className="hp-ov-arrow" aria-hidden="true">&#8212;&nbsp;&#187;</span>

						<div className="hp-ov-card">
							<h3 className="hp-ov-card-title">Hand Detection<br />&amp; Tracking</h3>
							<div className="hp-ov-card-img-wrap">
								<img src={ovDetectImg} alt="Hand landmark detection" draggable="false" />
							</div>
							<p className="hp-ov-card-desc">
								MediaPipe isolates and tracks hand landmarks across every frame with high precision.
							</p>
						</div>

						<span className="hp-ov-arrow" aria-hidden="true">&#8212;&nbsp;&#187;</span>

						<div className="hp-ov-card">
							<h3 className="hp-ov-card-title">Text Transcription</h3>
							<div className="hp-ov-card-img-wrap">
								<img src={ovTranscribeImg} alt="ASL text transcription" draggable="false" />
							</div>
							<p className="hp-ov-card-desc">
								Recognised signs are mapped to characters and assembled into readable text output.
							</p>
						</div>

						<span className="hp-ov-arrow" aria-hidden="true">&#8212;&nbsp;&#187;</span>

						<div className="hp-ov-card">
							<h3 className="hp-ov-card-title">Output Display</h3>
							<div className="hp-ov-card-img-wrap">
								<img src={ovOutputImg} alt="On-screen output display" draggable="false" />
							</div>
							<p className="hp-ov-card-desc">
								The resulting text appears instantly on-screen or can be exported as subtitle files.
							</p>
						</div>

					</div>
				</div>
			</section>

			{/* ── "There is More" unified accordion ────────────── */}
			<section className="hp-more" aria-label="There is More">
				<div className="hp-more-inner">

					{/* Header + tab switcher */}
					<div className="hp-more-header">
						<h2 className="hp-more-title">There is More</h2>
						<div className="hp-more-tabs" role="tablist" aria-label="Content categories">
							<button
								role="tab"
								aria-selected={activeTab === 'use-cases'}
								className={`hp-more-tab${activeTab === 'use-cases' ? ' hp-more-tab--active' : ''}`}
								onClick={() => handleTabChange('use-cases')}
							>
								Use Cases
							</button>
							<button
								role="tab"
								aria-selected={activeTab === 'tech-stack'}
								className={`hp-more-tab${activeTab === 'tech-stack' ? ' hp-more-tab--active' : ''}`}
								onClick={() => handleTabChange('tech-stack')}
							>
								Tech Stack
							</button>
						</div>
					</div>

					{/* Body: left accordion list + right detail panel */}
					<div className="hp-more-body">

						{/* Left — vertical accordion list */}
						<ul className="hp-more-list" role="tablist" key={activeTab}>
							{items.map((item, idx) => (
								<li
									key={item.id}
								className={`hp-more-item${openItem === item.id ? ' hp-more-item--open' : ''}`}
								style={{ '--i': idx }}
							>
								<button
									className="hp-more-item-btn"
									aria-expanded={openItem === item.id}
									onClick={() => handleItemClick(item.id)}
								>
									<span className="hp-more-item-label">{item.label}</span>
									<span className="hp-more-item-chevron" aria-hidden="true">
											{openItem === item.id
												? <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="4" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
												: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="4" x2="10" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="4" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
											}
									</span>
								</button>
								<p className={`hp-more-item-preview${openItem === item.id ? ' hp-more-item-preview--open' : ''}`}>
										{item.body.slice(0, 100)}&hellip;
									</p>
								</li>
							))}
						</ul>

						{/* Right — detail panel */}
					<div className="hp-more-panel" key={activeItem} role="region" aria-live="polite">
						<div className="hp-more-panel-top">
							<div className="hp-more-panel-icon">{active.svg}</div>
							<p className="hp-more-panel-eyebrow">{active.label}</p>
						</div>
						<h3 className="hp-more-panel-heading">{active.heading}</h3>					<img
						src={morePanelAvatar}
						alt="Avatar"
						className="hp-more-panel-avatar"
						draggable="false"
					/>						<p className="hp-more-panel-body">{active.body}</p>
						{active.tags && (
							<div className="hp-more-tags">
								{active.tags.map(t => (
									<span key={t} className="hp-more-tag">{t}</span>
								))}
							</div>
						)}
					</div>

					</div>
				</div>
			</section>

		</main>
	)
}

export default Homepage
