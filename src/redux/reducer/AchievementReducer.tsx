import { AchievementActionTypes } from '../actions/Actions';
import { AchievementActionsType } from "../actions/AchievementActions";
import { Achievement, DEFAULT_ACHIEVEMENT } from "../../models/Achievement";

export interface IAchievementState {
    modalVisible: boolean,
    createAchievement: boolean,
    achievementModal: Achievement
}

const initialState: IAchievementState = {
    modalVisible: false,
    createAchievement: false,
    achievementModal: DEFAULT_ACHIEVEMENT
};

export default function (state: IAchievementState = initialState, action: AchievementActionsType): IAchievementState {
    switch (action.type) {
        case AchievementActionTypes.SET_ACHIEVEMENT_MODAL_VISIBLE_ACTION:
            return {
                ...state,
                modalVisible: action.payload
            };
        case AchievementActionTypes.SET_ACHIEVEMENT_MODAL_CREATE_ACTION:
            return {
                ...state,
                achievementModal: DEFAULT_ACHIEVEMENT,
                modalVisible: true,
                createAchievement: true
            };
        case AchievementActionTypes.SET_ACHIEVEMENT_MODAL_UPDATE_ACTION:
            return {
                ...state,
                achievementModal: action.payload,
                modalVisible: true,
                createAchievement: false
            };
        case AchievementActionTypes.UPDATE_ACHIEVEMENT_MODAL_ACTION:
            return {
                ...state,
                achievementModal: action.payload
            };
        default:
            return state;
    }
}
