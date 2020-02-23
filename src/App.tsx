import React from 'react';
import HeaderLayoutMobile from './components/layout/HeaderLayoutMobile';
import NavigationLayout from './components/layout/NavigationLayout';
import HeaderLayoutDesktop from './components/layout/HeaderLayoutDesktop';
import PageContentLayout from './components/layout/PageContentLayout';
import Login from './components/login/Login';
import { connect } from 'react-redux';
import { Routes } from './components/layout/Routes';
import { Route, Switch } from 'react-router';
import './scss/index.scss';

interface AppProps {
    isLoggedIn: boolean;
    isAuthorized: boolean;
}

class App extends React.Component<AppProps> {
    public render() {
        if (this.props.isLoggedIn && this.props.isAuthorized) {
            return (
                <React.Fragment>
                    <div className="page-wrapper">
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
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <main>
                        <Switch>
                            <Route
                                exact={true}
                                path={Routes.LOGIN}
                                component={Login}
                            />
                        </Switch>
                    </main>
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        isAuthorized: state.user.isAuthorized,
    };
};

export default connect(mapStateToProps)(App);
