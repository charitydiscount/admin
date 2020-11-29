export enum LoginActionTypes {
    SET_LOGGED_USER_ACTION = 'SET_LOGGED_USER_ACTION',
    RESET_LOGGED_USER_ACTION = 'RESET_LOGGED_USER_ACTION',
}

export enum AchievementActionTypes {
    SET_ACHIEVEMENT_MODAL_VISIBLE_ACTION = 'SET_ACHIEVEMENT_MODAL_VISIBLE_ACTION',
    SET_ACHIEVEMENT_MODAL_CREATE_ACTION = 'SET_ACHIEVEMENT_MODAL_CREATE_ACTION',
    SET_ACHIEVEMENT_MODAL_UPDATE_ACTION = 'SET_ACHIEVEMENT_MODAL_UPDATE_ACTION',
    UPDATE_ACHIEVEMENT_MODAL_ACTION = 'UPDATE_ACHIEVEMENT_MODAL_ACTION',
    SET_ACHIEVEMENTS = 'SET_ACHIEVEMENTS',
    SET_LOADING = 'SET_ACHIEVEMENTS_LOADING',
}

export enum AuthActionTypes {
    SET_AUTHORIZED_USER_ACTION = 'SET_AUTHORIZED_USER_ACTION',
}

export enum CasesTypes {
    CASES_LOADED = 'CASES_LOADED',
    SET_CURRENT_CASE = 'SET_CURRENT_CASE',
}
