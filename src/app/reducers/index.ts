import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import loginReducer from './login.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    login: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;