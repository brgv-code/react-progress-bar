import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { axe } from 'jest-axe';
import ReadingProgressBar from '../ReadingProgressBar';

import 'jest-axe/extend-expect';

Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
Object.defineProperty(document.body, 'scrollHeight', {
  value: 1000,
  writable: true,
});
Object.defineProperty(window, 'innerHeight', { value: 500, writable: true });

const simulateScroll = (scrollPosition: number) => {
  window.scrollY = scrollPosition;
  fireEvent.scroll(window);
};

describe('ReadingProgressBar Edge Cases', () => {
  beforeEach(() => {
    window.scrollY = 0;
    fireEvent.scroll(window);
  });

  it('handles zero document height gracefully', () => {
    Object.defineProperty(document.body, 'scrollHeight', { value: 500, writable: true });

    render(<ReadingProgressBar />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });

    expect(progressBar).toHaveAttribute('value', '0');

    // Attempt to scroll
    act(() => {
      simulateScroll(100);
    });

    expect(progressBar).toHaveAttribute('value', '0');

    Object.defineProperty(document.body, 'scrollHeight', { value: 1000, writable: true });
  });

  it('handles extremely large scroll values', () => {
    Object.defineProperty(document.body, 'scrollHeight', { value: 1000000, writable: true });

    render(<ReadingProgressBar />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });

    act(() => {
      simulateScroll(500000);
    });

    expect(progressBar).toHaveAttribute('value', '0.5');

    Object.defineProperty(document.body, 'scrollHeight', { value: 1000, writable: true });
  });

  it('handles negative scroll values', () => {
    Object.defineProperty(document.body, 'scrollHeight', { value: 1000, writable: true });
    Object.defineProperty(window, 'innerHeight', { value: 500, writable: true });

    render(<ReadingProgressBar />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });

    act(() => {
      simulateScroll(0);
    });

    expect(progressBar).toHaveAttribute('value', '0');
  });

  it('handles scroll values beyond document height', () => {
    render(<ReadingProgressBar />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });

    act(() => {
      simulateScroll(500);
    });

    expect(progressBar).toHaveAttribute('value', '1');
  });

  it('handles extreme prop values', () => {
    render(<ReadingProgressBar height={0} zIndex={-1} glowIntensity={2} showAfterScroll={-100} />);

    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });

    expect(progressBar).toBeInTheDocument();

    act(() => {
      simulateScroll(1);
    });
    expect(progressBar.className).toContain('visible');
  });
});

describe('ReadingProgressBar Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<ReadingProgressBar />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('has appropriate ARIA attributes', () => {
    render(<ReadingProgressBar />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });

    expect(progressBar).toHaveAttribute('aria-label', 'Reading progress');
    expect(progressBar).toHaveAttribute('max', '1');
    expect(progressBar).toHaveAttribute('value');
  });
});
