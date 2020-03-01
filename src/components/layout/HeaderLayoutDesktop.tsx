import React from 'react'
import { getUserInfo } from "../../rest/UserService";
import { getNewMessages } from "../../rest/ContactsService";
import { Routes } from "./Routes";
import { Link } from "react-router-dom";

interface HeaderLayoutDesktopProps {

}

interface HeaderLayoutDesktopState {
    newMessages: number
}

class HeaderLayoutDesktop extends React.Component<HeaderLayoutDesktopProps, HeaderLayoutDesktopState> {

    constructor(props: Readonly<HeaderLayoutDesktopProps>) {
        super(props);
        this.state = {
            newMessages: 0
        };
    }

    async componentDidMount() {
        try {
            let response = await getNewMessages();
            if (response) {
                this.setState({
                    newMessages: response as number
                });
            }
        } catch (error) {
            //nothing happens
        }
    }

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
                                            <Link to={Routes.MESSAGES}>
                                                <i className="zmdi zmdi-comment-more"/>
                                                {this.state.newMessages && this.state.newMessages > 0 &&
                                                <span className="quantity">{this.state.newMessages}</span>
                                                }
                                            </Link>
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