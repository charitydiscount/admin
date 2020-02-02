import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import UserReducer, { IUserState } from './UserReducer';
import CasesReducer, { ICasesState } from './CasesReducer';

export interface AppState {
    router: RouterState;
    user: IUserState;
    cases: ICasesState;
}

// Used to combine all reducers for full functionality
export default (history: any) =>
    combineReducers({
        router: connectRouter(history),
        user: UserReducer,
        cases: CasesReducer,
    });
