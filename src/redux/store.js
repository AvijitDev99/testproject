import {Tuple, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {logger} from 'redux-logger';
import RootSaga from './reduxSaga/RootSaga';
import AuthReducer from './reducer/AuthReducer';
import UserReducer from './reducer/UserReducer';
import CounterReducer from './reducer/CounterReducer';

let sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware, logger];

export default configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    UserReducer: UserReducer,
    CounterReducer: CounterReducer,
  },
  // middleware,
  middleware: () => new Tuple(sagaMiddleware, logger),
});

sagaMiddleware.run(RootSaga);


// configureStore({
//   reducer: rootReducer,
//   middleware: () => new Tuple(additionalMiddleware, logger),
// })