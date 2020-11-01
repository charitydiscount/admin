import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import UserReducer, { IUserState } from './UserReducer';
import CasesReducer, { ICasesState } from './CasesReducer';
import AchievementReducer, { IAchievementState } from "./AchievementReducer";

export interface AppState {
    router: RouterState;
    user: IUserState;
    achievement: IAchievementState
    cases: ICasesState;
}

// Used to combine all reducers for full functionality
export default (history: any) =>
    combineReducers({
        router: connectRouter(history),
        user: UserReducer,
        achievement: AchievementReducer,
        cases: CasesReducer,
    });
