import { BaseAction, actionIds, UserAction, TokenAction } from '../common';

export const loginRequestAction = (payload: any): UserAction => ({
    type: actionIds.LOGIN_REQUEST,
    publicAddress: payload.publicAddress,
    signer: payload.signer,
    tokenBalance: payload.payload,
});

export const loginSuccessAction = (): BaseAction => ({
    type: actionIds.LOGIN_SUCCESS,
});

export const loginFailureAction = (payload: any): BaseAction => ({
    type: actionIds.LOGIN_FAILURE,
    payload
});

export const loginCheckAction = (payload: any): BaseAction => ({
  type: actionIds.LOGIN_CHECK,
  payload
});

export const logoutRequestAction = (): BaseAction => ({
  type: actionIds.LOGOUT_REQUEST,
});

export const setUserAction = (payload: any): BaseAction => ({
  type: actionIds.USER_SET,
  payload
});

export const unsetUserAction = (): BaseAction => ({
  type: actionIds.USER_UNSET,
});

export const fetchBalanceAction = (): BaseAction => ({
  type: actionIds.TOKEN_FETCH,
})

export const updateTokenBalanceAction = (payload: any): BaseAction => ({
  type: actionIds.TOKEN_UPDATE,
  payload
})