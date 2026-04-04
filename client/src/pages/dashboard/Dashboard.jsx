import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import './Dashboard.css'

function formatName(username = '') {
	return username
		.split(/[._-]+/)
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ')
}

function getInitials(name) {
	const parts = name.split(' ').filter(Boolean)
	return parts.slice(0, 2).map((part) => part.charAt(0)).join('').toUpperCase()
}

function Dashboard() {
	const { username = 'guest' } = useParams()
	const displayName = formatName(username) || 'Guest User'
	const email = `${username.replace(/[^a-zA-Z0-9._-]/g, '').toLowerCase() || 'guest'}@glwebsystem.dev`
	const address = 'Polokwane, Limpopo, South Africa'
	const language = 'English'
	const avatarLabel = getInitials(displayName)

	return (
		<section className="gl-user-dashboard--page">
			<div className="gl-user-dashboard--backdrop" aria-hidden="true" />
			<Breadcrumbs />
			<div className="gl-user-dashboard--shell">
				<div className="gl-user-dashboard--card">
					<div className="gl-user-dashboard--avatar-block">
						<div className="gl-user-dashboard--avatar" aria-hidden="true">
							{avatarLabel}
						</div>
					</div>

					<div className="gl-user-dashboard--content">
						<p className="gl-user-dashboard--eyebrow">Account overview</p>
						<h1 className="gl-user-dashboard--name">{displayName}</h1>

						<div className="gl-user-dashboard--details">
							<div className="gl-user-dashboard--detail-row" aria-label={`Email ${email}`}>
								<svg className="gl-user-dashboard--detail-icon" viewBox="0 0 24 24" aria-hidden="true">
									<path d="M4 6.75h16A1.25 1.25 0 0 1 21.25 8v8A1.25 1.25 0 0 1 20 17.25H4A1.25 1.25 0 0 1 2.75 16V8A1.25 1.25 0 0 1 4 6.75Zm0 1.5a.25.25 0 0 0-.25.25v.19l8.02 5.57a.4.4 0 0 0 .46 0l8.02-5.57V8.5a.25.25 0 0 0-.25-.25H4Zm16.25 2.26-7.16 4.98a1.9 1.9 0 0 1-2.18 0l-7.16-4.98V16c0 .14.11.25.25.25h16a.25.25 0 0 0 .25-.25v-5.49Z" fill="currentColor" />
								</svg>
								<span className="gl-user-dashboard--detail-value">{email}</span>
							</div>
							<div className="gl-user-dashboard--detail-row" aria-label={`Address ${address}`}>
								<svg className="gl-user-dashboard--detail-icon" viewBox="0 0 24 24" aria-hidden="true">
									<path d="M12 2.75a6.25 6.25 0 0 1 6.25 6.25c0 4.56-5.06 10.15-5.27 10.39a1.33 1.33 0 0 1-1.96 0c-.21-.24-5.27-5.83-5.27-10.39A6.25 6.25 0 0 1 12 2.75Zm0 8.5A2.25 2.25 0 1 0 12 6.75a2.25 2.25 0 0 0 0 4.5Z" fill="currentColor" />
								</svg>
								<span className="gl-user-dashboard--detail-value">{address}</span>
							</div>
							<div className="gl-user-dashboard--detail-row" aria-label={`Language ${language}`}>
								<svg className="gl-user-dashboard--detail-icon" viewBox="0 0 24 24" aria-hidden="true">
									<path d="M12 3.25a8.75 8.75 0 1 1 0 17.5 8.75 8.75 0 0 1 0-17.5Zm5.86 8h-2.39a14.6 14.6 0 0 0-1.16-5.05 7.28 7.28 0 0 1 3.55 5.05Zm-5.11 0V4.9c1.13.53 2.05 2.72 2.36 6.35h-2.36Zm-1.5-6.35v6.35H8.89c.31-3.63 1.23-5.82 2.36-6.35Zm0 7.85v6.35c-1.13-.53-2.05-2.72-2.36-6.35h2.36Zm1.5 6.35v-6.35h2.36c-.31 3.63-1.23 5.82-2.36 6.35Zm1.56-12.9a14.6 14.6 0 0 0-1.16 5.05h-2.3a14.6 14.6 0 0 0-1.16-5.05 7.22 7.22 0 0 1 4.62 0ZM6.14 11.25H3.75A7.28 7.28 0 0 1 7.3 6.2a14.6 14.6 0 0 0-1.16 5.05Zm0 1.5a14.6 14.6 0 0 0 1.16 5.05 7.28 7.28 0 0 1-3.55-5.05h2.39Zm11.72 0a7.28 7.28 0 0 1-3.55 5.05 14.6 14.6 0 0 0 1.16-5.05h2.39Zm-8.17 5.05a14.6 14.6 0 0 0 1.16-5.05h2.3a14.6 14.6 0 0 0 1.16 5.05 7.22 7.22 0 0 1-4.62 0Z" fill="currentColor" />
								</svg>
								<span className="gl-user-dashboard--detail-value">{language}</span>
							</div>
						</div>

						<div className="gl-user-dashboard--actions">
							<button type="button" className="gl-user-dashboard--edit-btn">
								Edit profile
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Dashboard
