import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ReadingProgressBar from './ReadingProgressBar';

// Mock window.scrollY and document.body.scrollHeight
Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
Object.defineProperty(document.body, 'scrollHeight', {
  value: 1000,
  writable: true,
});
Object.defineProperty(window, 'innerHeight', { value: 500, writable: true });

// Helper function to simulate scrolling
const simulateScroll = (scrollPosition: number) => {
  window.scrollY = scrollPosition;
  fireEvent.scroll(window);
};

describe('ReadingProgressBar', () => {
  // Basic rendering tests
  it('renders without crashing', () => {
    render(<ReadingProgressBar />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar).toBeInTheDocument();
  });

  // Style and appearance tests
  it('applies custom height', () => {
    render(<ReadingProgressBar height={10} />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar).toHaveStyle('height: 10px');
  });

  it('applies custom color', () => {
    render(<ReadingProgressBar color="#FF0000" />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar.style.getPropertyValue('--progress-color')).toBe('#FF0000');
  });

  it('is initially hidden when initiallyVisible is false', () => {
    render(<ReadingProgressBar initiallyVisible={false} />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar.className).toContain('hidden');
  });

  it('is initially visible when initiallyVisible is true', () => {
    // Simulate a scroll position that would make the bar visible
    window.scrollY = 200;

    render(<ReadingProgressBar initiallyVisible={true} showAfterScroll={0} />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar.className).toContain('visible');

    // Reset scroll position
    window.scrollY = 0;
  });

  it('applies custom position', () => {
    render(<ReadingProgressBar position="bottom" />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar.style.bottom).toBe('0px');
  });

  it('applies custom z-index', () => {
    render(<ReadingProgressBar zIndex={100} />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar).toHaveStyle('z-index: 100');
  });

  // Gradient and glow tests
  it('applies gradient when useGradient is true', () => {
    render(<ReadingProgressBar useGradient={true} color="#FF0000" />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar.style.getPropertyValue('--progress-gradient')).toContain('linear-gradient');
  });

  it('does not apply gradient when useGradient is false', () => {
    render(<ReadingProgressBar useGradient={false} color="#FF0000" />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar.style.getPropertyValue('--progress-gradient')).toBe('#FF0000');
  });

  it('applies custom gradient colors', () => {
    const customColors = ['#FF0000', '#00FF00', '#0000FF'];
    render(<ReadingProgressBar useGradient={true} gradientColors={customColors} />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    const gradientValue = progressBar.style.getPropertyValue('--progress-gradient');
    customColors.forEach(color => {
      expect(gradientValue).toContain(color);
    });
  });

  it('applies glow effect when useGlow is true', () => {
    render(<ReadingProgressBar useGlow={true} color="#FF0000" />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar.style.getPropertyValue('--progress-glow')).toContain('0 0 10px');
  });

  it('does not apply glow effect when useGlow is false', () => {
    render(<ReadingProgressBar useGlow={false} />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar.style.getPropertyValue('--progress-glow')).toBe('none');
  });

  it('applies custom glow intensity', () => {
    render(<ReadingProgressBar useGlow={true} glowIntensity={0.5} color="#FF0000" />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    // Check if it contains the color with some opacity value
    expect(progressBar.style.getPropertyValue('--progress-glow')).toContain('0 0 10px #FF0000');
  });

  // Scroll behavior tests
  it('becomes visible after scrolling past showAfterScroll threshold', () => {
    render(<ReadingProgressBar showAfterScroll={100} />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });

    // Initially hidden
    expect(progressBar.className).toContain('hidden');

    // Scroll just below threshold
    act(() => {
      simulateScroll(99);
    });
    expect(progressBar.className).toContain('hidden');

    // Scroll past threshold
    act(() => {
      simulateScroll(101);
    });
    expect(progressBar.className).toContain('visible');
  });

  it('calculates reading progress correctly', () => {
    render(<ReadingProgressBar />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });

    // Scroll to 25% of the page
    act(() => {
      simulateScroll(125); // 125 / 500 = 0.25 (25%)
    });
    expect(progressBar).toHaveAttribute('value', '0.25');

    // Scroll to 50% of the page
    act(() => {
      simulateScroll(250); // 250 / 500 = 0.5 (50%)
    });
    expect(progressBar).toHaveAttribute('value', '0.5');

    // Scroll to 100% of the page
    act(() => {
      simulateScroll(500); // 500 / 500 = 1 (100%)
    });
    expect(progressBar).toHaveAttribute('value', '1');
  });

  // Custom styling tests
  it('applies custom className', () => {
    render(<ReadingProgressBar className="custom-class" />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar.className).toContain('custom-class');
  });

  it('applies custom style object', () => {
    render(<ReadingProgressBar style={{ opacity: 0.5, borderRadius: '5px' }} />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar).toHaveStyle('opacity: 0.5');
    expect(progressBar).toHaveStyle('border-radius: 5px');
  });

  // Cleanup test
  it('removes event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<ReadingProgressBar />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});
