import React from 'react';
import { Routes } from './Routes';
import { emptyHrefLink, handleLogOut } from '../../Helper';
import { Link } from 'react-router-dom';

class NavigationLayout extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <aside className="menu-sidebar d-none d-lg-block">
                    <div className="logo">
                        <a href="/">
                            <img src="/images/icon/logo.png" alt="Cool Admin" />
                        </a>
                    </div>
                    <div className="menu-sidebar__content js-scrollbar1">
                        <nav className="navbar-sidebar">
                            <ul className="list-unstyled navbar__list">
                                <li>
                                    <Link to={Routes.COMMISSIONS}>
                                        <i className="fas fa-table" />
                                        Commissions
                                    </Link>
                                    <Link to={Routes.PROGRAMS}>
                                        <i className="fas fa-table" />
                                        Programs
                                    </Link>
                                    <Link to={Routes.CASES}>
                                        <i className="fas fa-table" />
                                        Charity Cases
                                    </Link>
                                    <a
                                        href={emptyHrefLink}
                                        onClick={handleLogOut}
                                    >
                                        <i className="zmdi zmdi-power" />
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
            </React.Fragment>
        );
    }
}

export default NavigationLayout;
