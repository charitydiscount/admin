import React from 'react'

class HeaderLayoutDesktop extends React.Component {

    render() {
        return (
            <React.Fragment>
                <header className="header-desktop">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="header-wrap">
                                <div className="form-header">
                                    <input className="au-input au-input--xl" type="text" name="search"
                                           placeholder="Search for datas &amp; reports..."/>
                                    <button className="au-btn--submit" type="submit">
                                        <i className="zmdi zmdi-search"/>
                                    </button>
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
                                                <img src="/images/icon/avatar-01.jpg" alt="John Doe"/>
                                            </div>
                                            <div className="content">
                                                John doe
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