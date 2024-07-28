import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('catches errors and displays an error message', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>,
    );
    expect(
      screen.getByText('Error, check console for more info'),
    ).toBeInTheDocument();
  });

  it('clears localStorage and reloads the page when Clear button is clicked', () => {
    localStorage.setItem('searchTerm', 'test');

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>,
    );

    fireEvent.click(screen.getByText('Retry Search'));

    expect(localStorage.getItem('searchTerm')).toBe('');
  });
});
