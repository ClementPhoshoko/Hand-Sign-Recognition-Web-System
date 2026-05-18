import { Link } from 'react-router-dom'
import './NavOptions.css'

function NavOptions({ isOpen }) {
	const options = [
		{
			label: 'Notifications',
			to: '/notifications',
			recent: 'New hand sign detected in Liveroom #42',
			icon: (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
					<path d="M13.73 21a2 2 0 0 1-3.46 0" />
				</svg>
			),
		},
		{
			label: 'Login',
			to: '/auth',
			icon: (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
					<polyline points="10 17 15 12 10 7" />
					<line x1="15" y1="12" x2="3" y2="12" />
				</svg>
			),
		},
		{
			label: 'Logout',
			to: '/logout',
			icon: (
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
					<polyline points="16 17 21 12 16 7" />
					<line x1="21" y1="12" x2="9" y2="12" />
				</svg>
			),
		},
	]

	return (
		<div className={`gl-nav-options ${isOpen ? 'is-open' : ''}`}>
			{options.map((option, index) => (
				<div 
					key={option.label} 
					className={`gl-option-item-wrap${option.recent ? ' has-recent' : ''}`}
					style={{ '--index': index }}
				>
					<div className="gl-option-content">
						<span className="gl-option-label">{option.label}</span>
						{option.recent && <span className="gl-option-recent">{option.recent}</span>}
					</div>
					<Link to={option.to} className="gl-option-circle" aria-label={option.label}>
						{option.icon}
					</Link>
				</div>
			))}
		</div>
	)
}

export default NavOptions
