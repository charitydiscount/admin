import React from 'react';
import { auth } from '../../index';
import firebase from 'firebase/app';
import { emptyHrefLink } from '../../Helper';
import { StyledFirebaseAuth } from 'react-firebaseui';

interface LoginProps {}

interface LoginState {}

class Login extends React.Component<LoginProps, LoginState> {
    uiConfig = {
        signInFlow: 'popup',
        tosUrl: '/',
        signInSuccessUrl: '/auth',
        privacyPolicyUrl: '/',
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
    };

    public render() {
        return (
            <React.Fragment>
                <div className="page-content--bge5">
                    <div className="container">
                        <div className="login-wrap">
                            <div className="login-content">
                                <div className="login-logo">
                                    <a href={emptyHrefLink}>
                                        <img
                                            src="/images/icon/logo.png"
                                            alt="CoolAdmin"
                                        />
                                    </a>
                                </div>
                                <div className="login-form">
                                    <StyledFirebaseAuth
                                        uiConfig={this.uiConfig}
                                        firebaseAuth={auth}
                                        className="mx-auto"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
