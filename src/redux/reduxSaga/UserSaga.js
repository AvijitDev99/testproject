import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  /* User Informaition */
  getUserInfoRequest,
  getUserInfoFailure,
  getUserInfoSuccess,
} from '../reducer/UserReducer';

let getItemAuth = state => state.AuthReducer;
let getItemUser = state => state.UserReducer;

/* User Informaition */
export function* getUserInfoSaga(action) {
  //
}

const watchFunction = [
  (function* () {
    yield takeLatest('User/getUserInfoRequest', getUserInfoSaga);
  })(),
];

export default watchFunction;
