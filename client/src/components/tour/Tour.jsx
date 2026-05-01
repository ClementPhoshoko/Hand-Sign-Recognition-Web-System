import React from 'react'
import { Joyride } from 'react-joyride'
import './Tour.css'

function Tour({ steps, isOpen, onClose, continuous = true, showSkipButton = true, showProgress = true }) {
	return (
		<Joyride
			steps={steps}
			run={isOpen}
			continuous={continuous}
			showSkipButton={showSkipButton}
			showProgress={showProgress}
			disableScrolling={false}
			scrollToFirstStep={true}
			styles={{
				options: {
					zIndex: 9999,
				},
			}}
			callback={(data) => {
				const { status, type } = data
				if (status === 'finished' || status === 'skipped' || type === 'tour:end') {
					onClose()
				}
			}}
		/>
	)
}

export default Tour
