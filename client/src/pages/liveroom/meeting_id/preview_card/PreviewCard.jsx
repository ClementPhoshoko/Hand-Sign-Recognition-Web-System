import React, { useState, useEffect } from 'react'
import './PreviewCard.css'

function PreviewCard({ participant, position, onMouseEnter, onMouseLeave }) {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Simulate a quick fetch/loading period
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 600)
		return () => clearTimeout(timer)
	}, [participant?.id])

	if (!participant) return null

	const { name, avatar, role, status, isSpeaking, isVerified } = participant

	return (
		<div 
			className={`gl-preview-card ${isLoading ? 'is-loading' : 'is-ready'}`}
			style={{
				top: position?.y ?? 0,
				left: position?.x ?? 0
			}}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div className="gl-preview-card__glow" aria-hidden="true" />
			
			{isLoading ? (
				<div className="gl-preview-card__loader">
					<div className="gl-preview-card__spinner">
						<svg viewBox="0 0 50 50">
							<circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" />
						</svg>
					</div>
				</div>
			) : (
				<>
					<div className="gl-preview-card__top">
						{isVerified ? (
							<div className="gl-preview-card__badge is-verified">
								<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
									<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
								</svg>
								Verified
							</div>
						) : (
							<div className="gl-preview-card__badge is-unverified">
								<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
									<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
								</svg>
								Not Verified
							</div>
						)}
					</div>

					<div className="gl-preview-card__header">
						<div className="gl-preview-card__avatar-wrap">
							<div className={`gl-preview-card__avatar${isSpeaking ? ' is-speaking' : ''}`}>
								<img src={avatar} alt={name} draggable="false" />
							</div>
							<div className={`gl-preview-card__status-indicator is-${status.toLowerCase()}`} />
						</div>
						
						<div className="gl-preview-card__identity">
							<h3 className="gl-preview-card__name">{name}</h3>
							<span className="gl-preview-card__role">{role}</span>
						</div>
					</div>

					<div className="gl-preview-card__body">
						<p className="gl-preview-card__description">
							{role === 'Presenter' || role === 'Host' 
								? `${name} is the host of this meeting, responsible for coordinating the session, managing participant interactions, and overseeing the overall presentation flow and technical aspects of the meeting.` 
								: `${name} is an active participant in this meeting, engaging in collaborative discussions, contributing valuable insights to the project, and working together with the team to achieve the meeting objectives.`}
							{!isVerified && (
								<span className="gl-preview-card__verified-advice">
									{" "}Note: This user has not completed the identity verification process. Please exercise caution when sharing sensitive information or granting elevated permissions during the session.
								</span>
							)}
						</p>
					</div>
				</>
			)}
		</div>
	)
}

export default PreviewCard
