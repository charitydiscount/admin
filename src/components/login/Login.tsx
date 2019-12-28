import React from "react";

class Login extends React.Component {

    public render() {
        return (
            <React.Fragment>
                <div className="page-content--bge5">
                    <div className="container">
                        <div className="login-wrap">
                            <div className="login-content">
                                <div className="login-logo">
                                    <a href="#">
                                        <img src="images/icon/logo.png" alt="CoolAdmin"/>
                                    </a>
                                </div>
                                <div className="login-form">
                                    <form action="" method="post">
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input className="au-input au-input--full" type="email" name="email"
                                                   placeholder="Email"/>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input className="au-input au-input--full" type="password" name="password"
                                                   placeholder="Password"/>
                                        </div>
                                        <div className="login-checkbox">
                                            <label>
                                                <input type="checkbox" name="remember"/>Remember Me
                                            </label>
                                            <label>
                                                <a href="#">Forgotten Password?</a>
                                            </label>
                                        </div>
                                        <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">sign
                                            in
                                        </button>
                                        <div className="social-login-content">
                                            <div className="social-button">
                                                <button className="au-btn au-btn--block au-btn--blue m-b-20">sign in
                                                    with
                                                    facebook
                                                </button>
                                                <button className="au-btn au-btn--block au-btn--blue2">sign in with
                                                    twitter
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="register-link">
                                        <p>
                                            Don't you have account?
                                            <a href="#">Sign Up Here</a>
                                        </p>
                                    </div>
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