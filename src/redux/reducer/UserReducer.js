import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  userInfo: {},
  error: ''
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    /* User Informaition */
    getUserInfoRequest(state, action) {
      state.status = action.type;
    },
    getUserInfoSuccess(state, action) {
      state.userInfo = action.payload;
      state.status = action.type;
    },
    getUserInfoFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  /* User Informaition */
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
} = UserSlice.actions;

export default UserSlice.reducer;
