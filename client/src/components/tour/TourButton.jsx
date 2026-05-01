import React, { useState } from 'react'
import Tour from './Tour'

function TourButton({ steps, buttonText = 'Help', buttonIcon }) {
	const [isTourOpen, setIsTourOpen] = useState(false)

	const defaultIcon = (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
			<circle cx="12" cy="12" r="10"/>
			<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
			<line x1="12" y1="17" x2="12.01" y2="17"/>
		</svg>
	)

	return (
		<>
			<button 
				className="tour-trigger-btn"
				onClick={() => setIsTourOpen(true)}
			>
				<span className="tour-trigger-icon">{buttonIcon || defaultIcon}</span>
				{buttonText}
			</button>

			<Tour 
				steps={steps} 
				isOpen={isTourOpen} 
				onClose={() => setIsTourOpen(false)} 
			/>
		</>
	)
}

export default TourButton
