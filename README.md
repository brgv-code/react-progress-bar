# React Reading Progress Bar

A customizable reading progress indicator for React applications that shows how
far the user has scrolled down the page.

![React Reading Progress Bar](https://via.placeholder.com/800x100.png?text=React+Reading+Progress+Bar)

## Features

- Shows a horizontal progress bar that fills as the user scrolls down the page
- Supports custom colors, gradients, and glow effects
- Can be positioned at the top or bottom of the viewport
- Appears/disappears based on scroll position
- Fully customizable with various props
- Lightweight with no dependencies

## Installation

```bash
npm install react-reading-progress-bar
# or
yarn add react-reading-progress-bar
```

## Usage

```jsx
import { ReadingProgressBar } from 'react-reading-progress-bar'

// Basic usage
function MyComponent() {
	return (
		<div>
			<ReadingProgressBar />
			{/* Your content */}
		</div>
	)
}

// Custom styling
function MyCustomComponent() {
	return (
		<div>
			<ReadingProgressBar
				color='#FF5500'
				height={5}
				useGradient={true}
				useGlow={true}
				position='top'
				zIndex={50}
			/>
			{/* Your content */}
		</div>
	)
}
```

## Props

| Prop               | Type              | Default                       | Description                                                         |
| ------------------ | ----------------- | ----------------------------- | ------------------------------------------------------------------- |
| `color`            | string            | '#FFDD00'                     | Base color for the progress bar                                     |
| `height`           | number            | 3                             | Height of the progress bar in pixels                                |
| `className`        | string            | ''                            | Additional CSS classes                                              |
| `useGradient`      | boolean           | true                          | Whether to use a gradient effect                                    |
| `useGlow`          | boolean           | true                          | Whether to use a glow effect                                        |
| `gradientColors`   | string[]          | [color, '#FFA500', '#FF8C00'] | Custom gradient colors                                              |
| `glowIntensity`    | number            | 0.7                           | Intensity of the glow effect (0-1)                                  |
| `showAfterScroll`  | number            | 100                           | Minimum scroll position (in pixels) before showing the progress bar |
| `position`         | 'top' \| 'bottom' | 'top'                         | Position of the progress bar                                        |
| `zIndex`           | number            | 40                            | Z-index of the progress bar                                         |
| `initiallyVisible` | boolean           | false                         | Whether to show the progress bar initially                          |
| `style`            | CSSProperties     | {}                            | Custom styles to apply to the progress bar                          |

## Examples

### Custom Gradient

```jsx
<ReadingProgressBar
	useGradient={true}
	gradientColors={['#3498db', '#2ecc71', '#f1c40f']}
	height={4}
/>
```

### Bottom Positioned

```jsx
<ReadingProgressBar position='bottom' color='#9b59b6' height={3} />
```

### No Effects

```jsx
<ReadingProgressBar useGradient={false} useGlow={false} color='#e74c3c' />
```

### Integration with Navbar

```jsx
// Inside your Navbar component
{
	shouldShowProgressBar && (
		<ReadingProgressBar height={4} color='#FFDD00' style={{ top: '56px' }} />
	)
}
```

## Customizing CSS

The component uses CSS variables that can be overridden in your global CSS:

```css
.reading-progress {
	--progress-color: #ffdd00;
	--progress-gradient: linear-gradient(90deg, #ffdd00, #ffa500, #ff8c00);
	--progress-glow: 0 0 10px rgba(255, 221, 0, 0.7);
}
```

## License

MIT
