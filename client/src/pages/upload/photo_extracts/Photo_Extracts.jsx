import React from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs'
import './Photo_Extracts.css'

function Photo_Extracts() {
	const { imageId } = useParams()
	
	const recognitionResult = {
		signName: 'Peace / Victory',
		description: 'The "V" sign is made by extending the index and middle fingers while the other fingers are folded.',
		category: 'Common Gestures',
		confidence: 0.99,
		detectedAt: '2026-04-30 14:20',
		tags: ['Greeting', 'Victory', 'Peace'],
		imageId: imageId || 'IMG-20260430-001'
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
						<div className="photo-extracts-card-header">
							<div className="photo-extracts-card-header-left">
								<h3 className="photo-extracts-section-title">Recognition Result</h3>
								<span className="photo-extracts-id">{recognitionResult.imageId}</span>
							</div>
							<div className="photo-extracts-actions">
								<button className="photo-extracts-action-btn">
									<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
									</svg>
									Download Report
								</button>
							</div>
						</div>

						<div className="photo-extracts-result-section">
							<div className="photo-extracts-badge">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
								</svg>
								Detected Meaning
							</div>
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

							<div className="photo-extracts-divider" />

							<div className="photo-extracts-tags-section">
								<h3 className="photo-extracts-section-title">Tags</h3>
								<div className="photo-extracts-tags">
									{recognitionResult.tags.map(tag => (
										<span key={tag} className="photo-extracts-tag">{tag}</span>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Photo_Extracts
