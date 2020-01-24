import React from 'react';
import HeaderLayoutMobile from "./components/layout/HeaderLayoutMobile";
import NavigationLayout from "./components/layout/NavigationLayout";
import HeaderLayoutDesktop from "./components/layout/HeaderLayoutDesktop";
import PageContentLayout from "./components/layout/PageContentLayout";
import Login from "./components/login/Login";
import {connect} from "react-redux";
import {Routes} from "./components/layout/Routes";
import LoginAuthorize from "./components/login/LoginAuthorize";
import {Redirect, Route, Switch} from "react-router";

interface AppProps {
    isLoggedIn?: boolean
}

class App extends React.Component<AppProps> {

    public render() {
        if (this.props.isLoggedIn) {
            return (<React.Fragment>
                <HeaderLayoutMobile/>
                <NavigationLayout/>
                <div className="page-container">
                    <HeaderLayoutDesktop/>
                    <div className="main-content">
                        <div className="section__content section__content--p30">
                            <div className="container-fluid">
                                <PageContentLayout/>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>)
        } else {
            return <React.Fragment>
                <main>
                    <Switch>
                        <Route exact={true} path={Routes.LOGIN_AUTH} component={LoginAuthorize}/>
                        <Route exact={true} path={Routes.LOGIN} component={Login}/>
                        <Route render={() => <Redirect to={Routes.LOGIN}/>}/>
                    </Switch>
                </main>
            </React.Fragment>
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    }
};

export default connect(mapStateToProps)(App);
