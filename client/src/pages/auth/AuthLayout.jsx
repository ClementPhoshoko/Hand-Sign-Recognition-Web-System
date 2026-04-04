import { useState } from 'react'
import bgImg from '../../assets/avatars/hello_from_the_video_call_1.png'
import Login from './login/Login'
import Register from './register/Register'
import './AuthLayout.css'

function AuthLayout() {
	const [activeTab, setActiveTab] = useState('login')

	return (
		<div
			className="auth-shell"
			style={{ backgroundImage: `url(${bgImg})` }}
		>
			<div className="auth-wrap">

				{/* ── Ambient background orbs ── */}
				<div className="auth-canvas" aria-hidden="true">
					<div className="auth-orb auth-orb--1" />
					<div className="auth-orb auth-orb--2" />
					<div className="auth-orb auth-orb--3" />
				</div>

				{/* ── Card ── */}
				<div className="auth-card" role="main">

				{/* Avatar */}
				<div className="auth-avatar" aria-hidden="true">GL</div>

				{/* System name */}
				<p className="auth-system-name">GL Web System</p>

				{/* Toggle */}
				<div className="auth-toggle" role="tablist" aria-label="Authentication mode">
					<button
						role="tab"
						aria-selected={activeTab === 'login'}
						className={`auth-toggle-btn${activeTab === 'login' ? ' auth-toggle-btn--active' : ''}`}
						onClick={() => setActiveTab('login')}
					>
						Login
					</button>
					<button
						role="tab"
						aria-selected={activeTab === 'register'}
						className={`auth-toggle-btn${activeTab === 'register' ? ' auth-toggle-btn--active' : ''}`}
						onClick={() => setActiveTab('register')}
					>
						Register
					</button>
				</div>

				{/* Dynamic form area */}
				<div className="auth-form-area" key={activeTab}>
					{activeTab === 'login' ? <Login /> : <Register />}
				</div>

				</div>
			</div>
		</div>
	)
}

export default AuthLayout
