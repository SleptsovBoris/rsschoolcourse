import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import NotFoundPage from './404ErrorPage';

describe('NotFoundPage', () => {
  it('renders the 404 message', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('Sorry, the page you are looking for does not exist.'),
    ).toBeInTheDocument();
  });
});
