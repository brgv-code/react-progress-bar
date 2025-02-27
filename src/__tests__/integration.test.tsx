import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ReadingProgressBar from '../ReadingProgressBar';

Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
Object.defineProperty(document.body, 'scrollHeight', {
  value: 2000,
  writable: true,
});
Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });

const simulateScroll = (scrollPosition: number) => {
  window.scrollY = scrollPosition;
  fireEvent.scroll(window);
};

const TestApp = ({ progressBarProps = {} }) => {
  return (
    <div>
      <ReadingProgressBar {...progressBarProps} />
      <div style={{ height: '2000px' }}>
        <h1>Test Content</h1>
        <p>This is a test page with scrollable content</p>
      </div>
    </div>
  );
};

describe('ReadingProgressBar Integration', () => {
  beforeEach(() => {
    window.scrollY = 0;
    fireEvent.scroll(window);
  });

  it('integrates with a React application', () => {
    render(<TestApp />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar).toBeInTheDocument();
  });

  it('updates progress as user scrolls through content', () => {
    render(<TestApp />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });

    expect(progressBar).toHaveAttribute('value', '0');

    act(() => {
      simulateScroll(250);
    });
    expect(progressBar).toHaveAttribute('value', '0.25');

    act(() => {
      simulateScroll(500);
    });
    expect(progressBar).toHaveAttribute('value', '0.5');

    act(() => {
      simulateScroll(750);
    });
    expect(progressBar).toHaveAttribute('value', '0.75');

    act(() => {
      simulateScroll(1000);
    });
    expect(progressBar).toHaveAttribute('value', '1');
  });

  it('shows/hides based on scroll position with custom threshold', () => {
    render(<TestApp progressBarProps={{ showAfterScroll: 200 }} />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });

    expect(progressBar).toHaveClass('hidden');

    act(() => {
      simulateScroll(199);
    });
    expect(progressBar).toHaveClass('hidden');

    act(() => {
      simulateScroll(201);
    });
    expect(progressBar).toHaveClass('visible');

    act(() => {
      simulateScroll(0);
    });
    expect(progressBar).toHaveClass('hidden');
  });

  it('works with different positions in the layout', () => {
    const { rerender } = render(<TestApp progressBarProps={{ position: 'top' }} />);
    let progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar.style.top).toBe('0px');
    expect(progressBar.style.bottom).toBe('');

    rerender(<TestApp progressBarProps={{ position: 'bottom' }} />);
    progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar.style.top).toBe('');
    expect(progressBar.style.bottom).toBe('0px');
  });

  it('applies custom styling in the context of a full application', () => {
    render(
      <TestApp
        progressBarProps={{
          color: '#FF5500',
          height: 8,
          useGradient: true,
          useGlow: true,
          zIndex: 100,
          className: 'custom-progress',
          style: { borderRadius: '4px' },
        }}
      />
    );

    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });

    expect(progressBar).toHaveClass('custom-progress');
    expect(progressBar).toHaveStyle('height: 8px');
    expect(progressBar).toHaveStyle('z-index: 100');
    expect(progressBar).toHaveStyle('border-radius: 4px');
    expect(progressBar.style.getPropertyValue('--progress-color')).toBe('#FF5500');
  });
});
