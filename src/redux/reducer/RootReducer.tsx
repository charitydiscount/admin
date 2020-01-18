import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import UserReducer from "./UserReducer";

// Used to combine all reducers for full functionality
export default (history: any) => combineReducers({
    router: connectRouter(history),
    user: UserReducer
});

