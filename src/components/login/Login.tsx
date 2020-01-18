import React from "react";
import {doLogin} from "../../rest/UserService";
import {Routes} from "../layout/Routes";
import {history} from "../../index"
import {emptyHrefLink} from "../../Helper";

interface LoginProps {

}

interface LoginState {
    username: string,
    password: string
}


class Login extends React.Component<LoginProps, LoginState> {


    constructor(props: Readonly<LoginProps>) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.onSignIn = this.onSignIn.bind(this);
    }

    onSignIn() {
        let response = doLogin(this.state.username, this.state.password);
        if (response) {
            history.push(Routes.DASHBOARD);
        }
    }

    handleTextChange = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        });
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
                                        <img src="/images/icon/logo.png" alt="CoolAdmin"/>
                                    </a>
                                </div>
                                <div className="login-form">
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input className="au-input au-input--full" type="email" name="email"
                                               id="username"
                                               onChange={this.handleTextChange}
                                               value={this.state.username}
                                               placeholder="Email"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input className="au-input au-input--full" type="password" name="password"
                                               id="password"
                                               onChange={this.handleTextChange}
                                               value={this.state.password}
                                               placeholder="Password"/>
                                    </div>
                                    <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit"
                                            onClick={this.onSignIn}>
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Login;