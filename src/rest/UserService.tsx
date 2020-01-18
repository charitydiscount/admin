import {store} from "../index";
import {UserActions} from "../redux/actions/UserActions";

export function doLogin(username: string, password: string) {
    if (!username.trim() || !password.trim()) {
        alert("Please type something");
        return false;
    }
    alert("Hello:" + username);
    store.dispatch(UserActions.setLoggedUserAction("UserLogat"));
    return true;
}