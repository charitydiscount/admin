import { createAction } from "../helper/ActionHelper";
import { AchievementActionTypes } from "./Actions";
import { ActionTypesUnion } from "../helper/TypesHelper";
import { Achievement } from "../../models/Achievement";

export const AchievementActions = {
    setAchievementModalVisible: (modalVisible:boolean) =>
        createAction(AchievementActionTypes.SET_ACHIEVEMENT_MODAL_VISIBLE_ACTION, modalVisible),
    setAchievementModalCreate: () =>
        createAction(AchievementActionTypes.SET_ACHIEVEMENT_MODAL_CREATE_ACTION),
    setAchievementModalUpdate: (achievement: Achievement) =>
        createAction(AchievementActionTypes.SET_ACHIEVEMENT_MODAL_UPDATE_ACTION, achievement),
    updateAchievementModal: (achievement: Achievement) =>
        createAction(AchievementActionTypes.UPDATE_ACHIEVEMENT_MODAL_ACTION, achievement),
};

export function setAchievementModalVisible(modalVisible: boolean): any {
    return (dispatch: any) => {
        dispatch(AchievementActions.setAchievementModalVisible(modalVisible));
    }
}

export function setAchievementModalCreate(): any {
    return (dispatch: any) => {
        dispatch(AchievementActions.setAchievementModalCreate());
    }
}

export function setAchievementModalUpdate(achievement: Achievement): any {
    return (dispatch: any) => {
        dispatch(AchievementActions.setAchievementModalUpdate(achievement));
    }
}

export function updateAchievementModal(achievement: Achievement): any {
    return (dispatch: any) => {
        dispatch(AchievementActions.updateAchievementModal(achievement));
    }
}


export type AchievementActionsType = ActionTypesUnion<typeof AchievementActions>;


