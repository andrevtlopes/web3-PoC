export interface UserStates {
    logged: boolean;
    publicAddress?: string;
    error: string;
}

export interface UserActions {
    type: string;
    payload: any;
}
