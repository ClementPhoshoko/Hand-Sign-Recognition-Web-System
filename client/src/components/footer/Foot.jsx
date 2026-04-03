import './Foot.css'

const FOOTER_LINKS = [
	{
		heading: 'Product',
		links: ['Live Translation', 'Upload / Convert', 'How it Works'],
	},
	{
		heading: 'Support',
		links: ['FAQ', 'Documentation', 'Contact Us'],
	},
	{
		heading: 'Legal',
		links: ['Privacy Policy', 'Terms of Use', 'Accessibility'],
	},
]

function Foot() {
	const year = new Date().getFullYear()

	return (
		<footer className="gl-foot">
			<div className="gl-foot-inner">

				{/* Brand column */}
				<div className="gl-foot-brand">
					<div className="gl-foot-logo" aria-hidden="true">GL</div>
					<p className="gl-foot-name">Gesture to Linguistic<br />Web System</p>
					<address className="gl-foot-address" aria-label="Location">
						<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
							<path
								d="M8 1.5A4.5 4.5 0 0 0 3.5 6c0 3.038 3.646 7.358 4.087 7.872a.55.55 0 0 0 .826 0C8.854 13.358 12.5 9.038 12.5 6A4.5 4.5 0 0 0 8 1.5ZM8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
								fill="currentColor"
							/>
						</svg>
						187 Purchase Place, Johannesburg, South Africa, 2094
					</address>
				</div>

				{/* Link columns */}
				<nav className="gl-foot-nav" aria-label="Footer navigation">
					{FOOTER_LINKS.map((col) => (
						<div className="gl-foot-col" key={col.heading}>
							<p className="gl-foot-col-heading">{col.heading}</p>
							<ul role="list">
								{col.links.map((link) => (
									<li key={link}>
										<a href="#" className="gl-foot-link">{link}</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>

			</div>

			{/* Bottom bar */}
			<div className="gl-foot-bar">
				<p className="gl-foot-copy">
					&copy; {year} Gesture to Linguistic Web System. All rights reserved.
				</p>
				<p className="gl-foot-since">Est. 2024</p>
			</div>
		</footer>
	)
}

export default Foot