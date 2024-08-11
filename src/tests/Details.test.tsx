import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Details from '../components/Details/Details';
import { ICharacter } from '../types/types';
import characterDetailsReducer, {
  setCurrentDetails,
  setIsLoading,
} from '../store/reducers/DetailsSlice';
import { characterAPI } from '../services/CharacterService';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import createMockRouter from '../utils/mockRouter';

const mockCharacter: ICharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  created: '2017-11-04T18:48:46.250Z',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

const store = configureStore({
  reducer: {
    characterDetails: characterDetailsReducer,
    [characterAPI.reducerPath]: characterAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterAPI.middleware),
});

describe('Details Component', () => {
  beforeEach(() => {
    store.dispatch(setIsLoading(false));
    store.dispatch(setCurrentDetails(null));
  });

  it('should display a loading indicator while fetching data', async () => {
    store.dispatch(setIsLoading(true));

    render(
      <Provider store={store}>
        <RouterContext.Provider
          value={createMockRouter({ query: { id: '1' } })}
        >
          <Details />
        </RouterContext.Provider>
      </Provider>,
    );

    expect(screen.getByTestId('Loader')).toBeInTheDocument();
  });

  it('should correctly display the detailed card data', async () => {
    store.dispatch(setIsLoading(false));
    store.dispatch(setCurrentDetails(mockCharacter));

    render(
      <Provider store={store}>
        <RouterContext.Provider
          value={createMockRouter({ query: { id: '1' } })}
        >
          <Details />
        </RouterContext.Provider>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
      expect(screen.getByText(/Status:/i)).toHaveTextContent(
        `Status: ${mockCharacter.status}`,
      );
      expect(screen.getByText(/Species:/i)).toHaveTextContent(
        `Species: ${mockCharacter.species}`,
      );
      expect(screen.getByText(/Gender:/i)).toHaveTextContent(
        `Gender: ${mockCharacter.gender}`,
      );
      expect(screen.getByAltText(mockCharacter.name)).toBeInTheDocument();
    });
  });
});
