import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { characterAPI } from '../services/CharacterService';
import { setCharacters } from '../store/reducers/CharactersSlice';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import createMockRouter from '../utils/mockRouter';
import MainPage from '../components/Main/Main';
import selectedCharactersReducer from '../store/reducers/SelectedCharactersSlice';
import { beforeEach, describe, expect, it } from 'vitest';
import { ThemeProvider } from '../components/ThemeProvider/ThemeContext';
import { ICharacter } from '../types/types';
import CharactersSlice from '../store/reducers/CharactersSlice';

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
    [characterAPI.reducerPath]: characterAPI.reducer,
    characters: CharactersSlice,
    selectedCharacters: selectedCharactersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterAPI.middleware),
});

const renderWithProviders = (ui: React.ReactElement, { router = {} } = {}) => {
  return render(
    <Provider store={store}>
      <RouterContext.Provider value={createMockRouter(router)}>
        <ThemeProvider>{ui}</ThemeProvider>
      </RouterContext.Provider>
    </Provider>,
  );
};

describe('MainPage', () => {
  beforeEach(() => {
    store.dispatch(
      setCharacters({
        characters: sampleResults,
        currentPage: 1,
        totalPages: 1,
      }),
    );
  });

  it('renders search results', async () => {
    renderWithProviders(<MainPage>Details Content</MainPage>, {
      router: { query: {} },
    });

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });

  it('renders children in details area when detailsId is present in query', async () => {
    renderWithProviders(<MainPage>Details Content</MainPage>, {
      router: { query: { details: '1' } },
    });

    expect(screen.getByText('Details Content')).toBeInTheDocument();
  });
});
