import { useState } from 'react'
import PrimaryModal from '../../../components/modals/primary/PrimaryModal'
import './Join.css'

function Join({ onJoin }) {
	const [name, setName] = useState('')
	const [gestureTranscription, setGestureTranscription] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)

	const isReady = name.trim() !== ''

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!isReady) return
		setShowConfirm(true)
	}

	const handleConfirm = () => {
		onJoin?.({ name, gestureTranscription })
		setShowConfirm(false)
	}

	return (
		<form className="join-form" onSubmit={handleSubmit} noValidate>
			<h2 className="join-heading">Join a Room</h2>
			<p className="join-subtext">Enter your details to join an existing live session. Before joining, make sure to test your microphone, camera, and speakers using the preview on the left.</p>

			{/* Name field */}
			<div className="join-field">
				<div className="join-label-row">
					<label className="join-label" htmlFor="join-name">Display Name</label>
					<span className="join-info-wrap">
						<svg
							className="join-info-icon"
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
							<path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
						</svg>
						<span className="join-info-tooltip">
							This is the name other participants will see during the session. Use your real name or a recognisable alias.
						</span>
					</span>
				</div>
				<input
					id="join-name"
					className="join-input"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="e.g. Clement Phoshoko"
					autoComplete="name"
					required
				/>
			</div>

			{/* Gesture transcription toggle */}
			<div className="join-toggle-row">
				<label className="join-toggle">
					<input
						type="checkbox"
						className="join-toggle__checkbox"
						checked={gestureTranscription}
						onChange={(e) => setGestureTranscription(e.target.checked)}
					/>
					<span className="join-toggle__track">
						<span className="join-toggle__thumb" />
					</span>
					<span className="join-toggle__text">Enable Sign-to-Text Transcription</span>
				</label>
				<span className="join-info-wrap">
					<svg
						className="join-info-icon"
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
						<path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
					</svg>
					<span className="join-info-tooltip">
						When enabled, the system will detect hand signs from your camera feed and convert them into on-screen text in real time.
					</span>
				</span>
			</div>

			<button className="join-submit" type="submit" disabled={!isReady}>
				Join Room
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>

			<PrimaryModal
				open={showConfirm}
				customMsg="You're about to join the session. Make sure your camera and microphone are set up correctly before proceeding."
				firstOption="Join Now"
				secondOption="Go Back"
				onFirstOption={handleConfirm}
				onSecondOption={() => setShowConfirm(false)}
				onClose={() => setShowConfirm(false)}
			/>
		</form>
	)
}

export default Join