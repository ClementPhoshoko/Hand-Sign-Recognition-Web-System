import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import './UploadLayout.css'

function UploadLayout() {
	const navigate = useNavigate()
	const [mediaType, setMediaType] = useState('video') // 'video' | 'photo'
	const [file, setFile] = useState(null)
	const [previewUrl, setPreviewUrl] = useState(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [isProcessing, setIsProcessing] = useState(false)
	const [progress, setProgress] = useState({ upload: 0, conversion: 0 })
	const fileInputRef = useRef(null)
	const videoPreviewRef = useRef(null)

	// Clean up preview URL when file changes or component unmounts
	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl)
		}
	}, [previewUrl])

	const handleTypeChange = (type) => {
		if (type === mediaType) return
		setMediaType(type)
		setFile(null)
		if (previewUrl) URL.revokeObjectURL(previewUrl)
		setPreviewUrl(null)
		setIsPlaying(false)
		setIsProcessing(false)
		setProgress({ upload: 0, conversion: 0 })
	}

	const handleFileSelect = (e) => {
		const selectedFile = e.target.files[0]
		if (selectedFile) {
			setFile(selectedFile)
			
			// Create preview URL
			if (previewUrl) URL.revokeObjectURL(previewUrl)
			const url = URL.createObjectURL(selectedFile)
			setPreviewUrl(url)
			setIsPlaying(false)
			setIsProcessing(false)
			setProgress({ upload: 0, conversion: 0 })
		}
	}

	const togglePlay = (e) => {
		e.stopPropagation() // Don't trigger file input
		if (!videoPreviewRef.current) return

		if (isPlaying) {
			videoPreviewRef.current.pause()
		} else {
			videoPreviewRef.current.play()
		}
		setIsPlaying(!isPlaying)
	}

	const handleStartProcessing = () => {
		if (isProcessing) return
		setIsProcessing(true)
		
		// 1. Start Upload
		let up = 0
		setProgress({ upload: 0, conversion: 0 })
		const upInterval = setInterval(() => {
			up += Math.floor(Math.random() * 15) + 5
			if (up >= 100) {
				up = 100
				clearInterval(upInterval)
				// 2. Start Conversion after Upload finished
				startConversion()
			}
			setProgress(prev => ({ ...prev, upload: up }))
		}, 300)
	}

	const startConversion = () => {
		let conv = 0
		const convInterval = setInterval(() => {
			conv += Math.floor(Math.random() * 10) + 2
			if (conv >= 100) {
				conv = 100
				clearInterval(convInterval)
				setIsProcessing(false)
			}
			setProgress(prev => ({ ...prev, conversion: conv }))
		}, 500)
	}

	const triggerFileInput = () => {
		fileInputRef.current?.click()
	}

	const handleActionClick = () => {
		if (progress.conversion === 100) {
			if (mediaType === 'video') {
				navigate('/upload/videoExtracts')
			} else {
				navigate('/upload/photoExtracts')
			}
		} else {
			handleStartProcessing()
		}
	}

	const formatFileName = (name) => {
		if (!name) return ''
		const maxLength = 46
		if (name.length <= maxLength) return name
		return name.substring(0, maxLength - 3) + '...'
	}

	return (
		<div className="upload-shell">
			<Breadcrumbs />

			{/* ── Ambient orbs ── */}
			<div className="upload-canvas" aria-hidden="true">
				<div className="upload-orb upload-orb--1" />
				<div className="upload-orb upload-orb--2" />
			</div>

			<div className="upload-wrap">
				<header className="upload-header">
					<h1 className="upload-title">Upload {mediaType === 'video' ? 'Video' : 'Photo'}</h1>
					<p className="upload-subtitle">
						Upload your sign language {mediaType} for recognition and analysis. 
						For best results, ensure the subject is well-lit, the background is neutral, 
						and all hand gestures are clearly visible within the frame. 
						Supported formats: {mediaType === 'video' ? 'MP4, MOV, AVI' : 'JPG, PNG, WEBP'}.
					</p>

					{/* ── Main Media Type Tabs ── */}
					<div className="upload-main-tabs">
						<button
							className={`upload-main-tab ${mediaType === 'video' ? 'is-active' : ''}`}
							onClick={() => handleTypeChange('video')}
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<path d="M15 10l4.55-2.27A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.89L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							Video
						</button>
						<button
							className={`upload-main-tab ${mediaType === 'photo' ? 'is-active' : ''}`}
							onClick={() => handleTypeChange('photo')}
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
								<circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
								<path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							Photo
						</button>
					</div>
				</header>

				<div className={`upload-body ${file ? 'upload-body--two-col' : ''}`}>
					{/* Hidden Input */}
					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileSelect}
						accept={mediaType === 'video' ? 'video/*' : 'image/*'}
						style={{ display: 'none' }}
					/>

					{/* Left column / Main Dropzone */}
					<div className="upload-main-col">
						{file && previewUrl ? (
							<div className="upload-preview-container" onClick={triggerFileInput}>
								{mediaType === 'video' ? (
									<video 
										ref={videoPreviewRef}
										src={previewUrl} 
										className="upload-preview-media" 
										muted 
										onPlay={() => setIsPlaying(true)}
										onPause={() => setIsPlaying(false)}
										onEnded={() => setIsPlaying(false)}
									/>
								) : (
									<img src={previewUrl} alt="Preview" className="upload-preview-media" />
								)}
								<div className="upload-preview-overlay">
									{mediaType === 'video' && (
										<button 
											type="button" 
											className="upload-play-btn" 
											onClick={togglePlay}
											aria-label={isPlaying ? 'Pause video' : 'Play video'}
										>
											{isPlaying ? (
												<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
													<rect x="6" y="4" width="4" height="16" rx="1" />
													<rect x="14" y="4" width="4" height="16" rx="1" />
												</svg>
											) : (
												<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
													<path d="M8 5.14v14c0 .86 1.01 1.3 1.63.7L19.38 12.7c.38-.37.38-1.03 0-1.4L9.63 4.45c-.62-.61-1.63-.17-1.63.69z" />
												</svg>
											)}
										</button>
									)}
									<div className="upload-preview-badge">Preview</div>
									<p>Click to change {mediaType}</p>
								</div>
							</div>
						) : (
							<div className="upload-dropzone__content" onClick={triggerFileInput}>
								{mediaType === 'video' ? (
									<svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M3 15V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								) : (
									<svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
										<path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
										<rect x="3" y="15" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="2" />
									</svg>
								)}
								<p>Drag and drop your {mediaType} here, or click to browse</p>
								<span className="upload-dropzone__hint">
									{mediaType === 'video' ? 'Supports MP4, WebM up to 50MB' : 'Supports JPG, PNG, WebP up to 10MB'}
								</span>
							</div>
						)}
					</div>

					{/* Right column: Unified Sidebar */}
					{file && (
						<aside className="upload-side-col">
							<div className="upload-sidebar-card">
								<div className="upload-sidebar-group">
									<h3 className="upload-section-title">File Properties</h3>
									<div className="upload-props">
										<div className="upload-prop-item">
											<span className="upload-prop-label">File Title</span>
											<p className="upload-prop-value">{formatFileName(file.name)}</p>
										</div>
										<div className="upload-prop-item">
											<span className="upload-prop-label">Media Type</span>
											<p className="upload-prop-value">{mediaType === 'video' ? 'Video' : 'Still Image'}</p>
										</div>
										<div className="upload-prop-item">
											<span className="upload-prop-label">Status</span>
											<p className="upload-prop-value">
												{progress.conversion === 100 ? 'Completed' : (isProcessing ? 'Processing...' : 'Ready')}
											</p>
										</div>
									</div>
								</div>

								<div className="upload-sidebar-divider" aria-hidden="true" />

								<div className="upload-sidebar-group">
									<h3 className="upload-section-title">Processing Progress</h3>
									<div className="upload-progress-view">
										<div className="upload-prog-item">
											<div className="upload-prog-header">
												<span>Upload</span>
												<span>{progress.upload}%</span>
											</div>
											<div className="upload-prog-bar">
												<div className="upload-prog-fill" style={{ width: `${progress.upload}%` }} />
											</div>
										</div>

										<div className="upload-prog-item">
											<div className="upload-prog-header">
												<span>{mediaType === 'video' ? 'Conversion' : 'Recognition'}</span>
												<span>{progress.conversion}%</span>
											</div>
											<div className="upload-prog-bar">
												<div 
													className={`upload-prog-fill ${progress.upload < 100 ? 'is-waiting' : ''}`} 
													style={{ width: `${progress.conversion}%` }} 
												/>
											</div>
										</div>
									</div>
								</div>

								<button 
									type="button" 
									className={`upload-convert-action-btn ${isProcessing ? 'is-disabled' : ''}`}
									onClick={handleActionClick}
									disabled={isProcessing}
								>
									{isProcessing 
										? (progress.upload < 100 ? 'Uploading...' : 'Converting...') 
										: (progress.conversion === 100 ? 'View Transcripts' : 'Start Upload & Convert')
									}
									{progress.conversion === 100 ? (
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
											<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
											<circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									) : (
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
											<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
										</svg>
									)}
								</button>
							</div>
						</aside>
					)}
				</div>
			</div>
		</div>
	)
}

export default UploadLayout
