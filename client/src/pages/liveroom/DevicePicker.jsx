import { useState, useRef, useEffect } from 'react'

function DevicePicker({ kind, icon, label, devices, selectedId, onSelect }) {
	const [open, setOpen] = useState(false)
	const wrapRef = useRef(null)

	// Close on outside click
	useEffect(() => {
		if (!open) return
		const handler = (e) => {
			if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
		}
		document.addEventListener('pointerdown', handler)
		return () => document.removeEventListener('pointerdown', handler)
	}, [open])

	// Close on Escape
	useEffect(() => {
		if (!open) return
		const handler = (e) => { if (e.key === 'Escape') setOpen(false) }
		document.addEventListener('keydown', handler)
		return () => document.removeEventListener('keydown', handler)
	}, [open])

	const activeLabel = devices.find((d) => d.deviceId === selectedId)?.label || label
	const hasDevices = devices.length > 0

	return (
		<div className={`liveroom-pill${open ? ' liveroom-pill--open' : ''}`} ref={wrapRef}>
			<div
				className={`liveroom-pill__trigger${!hasDevices ? ' is-disabled' : ''}`}
				onClick={() => hasDevices && setOpen((v) => !v)}
				aria-expanded={open}
				aria-haspopup="listbox"
				role="button"
				tabIndex={hasDevices ? 0 : -1}
			>
				{icon}
				<span className="liveroom-pill__label">{activeLabel}</span>
				<svg className={`liveroom-pill__arrow${open ? ' liveroom-pill__arrow--flip' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none">
					<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>

			{open && hasDevices && (
				<ul className="liveroom-pill__dropdown" role="listbox">
					{devices.map((d) => (
						<li key={d.deviceId} role="option" aria-selected={d.deviceId === selectedId}>
							<button
								type="button"
								className={`liveroom-pill__option${d.deviceId === selectedId ? ' liveroom-pill__option--active' : ''}`}
								onClick={() => {
									onSelect(kind, d.deviceId)
									setOpen(false)
								}}
							>
								<span className="liveroom-pill__option-label">{d.label}</span>
								{d.deviceId === selectedId && (
									<svg className="liveroom-pill__check" width="14" height="14" viewBox="0 0 24 24" fill="none">
										<path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								)}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default DevicePicker
