import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter } from '../../types/types';

export interface CharactersState {
  characters: ICharacter[];
  currentPage: number;
  totalPages: number;
}

const initialState: CharactersState = {
  characters: [],
  currentPage: 1,
  totalPages: 1,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (
      state,
      action: PayloadAction<{
        characters: ICharacter[];
        currentPage: number;
        totalPages: number;
      }>,
    ) => {
      state.characters = action.payload.characters;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { setCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
