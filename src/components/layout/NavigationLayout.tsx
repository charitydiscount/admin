import React from 'react';
import { Routes } from './Routes';
import { emptyHrefLink, handleLogOut } from '../../Helper';
import { Link } from 'react-router-dom';

class NavigationLayout extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <aside className="menu-sidebar d-none d-lg-block">
                    <div className="logo" style={{ justifyContent: 'center' }}>
                        <a href="/">
                            <img
                                src="/images/icon/logo.png"
                                alt="CharityDiscount Admin"
                            />
                        </a>
                    </div>
                    <div className="menu-sidebar__content js-scrollbar1">
                        <nav className="navbar-sidebar">
                            <ul className="list-unstyled navbar__list">
                                <li>
                                    <Link to={Routes.SETTINGS}>
                                        <i className="zmdi zmdi-settings" />
                                        Settings
                                    </Link>
                                    <Link to={Routes.MAILS}>
                                        <i className="zmdi zmdi-email" />
                                        Notification mail
                                    </Link>
                                    <Link to={Routes.ACHIEVEMENTS}>
                                        <i className="fas fa-trophy" />
                                        Achievements
                                    </Link>
                                    <Link to={Routes.CLICKS}>
                                        <i className="fas fa-mouse-pointer" />
                                        Clicks
                                    </Link>
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
                                    <Link to={Routes.CASHOUT}>
                                        <i className="zmdi zmdi-money" />
                                        Cashouts
                                    </Link>
                                    <Link to={Routes.DONATIONS}>
                                        <i className="zmdi zmdi-favorite" />
                                        Donations
                                    </Link>
                                    <Link to={Routes.MESSAGES}>
                                        <i className="zmdi zmdi-email" />
                                        Messages
                                    </Link>
                                    <Link to={Routes.STAFF}>
                                        <i className="fas fa-sticky-note" />
                                        Staff members
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
