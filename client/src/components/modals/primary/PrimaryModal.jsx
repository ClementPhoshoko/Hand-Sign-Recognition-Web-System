import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './PrimaryModal.css'

function PrimaryModal({ open, customMsg, firstOption, secondOption, onFirstOption, onSecondOption, onClose }) {
	const overlayRef = useRef(null)
	const [shouldRender, setShouldRender] = useState(open)
	const [isExiting, setIsExiting] = useState(false)

	useEffect(() => {
		if (open) {
			setShouldRender(true)
			setIsExiting(false)
		} else if (shouldRender) {
			setIsExiting(true)
		}
	}, [open, shouldRender])

	const handleAnimationEnd = (e) => {
		// Only trigger if the overlay (outermost) finishes its animation
		if (isExiting && e.target === overlayRef.current) {
			setShouldRender(false)
			setIsExiting(false)
		}
	}

	// Close on Escape
	useEffect(() => {
		if (!open) return
		const handleKey = (e) => {
			if (e.key === 'Escape') onClose?.()
		}
		document.addEventListener('keydown', handleKey)
		return () => document.removeEventListener('keydown', handleKey)
	}, [open, onClose])

	// Lock body scroll when open
	useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [open])

	// Close on overlay click
	const handleOverlayClick = (e) => {
		if (e.target === overlayRef.current) onClose?.()
	}

	if (!shouldRender) return null
	if (typeof document === 'undefined') return null

	return createPortal(
		<div 
			className={`pm-overlay${isExiting ? ' pm-overlay--exit' : ''}`} 
			ref={overlayRef} 
			onClick={handleOverlayClick}
			onAnimationEnd={handleAnimationEnd}
		>
			<div className={`pm-panel${isExiting ? ' pm-panel--exit' : ''}`} role="dialog" aria-modal="true">
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
