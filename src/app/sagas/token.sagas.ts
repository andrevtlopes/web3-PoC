import { call, put, take, fork, cancel, cancelled, takeEvery } from 'redux-saga/effects';
import tokenService from '../../../services/token.service';
import { updateTokenBalanceAction } from '../actions';
import { actionIds } from '../common';

export function* updateBalanceAsync() {
    try {
        const { data } = yield call(tokenService.getBalance);
        yield put(updateTokenBalanceAction({ tokenBalance: data }));
    } catch (error) {
        // yield put((error));
    } finally {
        if (yield cancelled()) {
            // browserHistory.push('/');
        }
    }
}

export function* watchFetchBalanceAsync() {
    yield takeEvery(actionIds.TOKEN_FETCH, updateBalanceAsync);
}

export default watchFetchBalanceAsync;
