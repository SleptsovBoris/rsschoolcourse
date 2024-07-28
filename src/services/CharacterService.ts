import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, ICharacter } from '../types';

export const characterAPI = createApi({
  reducerPath: 'characterAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  endpoints: (build) => ({
    searchCharacters: build.query<ApiResponse, { name: string; page: number }>({
      query: ({ name, page }) => ({
        url: 'character',
        params: { name, page },
      }),
    }),
    fetchCharacterDetails: build.query<ICharacter, { id: string | undefined }>({
      query: ({ id }) => ({
        url: `character/${id}`,
      }),
    }),
  }),
});
