import { call, put, take, fork, cancel, cancelled } from 'redux-saga/effects';
import authService from '../../../services/auth.service';
import {
    loginFailureAction,
    loginSuccessAction,
    setUserAction,
    unsetUserAction,
} from '../actions';
import { actionIds } from '../common';

function* loginFlow(publicAddress, signer) {
    let token;
    try {
        token = yield call(authService.login, publicAddress, signer);
        yield put(setUserAction({ token, publicAddress }));
        yield put(loginSuccessAction());
        localStorage.setItem('token', JSON.stringify(token));
        // browserHistory.push('/');
    } catch (error) {
        yield put(loginFailureAction(error));
    } finally {
        if (yield cancelled()) {
            // browserHistory.push('/');
        }
    }
    return token;
}

function* logout() {
    yield put(unsetUserAction());
    localStorage.removeItem('token');
    // browserHistory.push('/');
}

function* loginWatcher() {
    while (true) {
        const { publicAddress, signer } = yield take(actionIds.LOGIN_REQUEST);
        const task = yield fork(loginFlow, publicAddress, signer);
        const action = yield take([
            actionIds.USER_UNSET,
            actionIds.LOGIN_FAILURE,
        ]);

        if (action.type === actionIds.USER_UNSET) {
            yield cancel(task);
        }

        yield call(logout);
    }
}

export default loginWatcher;
