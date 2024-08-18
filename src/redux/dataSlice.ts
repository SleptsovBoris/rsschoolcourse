import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IFormData from '../types';

interface DataState {
  customFormData: IFormData[];
  hookFormData: IFormData[];
}

const initialState: DataState = {
  customFormData: [],
  hookFormData: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    addData: (
      state,
      action: PayloadAction<{ data: IFormData; formType: string }>,
    ) => {
      const { data, formType } = action.payload;
      if (formType === 'customForm') {
        state.customFormData.push(data);
      } else if (formType === 'hookForm') {
        state.hookFormData.push(data);
      }
    },
  },
});

export const { addData } = dataSlice.actions;
export default dataSlice.reducer;
