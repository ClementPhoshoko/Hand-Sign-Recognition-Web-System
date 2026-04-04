import { Link, useLocation } from 'react-router-dom'
import './Breadcrumbs.css'

const routeLabels = {
	auth: 'Authentication',
	login: 'Login',
	register: 'Register',
}

function formatSegment(segment) {
	if (routeLabels[segment]) return routeLabels[segment]

	return segment
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ')
}

function Breadcrumbs() {
	const { pathname } = useLocation()

	if (pathname === '/') return null

	const segments = pathname.split('/').filter(Boolean)
	const crumbs = segments.map((segment, index) => ({
		label: formatSegment(segment),
		path: `/${segments.slice(0, index + 1).join('/')}`,
		isCurrent: index === segments.length - 1,
	}))

	return (
		<nav className="breadcrumbs" aria-label="Breadcrumb">
			<ol className="breadcrumbs__list">
				<li className="breadcrumbs__item">
					<Link className="breadcrumbs__link" to="/">
						Home
					</Link>
				</li>
				{crumbs.map((crumb) => (
					<li key={crumb.path} className="breadcrumbs__item">
						<span className="breadcrumbs__separator" aria-hidden="true">
							/
						</span>
						{crumb.isCurrent ? (
							<span className="breadcrumbs__current" aria-current="page">
								{crumb.label}
							</span>
						) : (
							<Link className="breadcrumbs__link" to={crumb.path}>
								{crumb.label}
							</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	)
}

export default Breadcrumbs
