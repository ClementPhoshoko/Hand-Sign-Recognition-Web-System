import { useState } from 'react'
import './Nav.css'

const navItems = [
	'Live Translation',
	'Upload / Convert',
	'How it Works',
	'FAQ',
]

function Nav() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

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
						{navItems.map((item) => (
							<li key={item}>
								<a href="#" className="gl-nav-link">
									{item}
								</a>
							</li>
						))}
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
				<button className="gl-user-pill" type="button" aria-label="User account">
					<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
						<path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" />
					</svg>
				</button>
			</div>
		</header>
	)
}

export default Nav
