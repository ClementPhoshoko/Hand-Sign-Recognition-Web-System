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

			<button className="auth-submit" type="submit" disabled={!isReady}>Login</button>

		</form>
	)
}

export default Login
