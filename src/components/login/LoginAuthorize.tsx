import React from "react";
import {store} from "../../index"
import {UserActions} from "../../redux/actions/UserActions";
import {checkUserIsAuthorized} from "../../rest/UserService";
import {Redirect} from "react-router";
import {Routes} from "../layout/Routes";

interface LoginAuthorizeProps {
}

interface LoginAuthorizeState {
    userRedirect: string
}

class LoginAuthorize extends React.Component<LoginAuthorizeProps, LoginAuthorizeState> {

    constructor(props: LoginAuthorizeProps) {
        super(props);
        this.state = {
            userRedirect: ""
        }

    }

    async componentDidMount() {
        let response = await checkUserIsAuthorized();
        if (response) {
            store.dispatch(UserActions.setLoggedUserAction("User authorized"));
            this.setState({
                userRedirect: "true"
            });
        } else {
            this.setState({
                userRedirect: "false"
            });
            alert("Not authorized");
        }
    }

    public render() {
        if (this.state.userRedirect) {
            if (this.state.userRedirect === "true") {
                return <Redirect to={Routes.DASHBOARD}/>
            } else {
                return <Redirect to={Routes.LOGIN}/>
            }

        } else return <React.Fragment/>;
    }
}

export default LoginAuthorize;