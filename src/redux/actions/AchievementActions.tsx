import { createAction } from '../helper/ActionHelper';
import { AchievementActionTypes } from './Actions';
import { ActionTypesUnion } from '../helper/TypesHelper';
import { Achievement } from '../../models/Achievement';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getAchievements } from '../../rest/AchievementService';

export const AchievementActions = {
    setAchievementModalVisible: (modalVisible: boolean) =>
        createAction(
            AchievementActionTypes.SET_ACHIEVEMENT_MODAL_VISIBLE_ACTION,
            modalVisible
        ),
    setAchievementModalCreate: () =>
        createAction(
            AchievementActionTypes.SET_ACHIEVEMENT_MODAL_CREATE_ACTION
        ),
    setAchievementModalUpdate: (achievement: Achievement) =>
        createAction(
            AchievementActionTypes.SET_ACHIEVEMENT_MODAL_UPDATE_ACTION,
            achievement
        ),
    updateAchievementModal: (achievement: Achievement) =>
        createAction(
            AchievementActionTypes.UPDATE_ACHIEVEMENT_MODAL_ACTION,
            achievement
        ),
    setAchievements: (achievements: Achievement[]) =>
        createAction(AchievementActionTypes.SET_ACHIEVEMENTS, achievements),
    setAchievementsLoading: (loading: boolean) =>
        createAction(AchievementActionTypes.SET_LOADING, loading),
};

export function setAchievementModalVisible(modalVisible: boolean): any {
    return (dispatch: any) => {
        dispatch(AchievementActions.setAchievementModalVisible(modalVisible));
    };
}

export function setAchievementModalCreate(): any {
    return (dispatch: any) => {
        dispatch(AchievementActions.setAchievementModalCreate());
    };
}

export function setAchievementModalUpdate(achievement: Achievement): any {
    return (dispatch: any) => {
        dispatch(AchievementActions.setAchievementModalUpdate(achievement));
    };
}

export function updateAchievementModal(achievement: Achievement): any {
    return (dispatch: any) => {
        dispatch(AchievementActions.updateAchievementModal(achievement));
    };
}

export const loadAchievements = () => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(AchievementActions.setAchievementsLoading(true));
    const achievements = await getAchievements();

    return dispatch(AchievementActions.setAchievements(achievements));
};

export type AchievementActionsType = ActionTypesUnion<
    typeof AchievementActions
>;
