export const actionIds = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_CHECK: 'LOGIN_CHECK',

    LOGOUT_REQUEST: 'LOGOUT_REQUEST',

    USER_SET: 'USER_SET',
    USER_UNSET: 'USER_UNSET',

    TOKEN_FETCH: 'TOKEN_FETCH',
    TOKEN_UPDATE: 'TOKEN_UPDATE',
};

export interface BaseAction {
    type: string;
    payload?;
}

export interface UserAction {
    type: string;
    publicAddress: string;
    signer: any;
    tokenBalance: number;
}

export interface TokenAction {
    type: string;
    balance: Number;
}