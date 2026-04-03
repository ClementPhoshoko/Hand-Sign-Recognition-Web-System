import heroImg        from '../../assets/nav_and_home/Processing_ASL_subtitles_on_laptop.png'
import ovInputImg     from '../../assets/nav_and_home/Hello from the video call (1).png'
import ovDetectImg    from '../../assets/nav_and_home/Computer vision pipeline overview (1).png'
import ovTranscribeImg from '../../assets/nav_and_home/Processing_ASL_subtitles_on_laptop.png'
import ovOutputImg    from '../../assets/nav_and_home/Support FAQ section with woman (1).png'
import './Homepage.css'

function Homepage() {
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

		</main>
	)
}

export default Homepage
