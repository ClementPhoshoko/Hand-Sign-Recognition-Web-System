import React from 'react'
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs'
import './Video_Extracts.css'

function Video_Extracts() {
	// Mock data for transcripts
	const transcripts = [
		{ id: 1, time: '00:02', text: 'Hello', confidence: 0.98 },
		{ id: 2, time: '00:05', text: 'How are you?', confidence: 0.95 },
		{ id: 3, time: '00:08', text: 'I am learning sign language', confidence: 0.92 },
		{ id: 4, time: '00:12', text: 'This system is great', confidence: 0.97 },
		{ id: 5, time: '00:15', text: 'Thank you', confidence: 0.99 },
	]

	return (
		<div className="video-extracts-shell">
			<Breadcrumbs />

			<div className="video-extracts-canvas" aria-hidden="true">
				<div className="video-extracts-orb video-extracts-orb--1" />
				<div className="video-extracts-orb video-extracts-orb--2" />
			</div>

			<div className="video-extracts-wrap">
				<header className="video-extracts-header">
					<h1 className="video-extracts-title">Video Extracts</h1>
					<p className="video-extracts-subtitle">
						Review and export the recognized sign language transcripts from your uploaded media.
						Each segment is time-coded and includes a confidence score from the recognition engine.
					</p>
				</header>

				<div className="video-extracts-body">
					<div className="video-extracts-card">
						<div className="video-extracts-card-header">
							<h3 className="video-extracts-section-title">Transcription Results</h3>
							<button className="video-extracts-export-btn">
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
								</svg>
								Export .SRT
							</button>
						</div>

						<div className="video-extracts-list">
							<div className="video-extracts-list-header">
								<span className="col-time">Time</span>
								<span className="col-text">Detected Sign / Phrase</span>
								<span className="col-conf">Confidence</span>
							</div>
							{transcripts.map((item) => (
								<div key={item.id} className="video-extracts-item">
									<span className="col-time">{item.time}</span>
									<span className="col-text">{item.text}</span>
									<span className="col-conf">
										<div className="conf-bar-bg">
											<div 
												className="conf-bar-fill" 
												style={{ width: `${item.confidence * 100}%` }}
											/>
										</div>
										{(item.confidence * 100).toFixed(0)}%
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Video_Extracts
