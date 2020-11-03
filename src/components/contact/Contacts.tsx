import React from "react";
import { pageLimit, spinnerCss } from "../../Helper";
import FadeLoader from 'react-spinners/FadeLoader';

import ReactPaginate from 'react-paginate';
import ContactElement from "./ContactElement";
import { getMessages, MessageDto } from "../../rest/ContactsService";

export interface ContactsProps {

}

export interface ContactsState {
    messages: MessageDto[],
    isLoading: boolean,
    currentPage: number
}

class Contacts extends React.Component<ContactsProps, ContactsState> {

    private search: string = '';

    constructor(props: Readonly<ContactsProps>) {
        super(props);
        this.state = {
            isLoading: true,
            currentPage: 0,
            messages: []
        };
        this.updatePageNumber = this.updatePageNumber.bind(this);
    }

    updatePageNumber(data) {
        this.setState({
            currentPage: data.selected
        });
    }


    async componentDidMount() {

        try {
            let response = await getMessages();
            if (response) {
                this.setState({
                    isLoading: false,
                    messages: response as MessageDto[]
                });
            }
        } catch (error) {
            alert(error);
        }

    }

    render(): React.ReactNode {
        let pageCount = 0;
        let contactsList;
        if (this.state.messages && this.state.messages.length > 0) {
            contactsList = this.state.messages;

            if (contactsList.length > pageLimit) {
                pageCount = contactsList.length / pageLimit;
                let offset = this.state.currentPage;
                contactsList = contactsList
                    .slice(offset * pageLimit, (offset + 1) * pageLimit);
            } else {
                pageCount = 1;
            }

            contactsList = contactsList
                .map((value, index) => {
                    return (
                        <ContactElement key={index} message={value}/>
                    );
                });
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">Messages</h3>
                        <FadeLoader
                            loading={this.state.isLoading}
                            color={'#1641ff'}
                            css={spinnerCss}
                        />
                        {!this.state.isLoading &&
                        <React.Fragment>
                            <div className="table-data__tool">
                                <div className="table-data__tool-left">

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
                                        <th>created</th>
                                        <th>status</th>
                                        <th>email</th>
                                        <th>name</th>
                                        <th>user Id</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {contactsList}
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

export default Contacts;