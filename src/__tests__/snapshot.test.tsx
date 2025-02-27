import React from 'react';
import { render } from '@testing-library/react';
import ReadingProgressBar from '../ReadingProgressBar';

Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
Object.defineProperty(document.body, 'scrollHeight', {
  value: 1000,
  writable: true,
});
Object.defineProperty(window, 'innerHeight', { value: 500, writable: true });

describe('ReadingProgressBar Snapshots', () => {
  it('matches snapshot with default props', () => {
    const { container } = render(<ReadingProgressBar />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with custom styling', () => {
    const { container } = render(
      <ReadingProgressBar
        color="#FF5500"
        height={8}
        useGradient={true}
        useGlow={true}
        position="bottom" 
        zIndex={100}
        initiallyVisible={true}
        className="custom-progress"
        style={{ borderRadius: '4px' }}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with gradient disabled', () => {
    const { container } = render(
      <ReadingProgressBar color="#3498db" useGradient={false} useGlow={true} />
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with glow disabled', () => {
    const { container } = render(
      <ReadingProgressBar color="#e74c3c" useGradient={true} useGlow={false} />
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with custom gradient colors', () => {
    const { container } = render(
      <ReadingProgressBar useGradient={true} gradientColors={['#3498db', '#2ecc71', '#f1c40f']} />
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with all effects disabled', () => {
    const { container } = render(
      <ReadingProgressBar color="#9b59b6" useGradient={false} useGlow={false} />
    );
    expect(container).toMatchSnapshot();
  });
});
