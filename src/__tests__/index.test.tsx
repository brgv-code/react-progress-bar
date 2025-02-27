import React from 'react';
import { render, screen } from '@testing-library/react';
import ReadingProgressBarDefault, { ReadingProgressBar, ReadingProgressBarProps } from '../index';

describe('Index exports', () => {
  it('exports the ReadingProgressBar component as default and named export', () => {
    expect(ReadingProgressBarDefault).toBeDefined();
    expect(typeof ReadingProgressBarDefault).toBe('function');

    expect(ReadingProgressBar).toBeDefined();
    expect(typeof ReadingProgressBar).toBe('function');

    expect(ReadingProgressBarDefault).toBe(ReadingProgressBar);
  });

  it('renders the component from default export', () => {
    render(<ReadingProgressBarDefault />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar).toBeInTheDocument();
  });

  it('renders the component from named export', () => {
    render(<ReadingProgressBar />);
    const progressBar = screen.getByRole('progressbar', {
      name: /reading progress/i,
    });
    expect(progressBar).toBeInTheDocument();
  });

  it('exports the ReadingProgressBarProps type', () => {
    const props: ReadingProgressBarProps = {
      color: '#FF0000',
      height: 5,
      className: 'test',
      useGradient: true,
      useGlow: false,
      position: 'top',
    };

    expect(props).toBeDefined();
    expect(props.color).toBe('#FF0000');
  });
});
