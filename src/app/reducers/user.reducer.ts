import { BaseAction, actionIds } from '../common';

export type UserState = {
    id: string;
    publicAddress: string;
    token: string;
    signer: any;
    tokenBalance: number;
};

const initialState: UserState = {
    id: null,
    publicAddress: null,
    token: null,
    signer: null,
    tokenBalance: null,
};

const userReducer = (state = initialState, action: BaseAction) => {
    switch (action.type) {
        case actionIds.USER_SET:
            return {
                ...state,
                id: action.payload.id,
                publicAddress: action.payload.publicAddress,
                token: action.payload.token,
                signer: action.payload.signer,
                tokenBalance: action.payload.tokenBalance,
            };
        case actionIds.USER_UNSET:
            return {
                ...state,
                id: null,
                publicAddress: null,
                token: null,
                signer: null,
                tokenBalance: null,
            };
        case actionIds.TOKEN_UPDATE:
            return {
                ...state,
                // tokenBalance: action.payload.tokenBalance,
            }
        default:
            return {
                ...state,
            };
    }
};

export default userReducer;