import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../components/ThemeProvider/ThemeContext';
import useTheme from '../hooks/useTheme';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <span>Current theme: {theme}</span>
      <button onClick={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('provides the default theme and allows toggling', () => {
    localStorage.removeItem('theme');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
    const button = screen.getByText('Toggle Theme');
    fireEvent.click(button);
    localStorage.setItem('theme', 'dark');
    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
  });

  it('respects the theme stored in localStorage', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText('Current theme: dark')).toBeInTheDocument();
    const button = screen.getByText('Toggle Theme');
    fireEvent.click(button);
    localStorage.setItem('theme', 'light');
    expect(screen.getByText('Current theme: light')).toBeInTheDocument();
  });
});
