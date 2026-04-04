import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

/* ── Small chevron that rotates when open ───────────────────────── */
function Caret({ open }) {
	return (
		<svg
			className={`gl-caret${open ? ' is-open' : ''}`}
			viewBox="0 0 10 6"
			aria-hidden="true"
		>
			<path
				d="M1 1l4 4 4-4"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				fill="none"
			/>
		</svg>
	)
}

/* ── Dropdown: Live Translation ─────────────────────────────────── */
function DropLiveTranslation() {
	return (
		<div className="gl-drop gl-drop--media">
			<div className="gl-drop-aside">
				<div className="gl-drop-img" aria-hidden="true">
					<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="60" cy="40" r="22" stroke="currentColor" strokeWidth="2.5" />
						<path
							d="M20 108c0-22.09 17.91-40 40-40s40 17.91 40 40"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
						/>
						<circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="1" strokeDasharray="5 4" opacity="0.2" />
						<path
							d="M88 22l7-7m0 0v8m0-8h-8"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							opacity="0.55"
						/>
						<circle cx="90" cy="42" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
						<circle cx="90" cy="42" r="2" fill="currentColor" opacity="0.5" />
					</svg>
				</div>
			</div>
			<div className="gl-drop-body">
				<span className="gl-drop-eyebrow">Real-time</span>
				<h3 className="gl-drop-title">Live Hand Sign Transcription</h3>
				<p className="gl-drop-desc">
					Instantly convert hand signs to readable text as you gesture — with near-zero
					latency and frame-by-frame detection, every sign is caught and displayed
					immediately.
				</p>

			</div>
		</div>
	)
}

/* ── Dropdown: Upload / Convert ─────────────────────────────────── */
function DropUploadConvert() {
	return (
		<div className="gl-drop gl-drop--media">
			<div className="gl-drop-aside">
				<div className="gl-drop-img" aria-hidden="true">
					<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect x="18" y="24" width="84" height="62" rx="9" stroke="currentColor" strokeWidth="2.5" />
						<path
							d="M60 76V50m0 0-14 14m14-14 14 14"
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path d="M38 96h44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
						<rect x="30" y="38" width="14" height="3.5" rx="1.75" fill="currentColor" opacity="0.25" />
						<rect x="76" y="38" width="14" height="3.5" rx="1.75" fill="currentColor" opacity="0.25" />
						<rect x="30" y="46" width="8" height="3.5" rx="1.75" fill="currentColor" opacity="0.15" />
					</svg>
				</div>
			</div>
			<div className="gl-drop-body">
				<span className="gl-drop-eyebrow">Offline processing</span>
				<h3 className="gl-drop-title">Upload &amp; Convert to Subtitles</h3>
				<p className="gl-drop-desc">
					Upload a pre-recorded video of hand signs and receive a full subtitle file.
					The system processes every frame and delivers accurate, time-coded captions
					ready to export and use in any media project.
				</p>

			</div>
		</div>
	)
}

