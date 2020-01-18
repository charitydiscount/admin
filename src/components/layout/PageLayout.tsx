import React from "react";
import {Redirect, Route, Switch} from 'react-router';
import {Routes} from "./Routes";
import EmptyComponent from "./EmptyComponent";
import Commissions from "../commissions/Commissions";
import {connect} from "react-redux";

interface PageLayoutProps {
    isLoggedIn?: boolean
}


class PageLayout extends React.Component<PageLayoutProps> {

    public render() {
        if (this.props.isLoggedIn) {
            return (
                <React.Fragment>
                    <main>
                        <Switch>
                            <Route exact={true} path={Routes.DASHBOARD} component={EmptyComponent}/>
                            <Route exact={true} path={Routes.COMMISSIONS} component={Commissions}/>
                            <Route render={() => <Redirect to={Routes.DASHBOARD}/>}/>
                        </Switch>
                    </main>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <main>
                        <Switch>
                            <Route render={() => <Redirect to={Routes.LOGIN}/>}/>
                        </Switch>
                    </main>
                </React.Fragment>
            )
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    }
};

export default connect(mapStateToProps)(PageLayout);