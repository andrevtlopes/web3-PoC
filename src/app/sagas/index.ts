import { all, fork } from 'redux-saga/effects';
import LoginSagas from './login.sagas';

export function* rootSaga() {
    yield all([fork(LoginSagas)]);
}
