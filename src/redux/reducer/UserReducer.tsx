import { LoginActionTypes, AuthActionTypes } from '../actions/Actions';
import { UserActionsType } from '../actions/UserActionsType';

export interface IUserState {
    isLoggedIn: boolean;
    isAuthorized: boolean;
}

const initialState: IUserState = {
    isLoggedIn: false,
    isAuthorized: false,
};

export default function(
    state: IUserState = initialState,
    action: UserActionsType
): IUserState {
    switch (action.type) {
        case LoginActionTypes.SET_LOGGED_USER_ACTION:
            return {
                ...state,
                isLoggedIn: true,
            };
        case LoginActionTypes.RESET_LOGGED_USER_ACTION:
            return initialState;
        case AuthActionTypes.SET_AUTHORIZED_USER_ACTION:
            return {
                ...state,
                isAuthorized: true,
            };
        default:
            return state;
    }
}
