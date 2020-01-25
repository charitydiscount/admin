import React from 'react'
import {Routes} from "./Routes";
import {emptyHrefLink, handleLogOut} from "../../Helper";

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
                                <button className="hamburger hamburger--slider" type="button">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar-mobile">
                        <div className="container-fluid">
                            <ul className="navbar-mobile__list list-unstyled">
                                <li className="has-sub">
                                    <a className="js-arrow" href={Routes.COMMISSIONS}>
                                        <i className="fas fa-tachometer-alt"></i>Commissions</a>
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