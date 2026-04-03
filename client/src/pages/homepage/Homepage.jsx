import heroImg from '../../assets/nav_and_home/Processing_ASL_subtitles_on_laptop.png'
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
						<img
							src={heroImg}
							alt="Processing ASL subtitles on laptop"
							className="hp-hero-img"
							loading="eager"
							draggable="false"
						/>
					</div>

				</div>
			</section>

		</main>
	)
}

export default Homepage
