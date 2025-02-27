import React, { useEffect, useState, CSSProperties } from 'react'

export interface ReadingProgressBarProps {
	/**
	 * Base color for the progress bar
	 */
	color?: string
	/**
	 * Height of the progress bar in pixels
	 */
	height?: number
	/**
	 * Additional CSS classes
	 */
	className?: string
	/**
	 * Whether to use a gradient effect
	 */
	useGradient?: boolean
	/**
	 * Whether to use a glow effect
	 */
	useGlow?: boolean
	/**
	 * Custom gradient colors (requires useGradient=true)
	 * Format: Array of colors for the gradient
	 */
	gradientColors?: string[]
	/**
	 * Intensity of the glow effect (0-1)
	 */
	glowIntensity?: number
	/**
	 * Minimum scroll position (in pixels) before showing the progress bar
	 */
	showAfterScroll?: number
	/**
	 * Position of the progress bar
	 */
	position?: 'top' | 'bottom'
	/**
	 * Z-index of the progress bar
	 */
	zIndex?: number
	/**
	 * Whether to show the progress bar initially
	 */
	initiallyVisible?: boolean
	/**
	 * Custom styles to apply to the progress bar
	 */
	style?: CSSProperties
}

/**
 * A reading progress bar component that shows how far the user has scrolled down the page.
 *
 * @example
 * // Basic usage
 * <ReadingProgressBar />
 *
 * @example
 * // Custom styling
 * <ReadingProgressBar
 *   color="#FF5500"
 *   height={5}
 *   useGradient={true}
 *   useGlow={true}
 *   position="bottom"
 * />
 */
export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
	color = '#FFDD00',
	height = 3,
	className = '',
	useGradient = true,
	useGlow = true,
	gradientColors,
	glowIntensity = 0.7,
	showAfterScroll = 100,
	position = 'top',
	zIndex = 40,
	initiallyVisible = false,
	style = {},
}) => {
	const [readingProgress, setReadingProgress] = useState(0)
	const [isVisible, setIsVisible] = useState(initiallyVisible)

	useEffect(() => {
		const updateReadingProgress = () => {
			const currentPosition = window.scrollY
			const scrollHeight = document.body.scrollHeight - window.innerHeight

			// Show/hide based on scroll position
			setIsVisible(currentPosition > showAfterScroll)

			// Calculate reading progress
			if (scrollHeight) {
				setReadingProgress(Number((currentPosition / scrollHeight).toFixed(2)))
			}
		}

		// Update on mount
		updateReadingProgress()

		// Add scroll event listener
		window.addEventListener('scroll', updateReadingProgress)

		// Clean up
		return () => window.removeEventListener('scroll', updateReadingProgress)
	}, [showAfterScroll])

	// Default gradient colors if not provided
	const defaultGradientColors = [color, '#FFA500', '#FF8C00']
	const finalGradientColors = gradientColors || defaultGradientColors

	// Create the gradient string
	const gradientString = `linear-gradient(90deg, ${finalGradientColors.join(', ')})`

	// Calculate glow with proper opacity
	const hexOpacity = Math.floor(glowIntensity * 255)
		.toString(16)
		.padStart(2, '0')

	// Set custom CSS variables for the progress bar
	const customStyle = {
		'--progress-color': color,
		'--progress-gradient': useGradient ? gradientString : color,
		'--progress-glow': useGlow ? `0 0 10px ${color}${hexOpacity}` : 'none',
	} as React.CSSProperties

	return (
		<progress
			className={`reading-progress ${className} ${isVisible ? 'visible' : 'hidden'}`}
			value={readingProgress}
			max='1'
			style={{
				position: 'sticky',
				[position]: 0,
				zIndex,
				width: '100%',
				height: `${height}px`,
				border: 'none',
				appearance: 'none',
				backgroundColor: 'transparent',
				transition: 'opacity 300ms ease-in-out',
				...customStyle,
				...style,
			}}
			aria-label='Reading progress'
		/>
	)
}

export default ReadingProgressBar
