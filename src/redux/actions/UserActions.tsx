import {ActionTypesUnion} from '../../redux/helper/TypesHelper';
import {createAction} from '../../redux/helper/ActionHelper';
import {LoginActionTypes} from '../../redux/actions/Actions';
import {removeSessionStorage, StorageKey} from "../../Helper";
import {history} from "../../index"
import {Routes} from "../../components/layout/Routes";

export const UserActions = {
    setLoggedUserAction: (loginAuthorized: string | null) =>
        createAction(LoginActionTypes.SET_LOGGED_USER_ACTION, loginAuthorized),
    resetLoggedUserAction: () =>
        createAction(LoginActionTypes.RESET_LOGGED_USER_ACTION)
};
export type UserActions = ActionTypesUnion<typeof UserActions>;

export function doLogoutAction(): any {
    return (dispatch: any) => {
        dispatch(UserActions.resetLoggedUserAction());
        removeSessionStorage(StorageKey.USER_KEY);
        history.push(Routes.LOGIN);
    };
}
