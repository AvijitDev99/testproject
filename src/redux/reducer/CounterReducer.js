import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const UserSlice = createSlice({
  name: 'Count',
  initialState,
  reducers: {
    /* User Informaition */
    InNumber(state, action) {
      state.count = state.count + action.payload;
    },
    DeNumber(state, action) {
      state.count = state.count - action.payload;
    },
  },
});

export const {
  /* User Informaition */
  InNumber,
  DeNumber,
} = UserSlice.actions;

export default UserSlice.reducer;
