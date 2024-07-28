import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import SearchResults from './SearchResults';
import { ICharacter } from '../../types';
import charactersReducer, {
  setCharacters,
} from '../../store/reducers/CharactersSlice';
import selectedCharactersReducer from '../../store/reducers/SelectedCharactersSlice';

const sampleResults: ICharacter[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    created: '2021-01-01',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    created: '2021-01-01',
  },
];

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    selectedCharacters: selectedCharactersReducer,
  },
});

describe('SearchResults Component', () => {
  beforeEach(() => {
    store.dispatch(
      setCharacters({
        characters: sampleResults,
        currentPage: 1,
        totalPages: 1,
      }),
    );
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>
      </Provider>,
    );
  };

  it('should render the specified number of cards', async () => {
    renderComponent();
    await waitFor(() => {
      const cards = screen.getAllByTestId('resultCardTitle');
      expect(cards).toHaveLength(sampleResults.length);
    });
  });

  it('should display an appropriate message if no cards are present', () => {
    store.dispatch(
      setCharacters({ characters: [], currentPage: 1, totalPages: 1 }),
    );
    renderComponent();
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('should render the relevant card data', () => {
    renderComponent();
    sampleResults.forEach((result) => {
      expect(screen.getByText(result.name)).toBeInTheDocument();
    });
  });

  it('should toggle character selection on checkbox change', () => {
    renderComponent();
    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);

    expect(store.getState().selectedCharacters.selectedCharacters).toEqual([
      sampleResults[0],
    ]);

    fireEvent.click(firstCheckbox);

    expect(store.getState().selectedCharacters.selectedCharacters).toEqual([]);
  });
});
