import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from './redux/reducer/RootReducer';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/remote-config';
import 'firebase/storage';
import firebaseConfig from './config/FirebaseConfig';
import { UserActions } from './redux/actions/UserActions';
import { authorizeUser } from './rest/UserService';

export const publicUrl = process.env.PUBLIC_URL || '';

// REDUX----------------------------------------------------------------------------------------------------------------
const initialState = {};
export const history = createBrowserHistory({ basename: publicUrl });
// redux store
export const store = createStore(
    createRootReducer(history),
    initialState,
    applyMiddleware(thunk, routerMiddleware(history))
);

// Firebase--------------------------------------------------------------------------------------------------
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const DB = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();
export const remoteConfig = firebaseApp.remoteConfig();
remoteConfig.settings = {
    minimumFetchIntervalMillis: 3600000,
    fetchTimeoutMillis: 60001,
};
remoteConfig.fetchAndActivate();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

auth.onAuthStateChanged(user => {
    if (user) {
        store.dispatch(UserActions.setLoggedUserAction());
        authorizeUser().then(authResult => {
            if (authResult === true) {
                store.dispatch(UserActions.setAuthorizedUserAction());
            } else {
                history.push("/");
                alert("User not authorized");
            }
        });
    }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
