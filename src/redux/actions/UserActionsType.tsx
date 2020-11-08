import { ActionTypesUnion } from '../../redux/helper/TypesHelper';
import { createAction } from '../../redux/helper/ActionHelper';
import { LoginActionTypes, AuthActionTypes } from '../../redux/actions/Actions';
import { history, auth } from '../../index';
import { Routes } from '../../components/layout/Routes';

export const UserActions = {
    setLoggedUserAction: () =>
        createAction(LoginActionTypes.SET_LOGGED_USER_ACTION),
    resetLoggedUserAction: () =>
        createAction(LoginActionTypes.RESET_LOGGED_USER_ACTION),
    setAuthorizedUserAction: () =>
        createAction(AuthActionTypes.SET_AUTHORIZED_USER_ACTION),
};
export type UserActionsType = ActionTypesUnion<typeof UserActions>;

export function doLogoutAction(): any {
    return (dispatch: any) => {
        dispatch(UserActions.resetLoggedUserAction());
        history.push(Routes.LOGIN);
        auth.signOut();
    };
}
