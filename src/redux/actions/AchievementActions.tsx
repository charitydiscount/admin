import { createAction } from "../helper/ActionHelper";
import { AchievementActionTypes } from "./Actions";
import { ActionTypesUnion } from "../helper/TypesHelper";

export const AchievementActions = {
    setAchievementModalVisible: (modalVisible: boolean) =>
        createAction(AchievementActionTypes.SET_ACHIEVEMENT_MODAL_VISIBLE_ACTION, modalVisible),
};

export function setAchievementModalVisible(modalVisible: boolean): any {
    return (dispatch: any) => {
        dispatch(AchievementActions.setAchievementModalVisible(modalVisible));
    }
}

export type AchievementActions = ActionTypesUnion<typeof AchievementActions>;


