import React from "react";
import {Routes} from "./Routes";
import {doLogoutAction} from "../../redux/actions/UserActions";
import {store} from "../../index";
import {emptyHrefLink} from "../../Helper";

class NavigationLayout extends React.Component {

    handleLogOut(event: any) {
        event.preventDefault();
        store.dispatch(doLogoutAction());
    }

    public render() {
        return (
            <React.Fragment>
                <aside className="menu-sidebar d-none d-lg-block">
                    <div className="logo">
                        <a href="/">
                            <img src="/images/icon/logo.png" alt="Cool Admin"/>
                        </a>
                    </div>
                    <div className="menu-sidebar__content js-scrollbar1">
                        <nav className="navbar-sidebar">
                            <ul className="list-unstyled navbar__list">
                                <li>
                                    <a href={Routes.COMMISSIONS}>
                                        <i className="fas fa-table"/>Commissions
                                    </a>
                                    <a href={emptyHrefLink} onClick={this.handleLogOut}>
                                        <i className="zmdi zmdi-power"/>Logout
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
            </React.Fragment>
        )
    }
}

export default NavigationLayout;