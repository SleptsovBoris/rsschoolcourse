import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter } from '../../types';

export interface SelectedCharactersState {
  selectedCharacters: ICharacter[];
}

const initialState: SelectedCharactersState = {
  selectedCharacters: [],
};

const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState: initialState,
  reducers: {
    selectCharacter: (state, action: PayloadAction<ICharacter>) => {
      state.selectedCharacters.push(action.payload);
    },
    unselectCharacter: (state, action: PayloadAction<number>) => {
      state.selectedCharacters = state.selectedCharacters.filter(
        (character) => character.id !== action.payload,
      );
    },
    unselectAllCharacters: (state) => {
      state.selectedCharacters = [];
    },
  },
});

const { actions, reducer } = selectedCharactersSlice;
export const { selectCharacter, unselectCharacter, unselectAllCharacters } =
  actions;
export default reducer;
