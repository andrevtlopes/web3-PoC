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

function* loginCheckFlow() {
    let token;
    try {
        token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            const { publicAddress, id } = yield call(authService.getCurrentUser);
            yield put(setUserAction({ token, publicAddress, id }));
            yield put(loginSuccessAction());
        }
        else {
            yield put(loginFailureAction('User not authenticated'));
        }
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
        const login = yield take([actionIds.LOGIN_CHECK, actionIds.LOGIN_REQUEST]);
        let task;

        if (login.type === actionIds.LOGIN_CHECK) {
            task = yield fork(loginCheckFlow);
        }
        else {
            task = yield fork(loginFlow, login.publicAddress, login.signer);
        }

        const action = yield take([
            actionIds.LOGIN_FAILURE,
            actionIds.USER_UNSET,
            actionIds.LOGOUT_REQUEST
        ]);

        if (action.type === actionIds.USER_UNSET) {
            yield cancel(task);
        }

        yield call(logout);

        // const { publicAddress, signer } = yield take(actionIds.LOGIN_REQUEST);
        // const task = yield fork(loginFlow, publicAddress, signer);

        // const actions = yield take([
        //     actionIds.LOGIN_FAILURE,
        //     actionIds.USER_UNSET,
        //     actionIds.LOGOUT_REQUEST
        // ]);

        // if (actions.type === actionIds.USER_UNSET) {
        //     yield cancel(task);
        // }

        // yield call(logout);
    }
}

export default loginWatcher;
