import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import UserReducer, { IUserState } from './UserReducer';
import CasesReducer, { ICasesState } from './CasesReducer';
import AchievementReducer, { IAchievementState } from "./AchievementReducer";
import StaffReducer, { IStaffState } from "./StaffReducer";

export interface AppState {
    router: RouterState;
    user: IUserState;
    staff: IStaffState;
    achievement: IAchievementState
    cases: ICasesState;
}

// Used to combine all reducers for full functionality
export default (history: any) =>
    combineReducers({
        router: connectRouter(history),
        user: UserReducer,
        staff: StaffReducer,
        achievement: AchievementReducer,
        cases: CasesReducer,
    });
