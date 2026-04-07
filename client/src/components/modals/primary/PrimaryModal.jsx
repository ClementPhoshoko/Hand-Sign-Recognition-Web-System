import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import './PrimaryModal.css'

function PrimaryModal({ open, customMsg, firstOption, secondOption, onFirstOption, onSecondOption, onClose }) {
	const overlayRef = useRef(null)

	// Close on Escape
	useEffect(() => {
		if (!open) return
		const handleKey = (e) => {
			if (e.key === 'Escape') onClose?.()
		}
		document.addEventListener('keydown', handleKey)
		return () => document.removeEventListener('keydown', handleKey)
	}, [open, onClose])

	// Close on overlay click
	const handleOverlayClick = (e) => {
		if (e.target === overlayRef.current) onClose?.()
	}

	if (!open) return null
	if (typeof document === 'undefined') return null

	return createPortal(
		<div className="pm-overlay" ref={overlayRef} onClick={handleOverlayClick}>
			<div className="pm-panel" role="dialog" aria-modal="true">
				{/* Top highlight edge */}
				<span className="pm-highlight" aria-hidden="true" />

				{/* Message */}
				<p className="pm-message">{customMsg}</p>

				{/* Actions */}
				<div className="pm-actions">
					{secondOption && (
						<button type="button" className="pm-btn pm-btn--secondary" onClick={onSecondOption}>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
								<line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
							</svg>
							{secondOption}
						</button>
					)}
					{firstOption && (
						<button type="button" className="pm-btn pm-btn--primary" onClick={onFirstOption}>
							{firstOption}
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
					)}
				</div>
			</div>
		</div>,
		document.body,
	)
}

export default PrimaryModal
