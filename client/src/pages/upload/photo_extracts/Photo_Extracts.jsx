import React from 'react'
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs'
import './Photo_Extracts.css'

function Photo_Extracts() {
	// Mock data for photo recognition
	const recognitionResult = {
		signName: 'Peace / Victory',
		description: 'The "V" sign is made by extending the index and middle fingers while the other fingers are folded.',
		category: 'Common Gestures',
		confidence: 0.99,
		detectedAt: '2026-04-30 14:20',
		tags: ['Greeting', 'Victory', 'Peace']
	}

	return (
		<div className="photo-extracts-shell">
			<Breadcrumbs />

			<div className="photo-extracts-canvas" aria-hidden="true">
				<div className="photo-extracts-orb photo-extracts-orb--1" />
				<div className="photo-extracts-orb photo-extracts-orb--2" />
			</div>

			<div className="photo-extracts-wrap">
				<header className="photo-extracts-header">
					<h1 className="photo-extracts-title">Sign Analysis</h1>
					<p className="photo-extracts-subtitle">
						Detailed breakdown of the sign language gesture detected in your photo.
						Our engine analyzes hand orientation, finger positions, and context.
					</p>
				</header>

				<div className="photo-extracts-body">
					<div className="photo-extracts-card">
						<div className="photo-extracts-result-section">
							<div className="photo-extracts-badge">Detected Meaning</div>
							<h2 className="photo-extracts-meaning">{recognitionResult.signName}</h2>
							
							<div className="photo-extracts-meta">
								<div className="photo-extracts-meta-item">
									<span className="photo-extracts-meta-label">Category</span>
									<span className="photo-extracts-meta-value">{recognitionResult.category}</span>
								</div>
								<div className="photo-extracts-meta-item">
									<span className="photo-extracts-meta-label">Confidence</span>
									<span className="photo-extracts-meta-value">{(recognitionResult.confidence * 100).toFixed(0)}%</span>
								</div>
							</div>

							<div className="photo-extracts-divider" />

							<div className="photo-extracts-description">
								<h3 className="photo-extracts-section-title">Description</h3>
								<p>{recognitionResult.description}</p>
							</div>

							<div className="photo-extracts-tags">
								{recognitionResult.tags.map(tag => (
									<span key={tag} className="photo-extracts-tag">{tag}</span>
								))}
							</div>
						</div>

						<div className="photo-extracts-actions">
							<button className="photo-extracts-action-btn photo-extracts-action-btn--primary">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
								</svg>
								Download Report
							</button>
							<button className="photo-extracts-action-btn photo-extracts-action-btn--ghost">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
								</svg>
								Learn More
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Photo_Extracts
