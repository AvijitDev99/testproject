import {all} from 'redux-saga/effects';
import AuthSaga from './AuthSaga';
import UserSaga from './UserSaga';

const combinedSaga = [
  ...AuthSaga,
  ...UserSaga,
];

export default function* RootSaga() {
  yield all(combinedSaga);
}
