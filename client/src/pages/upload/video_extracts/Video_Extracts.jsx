import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../../../components/breadcrumbs/Breadcrumbs'
import './Video_Extracts.css'

function Video_Extracts() {
	const { videoId } = useParams()
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 5
	
	const allTranscripts = [
		{ id: 1, time: '00:02', text: 'Hello', confidence: 0.98 },
		{ id: 2, time: '00:05', text: 'How are you?', confidence: 0.95 },
		{ id: 3, time: '00:08', text: 'I am learning sign language', confidence: 0.92 },
		{ id: 4, time: '00:12', text: 'This system is great', confidence: 0.97 },
		{ id: 5, time: '00:15', text: 'Thank you', confidence: 0.99 },
		{ id: 6, time: '00:18', text: 'Good morning', confidence: 0.96 },
		{ id: 7, time: '00:21', text: 'Nice to meet you', confidence: 0.94 },
		{ id: 8, time: '00:24', text: 'See you later', confidence: 0.98 },
		{ id: 9, time: '00:27', text: 'Please', confidence: 0.97 },
		{ id: 10, time: '00:30', text: 'Sorry', confidence: 0.95 },
		{ id: 11, time: '00:33', text: 'Yes', confidence: 0.99 },
		{ id: 12, time: '00:36', text: 'No', confidence: 0.98 },
	]
	
	const totalPages = Math.ceil(allTranscripts.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const transcripts = allTranscripts.slice(startIndex, endIndex)
	
	const videoData = {
		videoId: videoId || 'VID-20260430-001'
	}

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
							<div className="video-extracts-card-header-left">
								<h3 className="video-extracts-section-title">Transcription Results</h3>
								<span className="video-extracts-id">{videoData.videoId}</span>
							</div>
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
									<span className="col-text">
										<span className="col-text-icon">
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
												<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
											</svg>
										</span>
										{item.text}
									</span>
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

						<div className="video-extracts-pagination">
							<span className="video-extracts-pagination-info">
								{startIndex + 1}-{Math.min(endIndex, allTranscripts.length)} of {allTranscripts.length}
							</span>
							<div className="video-extracts-pagination-controls">
								<button 
									className="video-extracts-pagination-btn"
									onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
									disabled={currentPage === 1}
								>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="15 18 9 12 15 6"/>
									</svg>
								</button>
								<span className="video-extracts-pagination-page">
									Page {currentPage} of {totalPages}
								</span>
								<button 
									className="video-extracts-pagination-btn"
									onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
									disabled={currentPage === totalPages}
								>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
										<polyline points="9 18 15 12 9 6"/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Video_Extracts
