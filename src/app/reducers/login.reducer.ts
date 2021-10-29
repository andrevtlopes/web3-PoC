import { BaseAction, actionIds } from '../common';

export type LoginState = {
    requesting: boolean;
    error: string;
};

const initialState: LoginState = {
    requesting: false,
    error: null,
};

const loginReducer = (state = initialState, action: BaseAction) => {
    switch (action.type) {
        case actionIds.LOGIN_REQUEST:
            return {
                ...state,
                requesting: true,
            };
        case actionIds.LOGIN_SUCCESS:
            return {
                ...state,
                requesting: false,
                error: null,
            };
        case actionIds.LOGIN_FAILURE:
            return {
                ...state,
                requesting: false,
                error: action.payload.error,
            };
        default:
            return {
                ...state,
            };
    }
};

export default loginReducer;
