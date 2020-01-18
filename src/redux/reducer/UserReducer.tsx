import {LoginActionTypes} from "../actions/Actions";
import {UserActions} from "../actions/UserActions";

interface IUserState {
    isLoggedIn: boolean
}

const initialState: IUserState = {
    isLoggedIn: false
};

export default function (state: IUserState = initialState, action: UserActions): IUserState {
    switch (action.type) {
        case LoginActionTypes.SET_LOGGED_USER_ACTION:
            return {
                ...state,
                isLoggedIn: true
            };
        case LoginActionTypes.RESET_LOGGED_USER_ACTION:
            return initialState;
        default:
            return state;
    }
}