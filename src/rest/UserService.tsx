import {store} from "../index";
import {UserActions} from "../redux/actions/UserActions";
import {setLocalStorage, StorageKey} from "../Helper";

export function doLogin(username: string, password: string) {
    if (!username.trim() || !password.trim()) {
        alert("Please type something");
        return false;
    }
    setLocalStorage(StorageKey.USER, "UserLogat");
    store.dispatch(UserActions.setLoggedUserAction("UserLogat"));
    return true;
}