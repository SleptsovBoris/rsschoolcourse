import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import countryReducer from './countrySlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    data: dataReducer,
    countries: countryReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
