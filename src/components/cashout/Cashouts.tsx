import React from "react";
import { pageLimit, spinnerCss, TxType } from "../../Helper";
import FadeLoader from 'react-spinners/FadeLoader';
import CashoutElement from "./CashoutElement";
import ReactPaginate from 'react-paginate';
import { Button, TextField } from "@material-ui/core";
import { getAllUsers } from "../../rest/UserService";
import { getTransactions, TransactionDto } from "../../rest/TransactionsService";

export interface CashoutsProps {

}

export interface CashoutsState {
    isLoading: boolean,
    currentPage: number,
    cashouts: TransactionDto[],
    users: Map<string, string>,
    defaultCashoutsList: TransactionDto[]
}

class Cashouts extends React.Component<CashoutsProps, CashoutsState> {

    private search: string = '';

    constructor(props: Readonly<CashoutsProps>) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: 0,
            cashouts: [],
            users: new Map<string, string>(),
            defaultCashoutsList: []
        };
        this.updatePageNumber = this.updatePageNumber.bind(this);
        this.searchCashouts = this.searchCashouts.bind(this);
        this.enterSearch = this.enterSearch.bind(this);
    }

    enterSearch(event) {
        if (event.keyCode === 13) {
            this.searchCashouts();
        }
    }

    updatePageNumber(data) {
        this.setState({
            currentPage: data.selected
        });
    }

    searchCashouts() {
        if (this.search) {
            let resultedPrograms = this.state.defaultCashoutsList
                .filter(value => value.userId.startsWith(this.search));
            this.setState({
                cashouts: resultedPrograms
            })
        } else {
            this.setState({
                cashouts: this.state.defaultCashoutsList
            })
        }
    }


    async componentDidMount() {
        document.addEventListener('keydown', this.enterSearch, false);
        try {
            let responseCashouts = await getTransactions(TxType.CASHOUT);
            let responseUsers = await getAllUsers();
            if (responseCashouts && responseUsers) {
                this.setState({
                    cashouts: responseCashouts as TransactionDto[],
                    users: responseUsers as Map<string, string>,
                    defaultCashoutsList: responseCashouts as TransactionDto[],
                    isLoading: false
                });
            }
        } catch (error) {
            alert(error);
        }
    }

    render(): React.ReactNode {
        let pageCount = 0;
        let cashoutList;
        if (this.state.cashouts && this.state.cashouts.length > 0) {
            cashoutList = this.state.cashouts;

            if (cashoutList.length > pageLimit) {
                pageCount = cashoutList.length / pageLimit;
                let offset = this.state.currentPage;
                cashoutList = cashoutList
                    .slice(offset * pageLimit, (offset + 1) * pageLimit);
            } else {
                pageCount = 1;
            }

            cashoutList = cashoutList
                .map((value, index) => {
                    return (
                        <CashoutElement key={index} cashout={value}
                                        email={this.state.users.get((value as TransactionDto).userId)}/>
                    );
                });
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">Cashouts</h3>
                        <FadeLoader
                            loading={this.state.isLoading}
                            color={'#1641ff'}
                            css={spinnerCss}
                        />
                        {!this.state.isLoading &&
                        <React.Fragment>
                            <div className="table-data__tool">
                                <div className="table-data__tool-left">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        style={{marginTop: 25}}
                                        size={"large"}
                                        onClick={
                                            this.searchCashouts
                                        }
                                    >
                                        {'>'}
                                    </Button>
                                    <div className="rs-select2--light rs-select2--md">
                                        <TextField
                                            id="cashoutSearch" label={"Search after userId"}
                                            style={{width: '100%', marginLeft: 8}}
                                            onChange={event => this.search = event.target.value}
                                        />
                                    </div>
                                    <div className="rs-select2--light rs-select2--md">

                                    </div>
                                </div>
                                <div className="table-data__tool-right">
                                    <ReactPaginate
                                        previousLabel={'<'}
                                        previousLinkClassName={
                                            'page-link'
                                        }
                                        nextLabel={'>'}
                                        nextLinkClassName={'page-link'}
                                        breakLabel={'...'}
                                        breakClassName={'blank'}
                                        breakLinkClassName={'page-link'}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={1}
                                        pageRangeDisplayed={2}
                                        forcePage={
                                            0
                                        }
                                        onPageChange={
                                            this.updatePageNumber
                                        }
                                        containerClassName={
                                            'pagination'
                                        }
                                        pageClassName={'page-item'}
                                        pageLinkClassName={'page-link'}
                                        activeClassName={'active'}
                                    />
                                </div>
                            </div>
                            <div className="table-responsive table-responsive-data2">
                                <table className="table table-data2">
                                    <thead>
                                    <tr>
                                        <th>Created</th>
                                        <th>Id</th>
                                        <th>Status</th>
                                        <th>amount</th>
                                        <th>User Id</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cashoutList}
                                    </tbody>
                                </table>
                            </div>
                        </React.Fragment>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Cashouts;