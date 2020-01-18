import React from "react";
import {Redirect, Route, Switch} from 'react-router';
import {Routes} from "./Routes";
import Login from "../login/Login";
import EmptyComponent from "./EmptyComponent";

class PageLayout extends React.Component {

    public render() {
        return (
            <React.Fragment>
                <main>
                    <Switch>
                        <Route exact={true} path={Routes.LOGIN} component={Login}/>
                        <Route exact={true} path={Routes.DASHBOARD} component={EmptyComponent}/>
                        <Route render={() => <Redirect to={Routes.LOGIN}/>}/>
                    </Switch>
                </main>
            </React.Fragment>
        )
    }
}

export default PageLayout;