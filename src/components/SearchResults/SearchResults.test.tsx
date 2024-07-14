import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchResults from './SearchResults';
import { SearchResult } from '../../types';

const sampleResults: SearchResult[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://example.com/rick.png',
    created: '2021-01-01',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://example.com/morty.png',
    created: '2021-01-01',
  },
];

describe('SearchResults Component', () => {
  const mockOnItemClick = vi.fn().mockResolvedValue({});

  it('should render the specified number of cards', () => {
    render(
      <SearchResults results={sampleResults} onItemClick={mockOnItemClick} />,
    );
    const cards = screen.getAllByTestId('resultCardTitle');
    expect(cards).toHaveLength(sampleResults.length);
  });

  it('should display an appropriate message if no cards are present', () => {
    render(<SearchResults results={[]} onItemClick={mockOnItemClick} />);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('should render the relevant card data', () => {
    render(
      <SearchResults results={sampleResults} onItemClick={mockOnItemClick} />,
    );

    sampleResults.forEach((result) => {
      expect(screen.getByText(result.name)).toBeInTheDocument();
    });
  });

  it('should trigger onItemClick and fetch detailed information when a resultCard is clicked', async () => {
    render(
      <SearchResults results={sampleResults} onItemClick={mockOnItemClick} />,
    );
    const firstCard = screen.getByText(sampleResults[0].name);
    fireEvent.click(firstCard);
    expect(mockOnItemClick).toHaveBeenCalledWith(sampleResults[0].id);
    await waitFor(() => {
      expect(mockOnItemClick).toHaveBeenCalledTimes(1);
    });
  });
});
