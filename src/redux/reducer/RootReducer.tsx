import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

// Used to combine all reducers for full functionality
export default (history: any) => combineReducers({
    router: connectRouter(history),
});

