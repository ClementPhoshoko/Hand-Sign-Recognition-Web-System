import { useState, useRef, useLayoutEffect } from 'react'
import bgImg from '../../assets/avatars/hello_from_the_video_call_1.png'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import Login from './login/Login'
import Register from './register/Register'
import './AuthLayout.css'

const termsContent = {
	terms: {
		eyebrow: 'Terms and Conditions',
		title: 'What this platform includes',
		intro:
			'The Hand Sign Recognition Web System is built as a real-time web platform for detecting hand signs from a live camera feed and mapping them to emojis, labels, symbols, or predefined meanings.',
		sections: [
			{
				heading: 'Core platform scope',
				body:
					'The system includes a React frontend, a Node.js gateway API, and a Python FastAPI computer vision service. Together they capture webcam input, send frames for inference, classify gestures, and return recognizable outputs to the interface.',
			},
			{
				heading: 'Available MVP features',
				body:
					'Current core capabilities include real-time webcam capture, hand landmark detection, recognition of basic gestures such as fist, open hand, and thumbs up, plus mapped UI feedback like emojis or text labels.',
			},
			{
				heading: 'Performance expectations',
				body:
					'The platform is designed for responsive processing using interval-based frame submission, resized image payloads, lightweight inference, and a service-oriented architecture that keeps the frontend, backend, and AI engine separated.',
			},
		],
	},
	privacy: {
		eyebrow: 'Privacy Policy',
		title: 'How system data is used',
		intro:
			'The project processes live camera frames for hand detection and gesture recognition. Captured input is sent through the frontend to the backend API and then forwarded to the AI service strictly to generate prediction results for the active session.',
		sections: [
			{
				heading: 'Processed content',
				body:
					'The system works with webcam frames, extracted hand landmarks, and prediction labels such as thumbs_up, fist, or open hand. These outputs are used to display real-time feedback in the UI.',
			},
			{
				heading: 'Technical flow',
				body:
					'Image frames move from the React client to the Node.js gateway and then to the FastAPI vision engine, where MediaPipe, OpenCV, and optional machine learning models are used to detect and classify gestures.',
			},
			{
				heading: 'Intended use',
				body:
					'The platform is intended for accessibility tools, educational sign-language scenarios, and gesture-driven interfaces. Any expansion to broader analytics, storage, or training workflows should be clearly disclosed before use.',
			},
		],
	},
}

