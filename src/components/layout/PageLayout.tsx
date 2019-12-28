import React from "react";
import {Redirect, Route, Switch} from 'react-router';
import {Routes} from "./Routes";
import Login from "../login/Login";

class PageLayout extends React.Component {

    public render() {
        return (
            <React.Fragment>
                <main>
                    <Switch>
                        <Route exact={true} path={Routes.DASHBOARD} component={Login}/>
                        <Route render={() => <Redirect to={Routes.DASHBOARD}/>}/>
                    </Switch>
                </main>
            </React.Fragment>
        )
    }
}

export default PageLayout;