import { all, fork } from 'redux-saga/effects';
import LoginSagas from './login.sagas';
import TokenSagas from './token.sagas';

export function* rootSaga() {
    yield all([fork(LoginSagas), fork(TokenSagas)]);
}
