import { AchievementActionTypes } from '../actions/Actions';
import { AchievementActions } from "../actions/AchievementActions";

export interface IAchievementState {
    modalVisible: boolean
}

const initialState: IAchievementState = {
    modalVisible: false
};

export default function (state: IAchievementState = initialState, action: AchievementActions): IAchievementState {
    switch (action.type) {
        case AchievementActionTypes.SET_ACHIEVEMENT_MODAL_VISIBLE_ACTION:
            return {
                ...state,
                modalVisible: action.payload
            };
        default:
            return state;
    }
}
