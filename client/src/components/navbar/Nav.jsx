import './Nav.css'

const navItems = [
	'Live Translation',
	'Upload / Convert',
	'How it Works',
	'FAQ',
]

function Nav() {
	return (
		<header className="gl-nav-wrap">
			<nav className="gl-nav glass-panel" aria-label="Main navigation">
				<div className="gl-nav-left">
					<div className="gl-nav-brand" aria-label="Website name">
						GL-Web System
					</div>

					<ul className="gl-nav-links" role="list">
						{navItems.map((item) => (
							<li key={item}>
								<a href="#" className="gl-nav-link">
									{item}
								</a>
							</li>
						))}
					</ul>
				</div>

				<div className="gl-nav-account" aria-label="Account details">
				<button className="gl-avatar" type="button" aria-label="User account">
					<button className="gl-contact-button" type="button" aria-label="Contact support">
						<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" />
						</svg>
					</button>
					<span className="gl-avatar-text">JD</span>
				</button>
					<span className="gl-account-name">John Doe</span>
				</div>
			</nav>
		</header>
	)
}

export default Nav
