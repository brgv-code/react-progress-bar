# Migration Guide

This guide helps you migrate from the original implementation to the standalone
`react-reading-progress-bar` package.

## Original Implementation

If you were using the ReadingProgressBar component directly in your project, you
might have had code like this:

```jsx
// In your Navbar.tsx or other component
import ReadingProgressBar from '@/components/ui/ReadingProgressBar'

// Usage in your component
{
	isBlogOrProjectDetail && (
		<ReadingProgressBar
			className='w-full'
			height={4}
			color='#FFDD00'
			useGradient={true}
			useGlow={true}
			showAfterScroll={100}
			style={{ top: '56px' }}
		/>
	)
}
```

## Migrating to the Package

### 1. Install the package

```bash
npm install react-reading-progress-bar
# or
yarn add react-reading-progress-bar
```

### 2. Update your imports

```jsx
// Change this:
import ReadingProgressBar from '@/components/ui/ReadingProgressBar'

// To this:
import { ReadingProgressBar } from 'react-reading-progress-bar'
```

### 3. Update your CSS (if needed)

If you had custom CSS for the ReadingProgressBar in your global CSS file, you
can remove it as the package includes its own styles.

### 4. Update your usage (if needed)

The API is fully compatible with the original implementation, so you shouldn't
need to change your component usage. All props work the same way.

## New Features in the Package

The standalone package includes some additional features:

1. **TypeScript Support**: Full TypeScript definitions for better development
   experience.
2. **Custom Gradient Colors**: You can now specify an array of colors for the
   gradient.
3. **Glow Intensity Control**: You can adjust the intensity of the glow effect.
4. **Bottom Positioning**: You can position the bar at the bottom of the
   viewport.
5. **Initial Visibility**: You can control whether the bar is initially visible.

## Example with New Features

```jsx
import { ReadingProgressBar } from 'react-reading-progress-bar'

;<ReadingProgressBar
	color='#3498db'
	height={5}
	useGradient={true}
	gradientColors={['#3498db', '#2ecc71', '#f1c40f']}
	useGlow={true}
	glowIntensity={0.8}
	position='bottom'
	zIndex={100}
	initiallyVisible={true}
/>
```
