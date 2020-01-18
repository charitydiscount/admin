import React from 'react';
import HeaderLayoutMobile from "./components/layout/HeaderLayoutMobile";
import NavigationLayout from "./components/layout/NavigationLayout";
import HeaderLayoutDesktop from "./components/layout/HeaderLayoutDesktop";
import PageLayout from "./components/layout/PageLayout";
import Login from "./components/login/Login";
import {connect} from "react-redux";

interface AppProps {
    isLoggedIn ?: boolean
}

class App extends React.Component<AppProps> {

    public render() {
        return (
            <React.Fragment>
                <div className="page-wrapper">
                    {this.props.isLoggedIn &&
                        <React.Fragment>
                            <HeaderLayoutMobile/>
                            <NavigationLayout/>
                            <div className="page-container">
                                <HeaderLayoutDesktop/>
                                <div className="main-content">
                                    <PageLayout/>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                    {!this.props.isLoggedIn &&
                        <Login/>
                    }
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    }
};

export default connect(mapStateToProps)(App);
