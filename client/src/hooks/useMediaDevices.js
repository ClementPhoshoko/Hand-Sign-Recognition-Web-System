import { useState, useRef, useCallback, useEffect } from 'react'

/**
 * Parses a getUserMedia / device error into a user-friendly message.
 */
function parseMediaError(err) {
	const name = err?.name || ''
	if (name === 'NotAllowedError' || name === 'PermissionDeniedError')
		return 'Permission denied'
	if (name === 'NotFoundError' || name === 'DevicesNotFoundError')
		return 'Device not found'
	if (name === 'NotReadableError' || name === 'TrackStartError')
		return 'Device already in use'
	if (name === 'OverconstrainedError')
		return 'Device constraints failed'
	return 'Device error'
}

export default function useMediaDevices() {
	const [cameraOn, setCameraOn] = useState(false)
	const [micOn, setMicOn] = useState(false)
	const [audioLevel, setAudioLevel] = useState(0)
	const [errors, setErrors] = useState({ camera: null, mic: null, speaker: null })

	const streamRef = useRef(null)
	const videoRef = useRef(null)
	const audioCtxRef = useRef(null)
	const analyserRef = useRef(null)
	const rafRef = useRef(null)

	// ── Audio level analyser ──
	const startAudioAnalyser = useCallback((stream) => {
		try {
			const ctx = new (window.AudioContext || window.webkitAudioContext)()
			const source = ctx.createMediaStreamSource(stream)
			const analyser = ctx.createAnalyser()
			analyser.fftSize = 256
			analyser.smoothingTimeConstant = 0.5
			source.connect(analyser)

			audioCtxRef.current = ctx
			analyserRef.current = analyser

			const dataArray = new Uint8Array(analyser.frequencyBinCount)
			const poll = () => {
				analyser.getByteFrequencyData(dataArray)
				let sum = 0
				const bins = Math.min(32, dataArray.length)
				for (let i = 0; i < bins; i++) sum += dataArray[i]
				setAudioLevel(sum / (bins * 255))
				rafRef.current = requestAnimationFrame(poll)
			}
			poll()
		} catch {
			// Silently fail — audio level is cosmetic
		}
	}, [])

	const stopAudioAnalyser = useCallback(() => {
		if (rafRef.current) {
			cancelAnimationFrame(rafRef.current)
			rafRef.current = null
		}
		if (audioCtxRef.current) {
			audioCtxRef.current.close().catch(() => {})
			audioCtxRef.current = null
		}
		analyserRef.current = null
		setAudioLevel(0)
	}, [])

	// ── Mic: request audio-only or enable existing tracks ──
	const startMic = useCallback(async () => {
		setErrors((prev) => ({ ...prev, mic: null }))

		// If stream already has audio tracks, just enable them
		if (streamRef.current) {
			const existing = streamRef.current.getAudioTracks()
			if (existing.length > 0) {
				existing.forEach((t) => { t.enabled = true })
				setMicOn(true)
				if (!analyserRef.current) startAudioAnalyser(streamRef.current)
				return
			}
		}

		try {
			const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })

			if (streamRef.current) {
				// Add audio track to existing stream
				audioStream.getAudioTracks().forEach((t) => streamRef.current.addTrack(t))
			} else {
				streamRef.current = audioStream
			}

			startAudioAnalyser(streamRef.current)
			setMicOn(true)
		} catch (err) {
			setErrors((prev) => ({ ...prev, mic: parseMediaError(err) }))
		}
	}, [startAudioAnalyser])

	const stopMic = useCallback(() => {
		stopAudioAnalyser()
		if (streamRef.current) {
			streamRef.current.getAudioTracks().forEach((t) => { t.enabled = false })
		}
		setMicOn(false)
	}, [stopAudioAnalyser])

	const toggleMic = useCallback(() => {
		if (micOn) {
			stopMic()
		} else {
			startMic()
		}
	}, [micOn, startMic, stopMic])

	// ── Camera: request video-only or toggle video tracks ──
	const startCamera = useCallback(async () => {
		setErrors((prev) => ({ ...prev, camera: null }))

		try {
			const videoStream = await navigator.mediaDevices.getUserMedia({ video: true })

			if (streamRef.current) {
				videoStream.getVideoTracks().forEach((t) => streamRef.current.addTrack(t))
			} else {
				streamRef.current = videoStream
			}

			setCameraOn(true)
		} catch (err) {
			setErrors((prev) => ({ ...prev, camera: parseMediaError(err) }))
		}
	}, [])

	const stopCamera = useCallback(() => {
		if (streamRef.current) {
			streamRef.current.getVideoTracks().forEach((t) => {
				t.stop()
				streamRef.current.removeTrack(t)
			})
		}
		if (videoRef.current) {
			videoRef.current.srcObject = null
		}
		setCameraOn(false)
	}, [])

	const toggleCamera = useCallback(() => {
		if (cameraOn) {
			stopCamera()
		} else {
			startCamera()
		}
	}, [cameraOn, startCamera, stopCamera])

	// ── Speaker output device (if supported) ──
	const setSpeakerDevice = useCallback(async (deviceId) => {
		if (!videoRef.current) return
		if (typeof videoRef.current.setSinkId !== 'function') {
			setErrors((prev) => ({ ...prev, speaker: 'Not supported by browser' }))
			return
		}
		try {
			await videoRef.current.setSinkId(deviceId)
			setErrors((prev) => ({ ...prev, speaker: null }))
		} catch (err) {
			setErrors((prev) => ({ ...prev, speaker: parseMediaError(err) }))
		}
	}, [])

	// ── Bind stream to <video> after it mounts ──
	useEffect(() => {
		if (cameraOn && streamRef.current && videoRef.current) {
			videoRef.current.srcObject = streamRef.current
		}
	}, [cameraOn])

	// ── Cleanup on unmount ──
	useEffect(() => {
		return () => {
			stopAudioAnalyser()
			if (streamRef.current) {
				streamRef.current.getTracks().forEach((t) => t.stop())
			}
		}
	}, [stopAudioAnalyser])

	return {
		videoRef,
		cameraOn,
		micOn,
		audioLevel,
		errors,
		toggleCamera,
		toggleMic,
		setSpeakerDevice,
	}
}