/* ── Dropdown: How it Works (grid) ──────────────────────────────── */
const HOW_ITEMS = [
	{
		title: 'Overview',
		desc: 'A full pipeline from webcam input to on-screen text, powered by computer vision.',
		icon: (
			<svg viewBox="0 0 24 24" fill="none">
				<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
				<path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		),
	},
	{
		title: 'Input Capture',
		desc: 'Your webcam or uploaded video feeds frames directly into the recognition pipeline.',
		icon: (
			<svg viewBox="0 0 24 24" fill="none">
				<rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
				<circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
			</svg>
		),
	},
	{
		title: 'Hand Detection & Tracking',
		desc: 'MediaPipe isolates and tracks hand landmarks across every frame with high precision.',
		icon: (
			<svg viewBox="0 0 24 24" fill="none">
				<path
					d="M8 13V7a1 1 0 0 1 2 0v4m0-4V5a1 1 0 0 1 2 0v4m0-3a1 1 0 0 1 2 0v5m0-3a1 1 0 0 1 2 0v5c0 3.314-2.686 6-6 6s-6-2.686-6-6v-2"
					stroke="currentColor"
					strokeWidth="1.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		),
	},
	{
		title: 'Text Transcription',
		desc: 'Recognised signs are mapped to characters and assembled into readable text output.',
		icon: (
			<svg viewBox="0 0 24 24" fill="none">
				<rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
				<path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			</svg>
		),
	},
	{
		title: 'Output Display',
		desc: 'The resulting text appears instantly on-screen or can be exported as subtitle files.',
		icon: (
			<svg viewBox="0 0 24 24" fill="none">
				<rect x="2" y="4" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
				<path d="M8 22h8M12 18v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
			</svg>
		),
	},
]

function DropHowItWorks() {
	return (
		<div className="gl-drop gl-drop--grid">
			{HOW_ITEMS.map((item) => (
				<div className="gl-drop-grid-item" key={item.title}>
					<span className="gl-drop-grid-icon" aria-hidden="true">
						{item.icon}
					</span>
					<div>
						<p className="gl-drop-grid-title">{item.title}</p>
						<p className="gl-drop-grid-desc">{item.desc}</p>
					</div>
				</div>
			))}
		</div>
	)
}

/* ── Dropdown: FAQ ──────────────────────────────────────────────── */
function DropFAQ() {
	return (
		<div className="gl-drop gl-drop--media">
			<div className="gl-drop-aside">
				<div className="gl-drop-img" aria-hidden="true">
					<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="60" cy="60" r="46" stroke="currentColor" strokeWidth="2.5" />
						<path
							d="M46 48c0-7.732 6.268-14 14-14s14 6.268 14 14c0 7-6 11-14 14v6"
							stroke="currentColor"
							strokeWidth="2.8"
							strokeLinecap="round"
						/>
						<circle cx="60" cy="86" r="4" fill="currentColor" />
					</svg>
				</div>
			</div>
			<div className="gl-drop-body">
				<span className="gl-drop-eyebrow">Support</span>
				<h3 className="gl-drop-title">Frequently Asked Questions</h3>
				<p className="gl-drop-desc">
					Questions about accuracy, supported sign languages, privacy, or how to get
					started? Every answer in our FAQ is clear and written for all users — no
					technical background needed.
				</p>
			</div>
		</div>
	)
}

/* ── Nav item config ─────────────────────────────────────────────── */
const NAV_ITEMS = [
	{ label: 'Live Translation', Drop: DropLiveTranslation },
	{ label: 'Upload / Convert', Drop: DropUploadConvert },
	{ label: 'How it Works', Drop: DropHowItWorks, wide: true },
	{ label: 'FAQ', Drop: DropFAQ },
]

/* ── Main Nav component ─────────────────────────────────────────── */
function Nav() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [activeDropdown, setActiveDropdown] = useState(null)
	const closeTimer = useRef(null)

	const openDrop = (label) => {
		clearTimeout(closeTimer.current)
		setActiveDropdown(label)
	}

	const scheduleDrop = () => {
		closeTimer.current = setTimeout(() => setActiveDropdown(null), 140)
	}

	return (
		<header className="gl-nav-wrap">
			<nav className="gl-nav" aria-label="Main navigation">
				<div className="gl-nav-left">
					<div className="gl-nav-icon" aria-hidden="true">
						GL
					</div>
					<div className="gl-nav-title" aria-label="Website name">
						GL-Web System
					</div>

					<ul className={`gl-nav-links ${isMenuOpen ? 'is-open' : ''}`} role="list">
						{NAV_ITEMS.map((navItem) => {
							const { label, wide } = navItem
							const DropPanel = navItem.Drop
							const isActive = activeDropdown === label
							return (
								<li
									key={label}
									className="gl-nav-item"
									onMouseEnter={() => openDrop(label)}
									onMouseLeave={scheduleDrop}
								>
									<a href="#" className={`gl-nav-link${isActive ? ' is-active' : ''}`}>
										{label}
										<Caret open={isActive} />
									</a>

									{isActive && (
										<div
											className={`gl-dropdown${wide ? ' gl-dropdown--wide' : ''}`}
											onMouseEnter={() => openDrop(label)}
											onMouseLeave={scheduleDrop}
										>
											<DropPanel />
										</div>
									)}
								</li>
							)
						})}
					</ul>
				</div>

				<button
					className="gl-menu-toggle"
					type="button"
					onClick={() => setIsMenuOpen((prev) => !prev)}
					aria-expanded={isMenuOpen}
					aria-label="Toggle navigation menu"
				>
					<span />
					<span />
					<span />
				</button>
			</nav>

			<div className="gl-nav-right">
				<span className="gl-nav-advisory" aria-hidden="true">Click to login or register</span>
				<button className="gl-user-pill" type="button" aria-label="User account">
					<Link to="/auth" aria-label="Login or register">
						<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" />
						</svg>
					</Link>
				</button>
			</div>
		</header>
	)
}

export default Nav
