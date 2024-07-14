import { render, screen, fireEvent } from '@testing-library/react';
import { expect, it, describe, beforeEach } from 'vitest';
import Search from './Search';

function mockLocalStorage() {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
}

describe('Search Component', () => {
  const localStorageMock = mockLocalStorage();
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
    localStorageMock.clear();
  });

  it('should save the entered value to local storage when clicking the Search button', () => {
    const searchTerm = 'Rick Sanchez';
    const handleSearch = (term: string) => {
      localStorage.setItem('searchTerm', term);
    };

    render(<Search onSearch={handleSearch} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: searchTerm },
    });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(localStorage.getItem('searchTerm')).toBe(searchTerm);
  });

  it('should retrieve the value from local storage upon mounting', () => {
    const searchTerm = 'Morty Smith';
    localStorage.setItem('searchTerm', searchTerm);

    render(<Search onSearch={() => {}} />);

    expect(screen.getByRole('textbox')).toHaveValue(searchTerm);
  });
});
