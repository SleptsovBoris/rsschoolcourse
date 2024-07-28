import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import { characterAPI } from '../services/CharacterService';
import { ApiResponse, ICharacter } from '../types';

const mockCharacters: ApiResponse = {
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [
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
  ],
};

const mockCharacter: ICharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  image: 'https://example.com/rick.png',
  created: '2021-01-01',
};

globalThis.fetch = vi.fn((input) => {
  const url = typeof input === 'string' ? input : input.url;

  if (url.includes('character?')) {
    return Promise.resolve(
      new Response(JSON.stringify(mockCharacters), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  }

  if (url.includes('character/')) {
    return Promise.resolve(
      new Response(JSON.stringify(mockCharacter), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  }

  return Promise.reject(new Error('Not Found'));
}) as unknown as typeof fetch;

const store = configureStore({
  reducer: {
    [characterAPI.reducerPath]: characterAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterAPI.middleware),
});

describe('characterAPI', () => {
  it('fetches characters based on search query', async () => {
    const { result } = renderHook(
      () =>
        characterAPI.endpoints.searchCharacters.useQuery({
          name: 'Rick',
          page: 1,
        }),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual(mockCharacters);
  });

  it('fetches character details based on ID', async () => {
    const { result } = renderHook(
      () => characterAPI.endpoints.fetchCharacterDetails.useQuery({ id: '1' }),
      {
        wrapper: ({ children }) => (
          <Provider store={store}>{children}</Provider>
        ),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy();
    });

    expect(result.current.data).toEqual(mockCharacter);
  });
});
