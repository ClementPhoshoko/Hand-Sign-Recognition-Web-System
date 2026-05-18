import { useState } from 'react'
import './Notifiation.css'

const NOTIFICATIONS_DATA = [
	{
		id: 1,
		title: 'Hand Sign Detected',
		preview: 'New hand sign detected in Liveroom #42...',
		body: 'A new hand sign was detected and successfully transcribed in Liveroom #42. Transcription: "Hello, how can I help you today?"',
		time: '2 mins ago',
		unread: true,
		type: 'detection',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
				<circle cx="12" cy="12" r="3" />
			</svg>
		)
	},
	{
		id: 2,
		title: 'System Update',
		preview: 'Version 2.4.0 is now live with improved...',
		body: 'We have deployed version 2.4.0 of the GL Web System. This update includes improved MediaPipe tracking for low-light environments and faster subtitle generation for uploaded videos.',
		time: '1 hour ago',
		unread: false,
		type: 'system',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<circle cx="12" cy="12" r="10" />
				<line x1="12" y1="16" x2="12" y2="12" />
				<line x1="12" y1="8" x2="12.01" y2="8" />
			</svg>
		)
	},
	{
		id: 3,
		title: 'Video Processed',
		preview: 'Your video "Meeting_Record.mp4" has been...',
		body: 'Great news! Your video "Meeting_Record.mp4" has finished processing. You can now download the generated subtitle file from your dashboard.',
		time: '3 hours ago',
		unread: false,
		type: 'upload',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
				<polyline points="17 8 12 3 7 8" />
				<line x1="12" y1="3" x2="12" y2="15" />
			</svg>
		)
	},
	{
		id: 4,
		title: 'Security Alert',
		preview: 'New login detected from a new device...',
		body: 'A new login was detected for your account from a Chrome browser on a Windows device. If this wasn\'t you, please reset your password immediately.',
		time: 'Yesterday',
		unread: false,
		type: 'security',
		icon: (
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
				<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
			</svg>
		)
	}
]

function Notifications() {
	const [selectedId, setSelectedId] = useState(NOTIFICATIONS_DATA[0].id)
	const selectedNotif = NOTIFICATIONS_DATA.find(n => n.id === selectedId)

	return (
		<div className="gl-notif-page">
			<div className="gl-notif-container">
				{/* Left Side: List of history */}
				<aside className="gl-notif-sidebar">
					<div className="gl-notif-header">
						<h1>Notifications</h1>
						<span className="gl-notif-count">4</span>
					</div>
					<div className="gl-notif-list">
						{NOTIFICATIONS_DATA.map((notif) => (
							<div 
								key={notif.id}
								className={`gl-notif-item ${selectedId === notif.id ? 'is-selected' : ''} ${notif.unread ? 'is-unread' : ''}`}
								onClick={() => setSelectedId(notif.id)}
							>
								<div className="gl-notif-item-icon" data-type={notif.type}>
									{notif.icon}
								</div>
								<div className="gl-notif-item-info">
									<div className="gl-notif-item-top">
										<span className="gl-notif-item-title">{notif.title}</span>
										<span className="gl-notif-item-time">{notif.time}</span>
									</div>
									<p className="gl-notif-item-preview">{notif.preview}</p>
								</div>
							</div>
						))}
					</div>
				</aside>

				{/* Right Side: Message content body */}
				<main className="gl-notif-content">
					{selectedNotif ? (
						<div className="gl-notif-detail">
							<div className="gl-notif-detail-header">
								<div className="gl-notif-detail-title-row">
									<h2>{selectedNotif.title}</h2>
									<span className="gl-notif-detail-time">{selectedNotif.time}</span>
								</div>
								<div className="gl-notif-detail-meta">
									<span className="gl-notif-tag" data-type={selectedNotif.type}>
										{selectedNotif.type}
									</span>
								</div>
							</div>
							<div className="gl-notif-detail-body">
								<p>{selectedNotif.body}</p>
							</div>
							<div className="gl-notif-detail-actions">
								<button className="gl-btn-primary">Mark as Read</button>
								<button className="gl-btn-secondary">Delete</button>
							</div>
						</div>
					) : (
						<div className="gl-notif-empty">
							<p>Select a notification to view details</p>
						</div>
					)}
				</main>
			</div>
		</div>
	)
}

export default Notifications
