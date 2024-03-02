import {call, put, select, takeLatest} from 'redux-saga/effects';
import _ from 'lodash';
import {
  /* Login */
  loginSuccess,
  loginFailure,

  /* SignUp */
  signupSuccess,
  signupFailure,
} from '../reducer/AuthReducer';
import {postApi} from '../../utils/ApiRequest';
import showErrorAlert from '../../utils/Toast';

let getItem = state => state.AuthReducer;

/* Login */
export function* loginSaga(action) {
 // 
}

/* SignUp */
export function* signupSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      postApi,
      'authaccount/registration',
      action.payload,
      header,
    );

    console.log('response -- ',response);

    if (response?.status == 200 && response?.data?.code == 0) {
      yield put(
        signupSuccess({
          data: response?.data?.data,
        }),
      );

      showErrorAlert(
        'Congratulations, your account has been successfully created.',
      );
    } else {
      yield put(signupFailure(response?.data?.data));
      showErrorAlert(response?.data?.message);
    }
  } catch (error) {
    yield put(signupFailure(error));
    console.log('error -- ', error);
    // showErrorAlert(error?.response?.data?.response.status.message);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Auth/loginRequest', loginSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/signupRequest', signupSaga);
  })(),
];

export default watchFunction;
