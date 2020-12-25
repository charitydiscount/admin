import { DEFAULT_USER, User } from '../../models/User';
import { StaffActionTypes } from '../actions/Actions';
import { StaffActionsType } from '../actions/StaffActions';

export interface IStaffState {
    modalVisible: boolean;
    createStaff: boolean;
    staffModal: User;
    members: User[];
    loading: boolean;
}

const initialState: IStaffState = {
    modalVisible: false,
    createStaff: false,
    staffModal: DEFAULT_USER,
    members: [],
    loading: false,
};

export default function (
    state: IStaffState = initialState,
    action: StaffActionsType
): IStaffState {
    switch (action.type) {
        case StaffActionTypes.SET_STAFF_MODAL_VISIBLE_ACTION:
            return {
                ...state,
                modalVisible: action.payload,
            };
        case StaffActionTypes.UPDATE_STAFF_MODAL_ACTION:
            return {
                ...state,
                staffModal: action.payload,
            };
        case StaffActionTypes.SET_STAFF_MODAL_UPDATE_ACTION:
            return {
                ...state,
                staffModal: action.payload,
                modalVisible: true,
                createStaff: false,
            };
        case StaffActionTypes.SET_STAFF_MODAL_CREATE_ACTION:
            return {
                ...state,
                staffModal: DEFAULT_USER,
                modalVisible: true,
                createStaff: true,
            };
        case StaffActionTypes.LOAD_STAFF_MEMBERS:
            return {
                ...state,
                members: action.payload,
                loading: false,
            };
        case StaffActionTypes.SET_STAFF_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
}
