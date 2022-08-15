import { createSlice } from '@reduxjs/toolkit';

export interface IContact {
  id: number;
  name: string;
  phoneNumber: string;
  favourite: boolean;
  photograph: string;
}


const defaultValue: IContact = {
  id: 0,
  name: '',
  phoneNumber: '',
  favourite: false,
  photograph: '',

};

export const contactSlice = createSlice({
  name: 'contactInfo',
  initialState: defaultValue,
  reducers: {
    load: (state, action) => {
        state.id = action.payload.id;
      state.name = action.payload.name;
      state.phoneNumber = action.payload.phoneNumber;
      state.favourite = action.payload.favourite;
      state.photograph = action.payload.photograph;
    },
    reset: (state: IContact) => {
      state.id= 0;
      state.name= '';
      state.phoneNumber= '';
      state.favourite= false;
      state.photograph= '';
    },
  },
});

export const { load, reset } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;
