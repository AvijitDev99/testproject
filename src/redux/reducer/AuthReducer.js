import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  loginRes: {},
  signupRes: {},
  error: '',
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    /* Login */
    loginRequest(state, action) {
      state.status = action.type;
    },
    loginSuccess(state, action) {
      state.loginRes = action.payload.data;
      state.status = action.type;
    },
    loginFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    /* Sign Up */
    signupRequest(state, action) {
      state.status = action.type;
    },
    signupSuccess(state, action) {
      state.signupRes = action.payload?.data;
      state.status = action.type;
    },
    signupFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  /* Login */
  loginRequest,
  loginSuccess,
  loginFailure,

  /* Sign Up */
  signupFailure,
  signupSuccess,
  signupRequest,
} = AuthSlice.actions;

export default AuthSlice.reducer;
