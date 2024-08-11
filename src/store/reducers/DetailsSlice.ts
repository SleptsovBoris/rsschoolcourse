import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICharacter } from '../../types/types';

export interface CharacterDetailsState {
  currentDetails: ICharacter | null;
  isLoading: boolean;
}

const initialState: CharacterDetailsState = {
  currentDetails: null,
  isLoading: false,
};

export const characterDetailsSlice = createSlice({
  name: 'details',
  initialState: initialState,
  reducers: {
    setCurrentDetails: (state, action: PayloadAction<ICharacter | null>) => {
      state.currentDetails = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurrentDetails, setIsLoading } =
  characterDetailsSlice.actions;
export default characterDetailsSlice.reducer;
