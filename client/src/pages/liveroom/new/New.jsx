import { useState } from 'react'
import PrimaryModal from '../../../components/modals/primary/PrimaryModal'
import './New.css'

function New() {
	const [roomName, setRoomName] = useState('')
	const [name, setName] = useState('')
	const [gestureTranscription, setGestureTranscription] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)

	const isReady = roomName.trim() !== '' && name.trim() !== ''

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!isReady) return
		setShowConfirm(true)
	}

	const handleConfirm = () => {
		setShowConfirm(false)
		// TODO: hook up to room creation API
	}

	return (
		<form className="new-form" onSubmit={handleSubmit} noValidate>
			<h2 className="new-heading">Create a Room</h2>
			<p className="new-subtext">Start a new live session and invite others to join. Check your microphone, camera, and speakers in the preview before creating the room.</p>

			<div className="new-field">
				<div className="new-label-row">
					<label className="new-label" htmlFor="new-room-name">Room Name</label>
					<span className="new-info-wrap">
						<svg
							className="new-info-icon"
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
							<path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
						</svg>
						<span className="new-info-tooltip">
							Choose a short, descriptive name for your room so participants can easily identify and find your session.
						</span>
					</span>
				</div>
				<input
					id="new-room-name"
					className="new-input"
					type="text"
					value={roomName}
					onChange={(e) => setRoomName(e.target.value)}
					placeholder="e.g. Study Session"
					required
				/>
			</div>

			{/* Display name field */}
			<div className="new-field">
				<div className="new-label-row">
					<label className="new-label" htmlFor="new-name">Display Name</label>
					<span className="new-info-wrap">
						<svg
							className="new-info-icon"
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
							<path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
						</svg>
						<span className="new-info-tooltip">
							This is the name other participants will see during the session. Use your real name or a recognisable alias.
						</span>
					</span>
				</div>
				<input
					id="new-name"
					className="new-input"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="e.g. Clement Phoshoko"
					autoComplete="name"
					required
				/>
			</div>

			{/* Gesture transcription toggle */}
			<div className="new-toggle-row">
				<label className="new-toggle">
					<input
						type="checkbox"
						className="new-toggle__checkbox"
						checked={gestureTranscription}
						onChange={(e) => setGestureTranscription(e.target.checked)}
					/>
					<span className="new-toggle__track">
						<span className="new-toggle__thumb" />
					</span>
					<span className="new-toggle__text">Enable Sign-to-Text Transcription</span>
				</label>
				<span className="new-info-wrap">
					<svg
						className="new-info-icon"
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
						<path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
					</svg>
					<span className="new-info-tooltip">
						When enabled, the system will detect hand signs from your camera feed and convert them into on-screen text in real time.
					</span>
				</span>
			</div>

			<button className="new-submit" type="submit" disabled={!isReady}>
				Create Room
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
					<path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>

			<PrimaryModal
				open={showConfirm}
				customMsg="You're about to create a new meeting room. Make sure your devices are ready and your room name is set before starting."
				firstOption="Create Now"
				secondOption="Go Back"
				onFirstOption={handleConfirm}
				onSecondOption={() => setShowConfirm(false)}
				onClose={() => setShowConfirm(false)}
			/>
		</form>
	)
}

export default New