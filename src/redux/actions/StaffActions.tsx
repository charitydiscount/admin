import { ActionTypesUnion } from "../helper/TypesHelper";
import { createAction } from "../helper/ActionHelper";
import { StaffActionTypes } from "./Actions";
import { User } from "../../models/User";

export const StaffActions = {
    setStaffModalVisible: (modalVisible: boolean) =>
        createAction(
            StaffActionTypes.SET_STAFF_MODAL_VISIBLE_ACTION,
            modalVisible
        ),
    updateStaffModal: (user: User) =>
        createAction(
            StaffActionTypes.UPDATE_STAFF_MODAL_ACTION,
            user
        ),
    setStaffModalUpdate: (user: User) =>
        createAction(
            StaffActionTypes.SET_STAFF_MODAL_UPDATE_ACTION,
            user
        ),
    setStaffModalCreate: () =>
        createAction(
            StaffActionTypes.SET_STAFF_MODAL_CREATE_ACTION
        ),
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

export type StaffActionsType = ActionTypesUnion<typeof StaffActions>;
