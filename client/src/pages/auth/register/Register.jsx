import { useState } from 'react'
import './Register.css'

function Register() {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		agreed: false,
	})

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		// TODO: hook up to auth API
	}

	return (
		<form className="auth-form" onSubmit={handleSubmit} noValidate>

			<div className="auth-field">
				<label className="auth-label" htmlFor="reg-name">Full Name</label>
				<input
					id="reg-name"
					className="auth-input"
					type="text"
					name="name"
					value={form.name}
					onChange={handleChange}
					placeholder="Jane Doe"
					autoComplete="name"
					required
				/>
			</div>

			<div className="auth-field">
				<label className="auth-label" htmlFor="reg-email">Email</label>
				<input
					id="reg-email"
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
				<label className="auth-label" htmlFor="reg-password">Password</label>
				<input
					id="reg-password"
					className="auth-input"
					type="password"
					name="password"
					value={form.password}
					onChange={handleChange}
					placeholder="••••••••"
					autoComplete="new-password"
					required
				/>
			</div>

			<label className="auth-terms">
				<input
					className="auth-terms-checkbox"
					type="checkbox"
					name="agreed"
					checked={form.agreed}
					onChange={handleChange}
					required
				/>
				<span className="auth-terms-text">
					I agree to the{' '}
					<a href="#" className="auth-terms-link">Terms &amp; Conditions</a>
					{' '}and{' '}
					<a href="#" className="auth-terms-link">Privacy Policy</a>
				</span>
			</label>

			<button className="auth-submit" type="submit" disabled={!form.agreed}>
				Create Account
			</button>

		</form>
	)
}

export default Register
