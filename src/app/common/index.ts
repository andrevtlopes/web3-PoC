export const actionIds = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',

    USER_SET: 'USER_SET',
    USER_UNSET: 'USER_UNSET',
};

export interface BaseAction {
    type: string;
    payload?;
}
