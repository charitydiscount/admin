import React from 'react'
import {getUserInfo} from "../../rest/UserService";


class HeaderLayoutDesktop extends React.Component {

    render() {
        return (
            <React.Fragment>
                <header className="header-desktop">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="header-wrap">
                                <div className="form-header">
                                </div>
                                <div className="header-button">
                                    <div className="noti-wrap">
                                        <div className="noti__item js-item-menu">
                                            <i className="zmdi zmdi-comment-more"/>
                                            <span className="quantity">1</span>
                                        </div>
                                    </div>
                                    <div className="account-wrap">
                                        <div className="account-item clearfix js-item-menu">
                                            <div className="image">
                                                <img src={getUserInfo().photoUrl} alt="John Doe"/>
                                            </div>
                                            <div className="content">
                                                {getUserInfo().name}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </React.Fragment>
        )
    }
}

export default HeaderLayoutDesktop;