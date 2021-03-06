import React from 'react'
import { Routes } from "./Routes";
import { emptyHrefLink, handleLogOut } from "../../Helper";
import { Link } from "react-router-dom";

class HeaderLayoutMobile extends React.Component {

    render() {
        return (
            <React.Fragment>
                <header className="header-mobile d-block d-lg-none">
                    <div className="header-mobile__bar">
                        <div className="container-fluid">
                            <div className="header-mobile-inner">
                                <a className="logo" href="index.html">
                                    <img src="images/icon/logo.png" alt="CoolAdmin"/>
                                </a>
                                <a className="hamburger hamburger--slider" href={emptyHrefLink} onClick={()=>{
                                    $(this).toggleClass('is-active');
                                    $('.navbar-mobile').slideToggle('500');
                                }}>
                                    <span className="hamburger-box">
                                        <span className="hamburger-inner"/>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar-mobile">
                        <div className="container-fluid">
                            <ul className="navbar-mobile__list list-unstyled">
                                <li className="has-sub">
                                    <Link to={Routes.SETTINGS}>
                                        <i className="fas fa-table"/>Settings
                                    </Link>
                                </li>
                                <li className="has-sub">
                                    <Link to={Routes.MAILS}>
                                        <i className="zmdi zmdi-email"/>Notification mail
                                    </Link>
                                </li>
                                <li className="has-sub">
                                    <Link to={Routes.ACHIEVEMENTS}>
                                        <i className="zmdi zmdi-email"/>Achievements
                                    </Link>
                                </li>
                                <li className="has-sub">
                                    <Link to={Routes.CLICKS}>
                                        <i className="zmdi zmdi-email"/>Clicks
                                    </Link>
                                </li>
                                <li className="has-sub">
                                    <Link to={Routes.COMMISSIONS}>
                                        <i className="fas fa-table"/>Commissions
                                    </Link>
                                </li>
                                <li className="has-sub">
                                    <Link to={Routes.PROGRAMS}>
                                        <i className="fas fa-table"/>Programs
                                    </Link>
                                </li>
                                <li className="has-sub">
                                    <Link to={Routes.CASES}>
                                        <i className="fas fa-table"/>Charity Cases
                                    </Link>
                                </li>
                                <li className="has-sub">
                                    <Link to={Routes.CASHOUT}>
                                        <i className="fas fa-table"/>Cashouts
                                    </Link>
                                </li>
                                <li className="has-sub">
                                    <Link to={Routes.DONATIONS}>
                                        <i className="fas fa-table"/>Donations
                                    </Link>
                                </li>
                                <li className="has-sub">
                                    <Link to={Routes.MESSAGES}>
                                        <i className="fas fa-table"/>Messages
                                    </Link>
                                </li>
                                <li className="has-sub">
                                    <Link to={Routes.STAFF}>
                                        <i className="fas fa-sticky-note"/>Staff members
                                    </Link>
                                </li>
                                <li className="has-sub">
                                    <a href={emptyHrefLink} onClick={handleLogOut}>
                                        <i className="zmdi zmdi-power"/>Logout
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </nav>
                </header>
            </React.Fragment>
        )
    }
}

export default HeaderLayoutMobile;