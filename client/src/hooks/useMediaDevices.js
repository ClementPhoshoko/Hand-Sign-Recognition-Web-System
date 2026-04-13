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
	const [screenOn, setScreenOn] = useState(false)
	const [audioLevel, setAudioLevel] = useState(0)
	const [errors, setErrors] = useState({ camera: null, mic: null, speaker: null, screen: null })

	// Device lists
	const [devices, setDevices] = useState({ audioinput: [], audiooutput: [], videoinput: [] })
	const [selectedDevices, setSelectedDevices] = useState({ audioinput: '', audiooutput: '', videoinput: '' })

	const streamRef = useRef(null)
	const screenStreamRef = useRef(null)
	const videoRef = useRef(null)
	const screenVideoRef = useRef(null)
	const audioCtxRef = useRef(null)
	const analyserRef = useRef(null)
	const rafRef = useRef(null)
	const micStreamRef = useRef(null)

	// ── Enumerate devices ──
	const enumerateDevices = useCallback(async () => {
		try {
			const list = await navigator.mediaDevices.enumerateDevices()
			const grouped = { audioinput: [], audiooutput: [], videoinput: [] }
			list.forEach((d) => {
				if (grouped[d.kind]) {
					grouped[d.kind].push({ deviceId: d.deviceId, label: d.label || `${d.kind} ${grouped[d.kind].length + 1}` })
				}
			})
			setDevices(grouped)
		} catch {
			// Silently fail
		}
	}, [])

	// Refresh device list on mount and when devices change
	useEffect(() => {
		enumerateDevices()
		navigator.mediaDevices.addEventListener('devicechange', enumerateDevices)
		return () => navigator.mediaDevices.removeEventListener('devicechange', enumerateDevices)
	}, [enumerateDevices])

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
	const startMic = useCallback(async (deviceId) => {
		setErrors((prev) => ({ ...prev, mic: null }))

		// If stream already has audio tracks and no device switch, just enable them
		if (!deviceId && streamRef.current) {
			const existing = streamRef.current.getAudioTracks()
			if (existing.length > 0) {
				existing.forEach((t) => { t.enabled = true })
				setMicOn(true)
				if (!analyserRef.current) startAudioAnalyser(streamRef.current)
				return
			}
		}

		try {
			const constraints = { audio: deviceId ? { deviceId: { exact: deviceId } } : true }
			const audioStream = await navigator.mediaDevices.getUserMedia(constraints)

			// Stop old audio tracks before adding new ones
			if (streamRef.current) {
				streamRef.current.getAudioTracks().forEach((t) => {
					t.stop()
					streamRef.current.removeTrack(t)
				})
			}
			if (micStreamRef.current) {
				micStreamRef.current.getTracks().forEach((t) => t.stop())
			}
			micStreamRef.current = audioStream

			if (streamRef.current) {
				audioStream.getAudioTracks().forEach((t) => streamRef.current.addTrack(t))
			} else {
				streamRef.current = audioStream
			}

			// Track which device is active
			const activeTrack = audioStream.getAudioTracks()[0]
			if (activeTrack) {
				const settings = activeTrack.getSettings()
				setSelectedDevices((prev) => ({ ...prev, audioinput: settings.deviceId || deviceId || '' }))
			}

			stopAudioAnalyser()
			startAudioAnalyser(streamRef.current)
			setMicOn(true)
			enumerateDevices() // Labels become available after permission grant
		} catch (err) {
			setErrors((prev) => ({ ...prev, mic: parseMediaError(err), camera: null }))
		}
	}, [startAudioAnalyser, stopAudioAnalyser, enumerateDevices])

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
	const startCamera = useCallback(async (deviceId) => {
		setErrors((prev) => ({ ...prev, camera: null }))

		try {
			const constraints = { video: deviceId ? { deviceId: { exact: deviceId } } : true }
			const videoStream = await navigator.mediaDevices.getUserMedia(constraints)

			// Stop old video tracks before adding new ones
			if (streamRef.current) {
				streamRef.current.getVideoTracks().forEach((t) => {
					t.stop()
					streamRef.current.removeTrack(t)
				})
			}

			if (streamRef.current) {
				videoStream.getVideoTracks().forEach((t) => streamRef.current.addTrack(t))
			} else {
				streamRef.current = videoStream
			}

			// Track which device is active
			const activeTrack = videoStream.getVideoTracks()[0]
			if (activeTrack) {
				const settings = activeTrack.getSettings()
				setSelectedDevices((prev) => ({ ...prev, videoinput: settings.deviceId || deviceId || '' }))
			}

			setCameraOn(true)
			enumerateDevices() // Labels become available after permission grant
		} catch (err) {
			setErrors((prev) => ({ ...prev, camera: parseMediaError(err), mic: null }))
		}
	}, [enumerateDevices])

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

	// ── Screen Share: request display media ──
	const startScreenShare = useCallback(async () => {
		setErrors((prev) => ({ ...prev, screen: null }))
		try {
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: {
					cursor: 'always',
				},
				audio: false,
			})

			screenStreamRef.current = stream
			setScreenOn(true)

			// Handle when user clicks "Stop sharing" in browser UI
			stream.getVideoTracks()[0].addEventListener('ended', () => {
				stopScreenShare()
			})
		} catch (err) {
			if (err.name !== 'NotAllowedError') {
				setErrors((prev) => ({ ...prev, screen: parseMediaError(err) }))
			}
			setScreenOn(false)
		}
	}, [])

	const stopScreenShare = useCallback(() => {
		if (screenStreamRef.current) {
			screenStreamRef.current.getTracks().forEach((t) => t.stop())
			screenStreamRef.current = null
		}
		if (screenVideoRef.current) {
			screenVideoRef.current.srcObject = null
		}
		setScreenOn(false)
	}, [])

	const toggleScreenShare = useCallback(() => {
		if (screenOn) {
			stopScreenShare()
		} else {
			startScreenShare()
		}
	}, [screenOn, startScreenShare, stopScreenShare])

	// ── Speaker output device (if supported) ──
	const setSpeakerDevice = useCallback(async (deviceId) => {
		setSelectedDevices((prev) => ({ ...prev, audiooutput: deviceId }))

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

	// ── Switch device by kind ──
	const switchDevice = useCallback((kind, deviceId) => {
		if (kind === 'audioinput') {
			startMic(deviceId)
		} else if (kind === 'videoinput') {
			startCamera(deviceId)
		} else if (kind === 'audiooutput') {
			setSpeakerDevice(deviceId)
		}
	}, [startMic, startCamera, setSpeakerDevice])

	// ── Bind stream to <video> after it mounts ──
	useEffect(() => {
		if (cameraOn && streamRef.current && videoRef.current) {
			videoRef.current.srcObject = streamRef.current
			// Apply speaker output if set
			if (selectedDevices.audiooutput && typeof videoRef.current.setSinkId === 'function') {
				videoRef.current.setSinkId(selectedDevices.audiooutput).catch(() => {})
			}
		}
	}, [cameraOn, selectedDevices.audiooutput])

	// ── Bind screen stream to <video> after it mounts ──
	useEffect(() => {
		if (screenOn && screenStreamRef.current && screenVideoRef.current) {
			screenVideoRef.current.srcObject = screenStreamRef.current
		}
	}, [screenOn])

	// ── Cleanup on unmount ──
	useEffect(() => {
		return () => {
			stopAudioAnalyser()
			if (streamRef.current) {
				streamRef.current.getTracks().forEach((t) => t.stop())
			}
			if (screenStreamRef.current) {
				screenStreamRef.current.getTracks().forEach((t) => t.stop())
			}
		}
	}, [stopAudioAnalyser])

	return {
		videoRef,
		screenVideoRef,
		cameraOn,
		micOn,
		screenOn,
		audioLevel,
		errors,
		devices,
		selectedDevices,
		toggleCamera,
		toggleMic,
		toggleScreenShare,
		switchDevice,
		setSpeakerDevice,
	}
}
