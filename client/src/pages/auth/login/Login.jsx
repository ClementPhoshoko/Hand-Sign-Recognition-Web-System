import { useState } from 'react'
import './Login.css'

function Login() {
	const [form, setForm] = useState({ email: '', password: '' })

	const isReady = form.email.trim() !== '' && form.password !== ''

	const handleChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// TODO: hook up to auth API
	}

	return (
		<form className="auth-form" onSubmit={handleSubmit} noValidate>

			<div className="auth-field">
				<label className="auth-label" htmlFor="login-email">Email</label>
				<input
					id="login-email"
					className="auth-input"
					type="email"
					name="email"
					value={form.email}
					onChange={handleChange}
					placeholder="you@example.com"
					autoComplete="email"
					required
				/>
			</div>

			<div className="auth-field">
				<label className="auth-label" htmlFor="login-password">Password</label>
				<input
					id="login-password"
					className="auth-input"
					type="password"
					name="password"
					value={form.password}
					onChange={handleChange}
					placeholder="••••••••"
					autoComplete="current-password"
					required
				/>
			</div>

			<button className="auth-submit" type="submit" disabled={!isReady}>
				Login
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>

		</form>
	)
}

export default Login
