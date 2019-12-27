import React from 'react'

class HeaderLayoutMobile extends React.Component {

    render(): React.ReactNode {
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
                                    <a className="js-arrow" href="#">
                                        <i className="fas fa-tachometer-alt"></i>Dashboard</a>
                                    <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                        <li>
                                            <a href="index.html">Dashboard 1</a>
                                        </li>
                                        <li>
                                            <a href="index2.html">Dashboard 2</a>
                                        </li>
                                        <li>
                                            <a href="index3.html">Dashboard 3</a>
                                        </li>
                                        <li>
                                            <a href="index4.html">Dashboard 4</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="chart.html">
                                        <i className="fas fa-chart-bar"></i>Charts</a>
                                </li>
                                <li>
                                    <a href="table.html">
                                        <i className="fas fa-table"></i>Tables</a>
                                </li>
                                <li>
                                    <a href="form.html">
                                        <i className="far fa-check-square"></i>Forms</a>
                                </li>
                                <li>
                                    <a href="calendar.html">
                                        <i className="fas fa-calendar-alt"></i>Calendar</a>
                                </li>
                                <li>
                                    <a href="map.html">
                                        <i className="fas fa-map-marker-alt"></i>Maps</a>
                                </li>
                                <li className="has-sub">
                                    <a className="js-arrow" href="#">
                                        <i className="fas fa-copy"></i>Pages</a>
                                    <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                        <li>
                                            <a href="login.html">Login</a>
                                        </li>
                                        <li>
                                            <a href="register.html">Register</a>
                                        </li>
                                        <li>
                                            <a href="forget-pass.html">Forget Password</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="has-sub">
                                    <a className="js-arrow" href="#">
                                        <i className="fas fa-desktop"></i>UI Elements</a>
                                    <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                                        <li>
                                            <a href="button.html">Button</a>
                                        </li>
                                        <li>
                                            <a href="badge.html">Badges</a>
                                        </li>
                                        <li>
                                            <a href="tab.html">Tabs</a>
                                        </li>
                                        <li>
                                            <a href="card.html">Cards</a>
                                        </li>
                                        <li>
                                            <a href="alert.html">Alerts</a>
                                        </li>
                                        <li>
                                            <a href="progress-bar.html">Progress Bars</a>
                                        </li>
                                        <li>
                                            <a href="modal.html">Modals</a>
                                        </li>
                                        <li>
                                            <a href="switch.html">Switchs</a>
                                        </li>
                                        <li>
                                            <a href="grid.html">Grids</a>
                                        </li>
                                        <li>
                                            <a href="fontawesome.html">Fontawesome Icon</a>
                                        </li>
                                        <li>
                                            <a href="typo.html">Typography</a>
                                        </li>
                                    </ul>
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