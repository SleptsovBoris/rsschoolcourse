import { configureStore } from '@reduxjs/toolkit';
import { characterAPI } from '../services/CharacterService';
import selectedCharactersReducer from './reducers/SelectedCharactersSlice';
import characterDetailsReducer from './reducers/DetailsSlice';
import charactersReducer from './reducers/CharactersSlice';
import { createWrapper } from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    [characterAPI.reducerPath]: characterAPI.reducer,
    characters: charactersReducer,
    characterDetails: characterDetailsReducer,
    selectedCharacters: selectedCharactersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const makeStore = () => store;
export const wrapper = createWrapper(makeStore, { debug: true });
