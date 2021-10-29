import { BaseAction, actionIds } from '../common';

export type UserState = {
    id: string;
    publicAddress: string;
    token: string;
};

const initialState: UserState = {
    id: null,
    publicAddress: null,
    token: null,
};

const userReducer = (state = initialState, action: BaseAction) => {
    switch (action.type) {
        case actionIds.USER_SET:
            return {
                ...state,
                id: action.payload.id,
                publicAddress: action.payload.publicAddress,
                token: action.payload.token,
            };
        case actionIds.USER_UNSET:
            return {
                ...state,
                id: null,
                publicAddress: null,
                token: null,
            };
        default:
            return {
                ...state,
            };
    }
};

export default userReducer;