import React from 'react'
import { render, screen } from '@testing-library/react'
import ReadingProgressBar from './ReadingProgressBar'

// Mock window.scrollY and document.body.scrollHeight
Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
Object.defineProperty(document.body, 'scrollHeight', {
	value: 1000,
	writable: true,
})
Object.defineProperty(window, 'innerHeight', { value: 500, writable: true })

describe('ReadingProgressBar', () => {
	it('renders without crashing', () => {
		render(<ReadingProgressBar />)
		const progressBar = screen.getByRole('progressbar', {
			name: /reading progress/i,
		})
		expect(progressBar).toBeInTheDocument()
	})

	it('applies custom height', () => {
		render(<ReadingProgressBar height={10} />)
		const progressBar = screen.getByRole('progressbar', {
			name: /reading progress/i,
		})
		expect(progressBar).toHaveStyle('height: 10px')
	})

	it('applies custom color', () => {
		render(<ReadingProgressBar color='#FF0000' />)
		const progressBar = screen.getByRole('progressbar', {
			name: /reading progress/i,
		})
		expect(progressBar.style.getPropertyValue('--progress-color')).toBe(
			'#FF0000',
		)
	})

	it('is initially hidden when initiallyVisible is false', () => {
		render(<ReadingProgressBar initiallyVisible={false} />)
		const progressBar = screen.getByRole('progressbar', {
			name: /reading progress/i,
		})
		expect(progressBar).toHaveClass('hidden')
	})

	it('is initially visible when initiallyVisible is true', () => {
		render(<ReadingProgressBar initiallyVisible={true} />)
		const progressBar = screen.getByRole('progressbar', {
			name: /reading progress/i,
		})
		expect(progressBar).toHaveClass('visible')
	})

	it('applies custom position', () => {
		render(<ReadingProgressBar position='bottom' />)
		const progressBar = screen.getByRole('progressbar', {
			name: /reading progress/i,
		})
		expect(progressBar.style.bottom).toBe('0px')
	})

	it('applies custom z-index', () => {
		render(<ReadingProgressBar zIndex={100} />)
		const progressBar = screen.getByRole('progressbar', {
			name: /reading progress/i,
		})
		expect(progressBar).toHaveStyle('z-index: 100')
	})
})
