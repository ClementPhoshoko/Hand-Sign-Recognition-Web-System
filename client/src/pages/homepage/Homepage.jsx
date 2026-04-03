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

			{/* ── Page content (text goes here later) ────────────── */}
			<section className="homepage-content" aria-label="Homepage content" />

		</main>
	)
}

export default Homepage
