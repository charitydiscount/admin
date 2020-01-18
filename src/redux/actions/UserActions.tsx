import {ActionTypesUnion} from '../../redux/helper/TypesHelper';
import {createAction} from '../../redux/helper/ActionHelper';
import {LoginActionTypes} from '../../redux/actions/Actions';


export const UserActions = {
    setLoggedUserAction: (loginInfo: string | null) =>
        createAction(LoginActionTypes.SET_LOGGED_USER_ACTION, loginInfo),
    resetLoggedUserAction: () =>
        createAction(LoginActionTypes.RESET_LOGGED_USER_ACTION)
};
export type UserActions = ActionTypesUnion<typeof UserActions>;

export function doLogoutAction(): any {
    return (dispatch: any) => {
        dispatch(UserActions.resetLoggedUserAction());
        window.location.reload();
    };
}