function AuthLayout() {
	const [activeTab, setActiveTab] = useState('login')
	const [displayedTab, setDisplayedTab] = useState('login')
	const [isExiting, setIsExiting] = useState(false)
	const [activeInfoPanel, setActiveInfoPanel] = useState(null)
	const wrapRef = useRef(null)
	const cardRef = useRef(null)
	const prevHeightRef = useRef(null)

	useLayoutEffect(() => {
		const wrap = wrapRef.current
		const card = cardRef.current
		if (!wrap || !card) return

		const updateLayoutMetrics = () => {
			const wrapRect = wrap.getBoundingClientRect()
			const cardHeight = card.offsetHeight
			const availableLeftWidth = Math.max(wrapRect.left - 24, 0)

			wrap.style.setProperty('--auth-card-height', `${cardHeight}px`)
			wrap.style.setProperty('--auth-info-panel-width', `${Math.min(380, availableLeftWidth)}px`)
		}

		updateLayoutMetrics()

		const resizeObserver = typeof ResizeObserver !== 'undefined'
			? new ResizeObserver(updateLayoutMetrics)
			: null

		resizeObserver?.observe(wrap)
		resizeObserver?.observe(card)
		window.addEventListener('resize', updateLayoutMetrics)

		return () => {
			resizeObserver?.disconnect()
			window.removeEventListener('resize', updateLayoutMetrics)
		}
	}, [])

	useLayoutEffect(() => {
		const wrap = wrapRef.current
		const card = cardRef.current
		if (!card || !wrap) return
		const newHeight = card.offsetHeight
		wrap.style.setProperty('--auth-card-height', `${newHeight}px`)
		let timeoutId
		if (prevHeightRef.current !== null) {
			card.style.transition = 'none'
			card.style.height = `${prevHeightRef.current}px`
			card.offsetHeight // force reflow
			card.style.transition = 'height 400ms cubic-bezier(0.22, 1, 0.36, 1)'
			card.style.height = `${newHeight}px`
			// Safety fallback: clear inline styles if transitionend doesn't fire
			timeoutId = setTimeout(() => {
				card.style.height = ''
				card.style.transition = ''
			}, 450)
		}
		prevHeightRef.current = newHeight
		return () => clearTimeout(timeoutId)
	}, [displayedTab])

	const handleCardTransitionEnd = (e) => {
		if (e.propertyName === 'height' && e.target === cardRef.current) {
			cardRef.current.style.height = ''
			cardRef.current.style.transition = ''
		}
	}

	const switchTab = (tab) => {
		if (tab === activeTab || isExiting) return
		setActiveTab(tab)
		setIsExiting(true)
	}

	const handleFormAnimationEnd = (e) => {
		if (e.target !== e.currentTarget) return
		if (isExiting) {
			setDisplayedTab(activeTab)
			setIsExiting(false)
		}
	}

	const handleOpenInfoPanel = (panel) => {
		setActiveInfoPanel(panel)
	}

	const handleCloseInfoPanel = () => {
		setActiveInfoPanel(null)
	}

	const currentInfo = activeInfoPanel ? termsContent[activeInfoPanel] : null

	return (
		<div
			className="auth-shell"
			style={{ backgroundImage: `url(${bgImg})` }}
		>
			<Breadcrumbs />
			<div className="auth-wrap" ref={wrapRef}>

				{/* ── Ambient background orbs ── */}
				<div className="auth-canvas" aria-hidden="true">
					<div className="auth-orb auth-orb--1" />
					<div className="auth-orb auth-orb--2" />
					<div className="auth-orb auth-orb--3" />
				</div>

				{currentInfo ? (
					<aside className="auth-info-panel" aria-live="polite">
						<div className="auth-info-panel__header">
							<p className="auth-info-panel__eyebrow">{currentInfo.eyebrow}</p>
							<button
								type="button"
								className="auth-info-panel__close"
								onClick={handleCloseInfoPanel}
								aria-label="Close information panel"
							>
								Close
							</button>
						</div>
						<div className="auth-info-panel__content">
							<h2 className="auth-info-panel__title">{currentInfo.title}</h2>
							<p className="auth-info-panel__intro">{currentInfo.intro}</p>
							<div className="auth-info-panel__sections">
								{currentInfo.sections.map((section) => (
									<section key={section.heading} className="auth-info-panel__section">
										<h3 className="auth-info-panel__section-title">{section.heading}</h3>
										<p className="auth-info-panel__section-body">{section.body}</p>
									</section>
								))}
							</div>
						</div>
					</aside>
				) : null}

				{/* ── Card ── */}
				<div className="auth-card" role="main" ref={cardRef} onTransitionEnd={handleCardTransitionEnd}>

				{/* Avatar */}
				<div className="auth-avatar" aria-hidden="true">GL</div>

				{/* System name */}
				<p className="auth-system-name">GL Web System</p>

				{/* Toggle */}
				<div className="auth-toggle" role="tablist" aria-label="Authentication mode">
					<button
						role="tab"
						aria-selected={activeTab === 'login'}
						className={`auth-toggle-btn${activeTab === 'login' ? ' auth-toggle-btn--active' : ''}`}
					onClick={() => switchTab('login')}
					>
						Login
					</button>
					<button
						role="tab"
						aria-selected={activeTab === 'register'}
						className={`auth-toggle-btn${activeTab === 'register' ? ' auth-toggle-btn--active' : ''}`}
					onClick={() => switchTab('register')}
					>
						Register
					</button>
				</div>

				{/* Dynamic form area */}
				<div
					key={displayedTab}
					className={`auth-form-area${isExiting ? ' auth-form-area--exit' : ''}`}
					onAnimationEnd={handleFormAnimationEnd}
				>
					{displayedTab === 'login' ? <Login /> : <Register onOpenInfoPanel={handleOpenInfoPanel} />}
				</div>

				</div>
			</div>
		</div>
	)
}

export default AuthLayout
