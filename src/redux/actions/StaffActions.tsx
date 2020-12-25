import { ActionTypesUnion } from '../helper/TypesHelper';
import { createAction } from '../helper/ActionHelper';
import { StaffActionTypes } from './Actions';
import { User } from '../../models/User';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getStaffUsers } from '../../rest/StaffService';

export const StaffActions = {
    setStaffModalVisible: (modalVisible: boolean) =>
        createAction(
            StaffActionTypes.SET_STAFF_MODAL_VISIBLE_ACTION,
            modalVisible
        ),
    updateStaffModal: (user: User) =>
        createAction(StaffActionTypes.UPDATE_STAFF_MODAL_ACTION, user),
    setStaffModalUpdate: (user: User) =>
        createAction(StaffActionTypes.SET_STAFF_MODAL_UPDATE_ACTION, user),
    setStaffModalCreate: () =>
        createAction(StaffActionTypes.SET_STAFF_MODAL_CREATE_ACTION),
    loadStaffMembers: (members: User[]) =>
        createAction(StaffActionTypes.LOAD_STAFF_MEMBERS, members),
    setStaffLoading: (loading: boolean) =>
        createAction(StaffActionTypes.SET_STAFF_LOADING, loading),
};

export function setStaffModalCreate(): any {
    return (dispatch: any) => {
        dispatch(StaffActions.setStaffModalCreate());
    };
}

export function setStaffModalVisible(modalVisible: boolean): any {
    return (dispatch: any) => {
        dispatch(StaffActions.setStaffModalVisible(modalVisible));
    };
}

export function updateStaffModal(user: User): any {
    return (dispatch: any) => {
        dispatch(StaffActions.updateStaffModal(user));
    };
}

export function setStaffModalUpdate(user: User): any {
    return (dispatch: any) => {
        dispatch(StaffActions.setStaffModalUpdate(user));
    };
}

export const loadStaffMembers = () => async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>
) => {
    dispatch(StaffActions.setStaffLoading(true));
    const members = await getStaffUsers();
    return dispatch(StaffActions.loadStaffMembers(members));
};

export type StaffActionsType = ActionTypesUnion<typeof StaffActions>;
