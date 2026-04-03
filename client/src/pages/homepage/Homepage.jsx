import { useState, useEffect } from 'react'
import heroImg        from '../../assets/nav_and_home/Processing_ASL_subtitles_on_laptop.png'
import ovInputImg     from '../../assets/nav_and_home/Hello from the video call (1).png'
import ovDetectImg    from '../../assets/nav_and_home/Computer vision pipeline overview (1).png'
import ovTranscribeImg from '../../assets/nav_and_home/Processing_ASL_subtitles_on_laptop.png'
import ovOutputImg    from '../../assets/nav_and_home/Support FAQ section with woman (1).png'
import './Homepage.css'

const USE_CASES = [
	{
		id: 'accessibility',
		label: 'Accessibility Tools',
		icon: '♿',
		heading: 'Breaking communication barriers',
		body: 'Empowers deaf and hard-of-hearing individuals to communicate naturally using hand gestures. The system converts signs into readable text in real time, removing the need for an interpreter and making everyday interactions more independent.',
	},
	{
		id: 'hci',
		label: 'Human-Computer Interaction',
		icon: '🖐',
		heading: 'Gesture-driven interfaces',
		body: 'Replaces or augments traditional input devices — keyboard, mouse, touch — with natural hand gestures. Ideal for touchless kiosks, medical environments, industrial control panels, and any setting where physical contact with hardware is impractical.',
	},
	{
		id: 'smart',
		label: 'Smart Interfaces',
		icon: '⚡',
		heading: 'Hands-free smart control',
		body: 'Integrate gesture recognition into smart home systems, presentation tools, robotics, and IoT devices. Users can switch lights, scroll through slides, or control machinery without touching a single button.',
	},
	{
		id: 'education',
		label: 'Educational Tools',
		icon: '🎓',
		heading: 'Interactive sign language learning',
		body: 'Provides real-time feedback for learners practising sign language. The system recognises sign attempts, compares them to a trained model, and guides students toward correct form — making self-paced learning measurable and engaging.',
	},
]

const TECH_STACK = [
	{
		id: 'frontend',
		label: 'Frontend',
		icon: '⚛',
		heading: 'React + Webcam API',
		body: 'The client is built with React and leverages the browser\'s native Webcam API to capture live video frames. Frames are sent to the backend at configurable intervals (200–500 ms) and the recognised gesture is displayed instantly without a full page refresh.',
		tags: ['React', 'Vite', 'Webcam API', 'CSS Modules'],
	},
	{
		id: 'backend',
		label: 'Backend API',
		icon: '🔀',
		heading: 'Node.js + Express Gateway',
		body: 'The Node.js Express server acts as a gateway between the browser client and the Python AI service. It handles request routing, input validation, error handling, and response formatting — keeping the AI service decoupled from the frontend.',
		tags: ['Node.js', 'Express', 'REST API', 'Proxy'],
	},
	{
		id: 'ai',
		label: 'AI Service',
		icon: '🧠',
		heading: 'Python FastAPI + ML Engine',
		body: 'A Python FastAPI microservice runs the computer vision pipeline. It receives frames, extracts hand landmarks via MediaPipe, and feeds the 21-keypoint vectors into a classifier (rule-based or ML model) to return a gesture label.',
		tags: ['Python', 'FastAPI', 'TensorFlow', 'PyTorch'],
	},
	{
		id: 'cv',
		label: 'CV Library',
		icon: '👁',
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
						<div className="hp-more-panel" role="region" aria-live="polite">
							<p className="hp-more-panel-eyebrow">
								<span aria-hidden="true">{active.icon}</span>&nbsp;{active.label}
							</p>
							<h3 className="hp-more-panel-heading">{active.heading}</h3>
							<p className="hp-more-panel-body">{active.body}</p>
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
