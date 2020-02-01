import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Routes } from './Routes';
import EmptyComponent from './EmptyComponent';
import Commissions from '../commissions/Commissions';
import Programs from '../programs/Programs';

class PageContentLayout extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <main>
                    <Switch>
                        <Route
                            exact={true}
                            path={Routes.DASHBOARD}
                            component={EmptyComponent}
                        />
                        <Route
                            exact={true}
                            path={Routes.COMMISSIONS}
                            component={Commissions}
                        />
                        <Route
                            exact={true}
                            path={Routes.PROGRAMS}
                            component={Programs}
                        />
                        <Route
                            render={() => <Redirect to={Routes.DASHBOARD} />}
                        />
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default PageContentLayout;
