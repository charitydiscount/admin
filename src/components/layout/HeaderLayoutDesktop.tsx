import React from 'react'
import { getUserInfo } from "../../rest/UserService";
import { getNewMessages } from "../../rest/ContactsService";
import { Routes } from "./Routes";
import { Link } from "react-router-dom";
import { getNewTransactions } from "../../rest/TransactionsService";
import { TxType } from "../../Helper";

interface HeaderLayoutDesktopProps {

}

interface HeaderLayoutDesktopState {
    newMessages: string
    newCashouts: string
    newDonations: string
}

class HeaderLayoutDesktop extends React.Component<HeaderLayoutDesktopProps, HeaderLayoutDesktopState> {

    constructor(props: Readonly<HeaderLayoutDesktopProps>) {
        super(props);
        this.state = {
            newMessages: '-',
            newCashouts: '-',
            newDonations: '-'
        };
    }

    async componentDidMount() {
        try {
            let response = await getNewMessages();
            if (response) {
                this.setState({
                    newMessages: String(response)
                });
            }
        } catch (error) {
            //nothing happens
        }
        try {
            let response = await getNewTransactions(TxType.DONATION);
            if (response) {
                this.setState({
                    newDonations: String(response)
                });
            }
        } catch (error) {
            //nothing happens
        }
        try {
            let response = await getNewTransactions(TxType.CASHOUT);
            if (response) {
                this.setState({
                    newCashouts: String(response)
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
                                            <Link to={Routes.CASHOUT}>
                                                <i className="zmdi zmdi-money"/>
                                                <span className="quantity">{this.state.newCashouts}</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="noti-wrap">
                                        <div className="noti__item js-item-menu">
                                            <Link to={Routes.DONATIONS}>
                                                <i className="zmdi zmdi-favorite"/>
                                                <span className="quantity">{this.state.newDonations}</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="noti-wrap">
                                        <div className="noti__item js-item-menu">
                                            <Link to={Routes.MESSAGES}>
                                                <i className="zmdi zmdi-email"/>
                                                <span className="quantity">{this.state.newMessages}</span>
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