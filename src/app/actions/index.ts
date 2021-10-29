import { BaseAction, actionIds } from '../common';

export const loginRequestAction = (payload: any): any => ({
    type: actionIds.LOGIN_REQUEST,
    publicAddress: payload.publicAddress,
    signer: payload.signer,
});

export const loginSuccessAction = (): BaseAction => ({
    type: actionIds.LOGIN_SUCCESS,
});

export const loginFailureAction = (payload: any): BaseAction => ({
    type: actionIds.LOGIN_FAILURE,
    payload: payload,
});

export const setUserAction = (payload: any): BaseAction => ({
  type: actionIds.USER_SET,
  payload: payload,
});

export const unsetUserAction = (): BaseAction => ({
  type: actionIds.USER_UNSET,
});
