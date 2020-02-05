import React from 'react';
import { getPrograms, ProgramDto } from '../../rest/ProgramService';
import ProgramElement from './ProgramElement';
import FadeLoader from 'react-spinners/FadeLoader';
import { emptyHrefLink, linkStyle, spinnerCss } from '../../Helper';
import { Button, TextField } from "@material-ui/core";
import ReactPaginate from 'react-paginate';

interface ProgramsProps {
}

interface ProgramsState {
    isLoading: boolean;
    programs: ProgramDto[];
    currentPage: number;
    defaultProgramList: ProgramDto[];
    sort: SortType
    sortOrder: boolean // asc -> true, desc -> false
}

enum SortType {
    DLCA = 'dlca',
    DLCT = 'dlct',
    DSCR = 'dscr',
    DSCT = 'dsct',
    NAME = 'name',
    MAIN_ODER = 'mainOrder',
    EMPTY = ''
}

const pageLimit = 8; // programs per page

class Programs extends React.Component<ProgramsProps, ProgramsState> {

    private search: string = '';

    constructor(props: Readonly<ProgramsProps>) {
        super(props);
        this.state = {
            isLoading: true,
            programs: [],
            defaultProgramList: [],
            currentPage: 0,
            sort: SortType.EMPTY,
            sortOrder: true
        };
        this.searchPrograms = this.searchPrograms.bind(this);
        this.enterSearch = this.enterSearch.bind(this);
        this.updatePageNumber = this.updatePageNumber.bind(this);
        this.sort = this.sort.bind(this);
    }

    async componentDidMount() {
        document.addEventListener('keydown', this.enterSearch, false);
        try {
            let response = await getPrograms();
            if (response) {
                this.setState({
                    isLoading: false,
                    programs: response,
                    defaultProgramList: response,
                });
            }
        } catch (error) {
            //programs not loaded
        }
    }

    enterSearch(event) {
        if (event.keyCode === 13) {
            this.searchPrograms();
        }
    }

    updatePageNumber(data) {
        this.setState({
            currentPage: data.selected
        });
    }

    sort(event, sortType: SortType) {
        event.preventDefault();
        if (this.state.sortOrder) {
            this.setState({
                sortOrder: false,
                sort: sortType
            })
        } else {
            this.setState({
                sortOrder: true,
                sort: sortType
            })
        }
    }

    searchPrograms() {
        if (this.search) {
            let resultedPrograms = this.state.defaultProgramList.filter(value => value.name.startsWith(this.search) || value.uniqueCode.startsWith(this.search));
            this.setState({
                programs: resultedPrograms
            })
        } else {
            this.setState({
                programs: this.state.defaultProgramList
            })
        }

    }

    public render() {
        let programsList;
        let pageCount = 0;
        if (this.state.programs && this.state.programs.length > 0) {
            programsList = this.state.programs
                .sort((a, b) => {
                    if (this.state.sort) {
                        let va,vb;
                        switch (this.state.sort) {
                            case SortType.NAME:
                                if (a.name < b.name) {
                                    return this.state.sortOrder ? 1 : -1;
                                } else {
                                    return this.state.sortOrder ? -1 : 1;
                                }
                            case SortType.MAIN_ODER:
                                va = (a.mainOrder === null) ? "" : "" + a.mainOrder;
                                vb = (b.mainOrder === null) ? "" : "" + b.mainOrder;

                                if (va < vb) {
                                    return this.state.sortOrder ? 1 : -1;
                                } else {
                                    return this.state.sortOrder ? -1 : 1;
                                }
                            case SortType.DLCA:
                                va = (a.defaultLeadCommissionAmount === null) ? "" : "" + a.defaultLeadCommissionAmount;
                                vb = (b.defaultLeadCommissionAmount === null) ? "" : "" + b.defaultLeadCommissionAmount;

                                if (va < vb) {
                                    return this.state.sortOrder ? 1 : -1;
                                } else {
                                    return this.state.sortOrder ? -1 : 1;
                                }
                            case SortType.DLCT:
                                va = (a.defaultLeadCommissionType === null) ? "" : "" + a.defaultLeadCommissionType;
                                vb = (b.defaultLeadCommissionType === null) ? "" : "" + b.defaultLeadCommissionType;

                                if (va < vb) {
                                    return this.state.sortOrder ? 1 : -1;
                                } else {
                                    return this.state.sortOrder ? -1 : 1;
                                }
                            case SortType.DSCR:
                                va = (a.defaultSaleCommissionRate === null) ? "" : "" + a.defaultSaleCommissionRate;
                                vb = (b.defaultSaleCommissionRate === null) ? "" : "" + b.defaultSaleCommissionRate;

                                if (va < vb) {
                                    return this.state.sortOrder ? 1 : -1;
                                } else {
                                    return this.state.sortOrder ? -1 : 1;
                                }
                            case SortType.DSCT:
                                va = (a.defaultSaleCommissionType === null) ? "" : "" + a.defaultSaleCommissionType;
                                vb = (b.defaultSaleCommissionType === null) ? "" : "" + b.defaultSaleCommissionType;

                                if (va < vb) {
                                    return this.state.sortOrder ? 1 : -1;
                                } else {
                                    return this.state.sortOrder ? -1 : 1;
                                }
                            default:
                                return 0;
                        }
                    } else {
                        return 0;
                    }
                });


            if (programsList.length > pageLimit) {
                pageCount = this.state.programs.length / pageLimit;
                let offset = this.state.currentPage;
                programsList = programsList
                    .slice(offset * pageLimit, (offset + 1) * pageLimit);
            } else {
                pageCount = 1;
            }

            programsList = programsList
                .map((value, index) => {
                    return (
                        <ProgramElement key={index} program={value}/>
                    );
                });
        }
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">programs</h3>
                        <FadeLoader
                            loading={this.state.isLoading}
                            color={'#1641ff'}
                            css={spinnerCss}
                        />
                        {!this.state.isLoading && (
                            <React.Fragment>
                                <div className="table-data__tool">
                                    <div className="table-data__tool-left">
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            style={{marginTop: 25}}
                                            size={"large"}
                                            onClick={
                                                this.searchPrograms
                                            }
                                        >
                                            >
                                        </Button>
                                        <div className="rs-select2--light rs-select2--md">
                                            <TextField
                                                id="commisionVariable" label={"Search after name or uniqueCode"}
                                                style={{width: '100%', marginLeft: 8}}
                                                onChange={event => this.search = event.target.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="table-data__tool-right">
                                        <button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                            <i className="zmdi zmdi-plus"></i>
                                            add item
                                        </button>
                                        <div>
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
                                </div>
                                <div className="table-responsive table-responsive-data2">
                                    <table className="table table-data2">
                                        <thead>
                                        <tr>
                                            <th>uniqueCode</th>
                                            <th>
                                                <a href={emptyHrefLink}
                                                   onClick={(event) => this.sort(event, SortType.NAME)}
                                                   style={linkStyle}>
                                                    {this.state.sort && this.state.sort === SortType.NAME && (
                                                        this.state.sortOrder ?
                                                            <i className="fa fa-arrow-up"/> :
                                                            <i className="fa fa-arrow-down"/>
                                                    )}
                                                    name
                                                </a>
                                            </th>
                                            <th>order</th>
                                            <th>
                                                <a href={emptyHrefLink}
                                                   onClick={(event) => this.sort(event, SortType.MAIN_ODER)}
                                                   style={linkStyle}>
                                                    {this.state.sort && this.state.sort === SortType.MAIN_ODER && (
                                                        this.state.sortOrder ?
                                                            <i className="fa fa-arrow-up"/> :
                                                            <i className="fa fa-arrow-down"/>
                                                    )} main order
                                                </a></th>
                                            <th>interval</th>
                                            <th>
                                                <a href={emptyHrefLink}
                                                   onClick={(event) => this.sort(event, SortType.DLCA)}
                                                   style={linkStyle}>
                                                    {this.state.sort && this.state.sort === SortType.DLCA && (
                                                        this.state.sortOrder ?
                                                            <i className="fa fa-arrow-up"/> :
                                                            <i className="fa fa-arrow-down"/>
                                                    )} dlca
                                                </a>
                                            </th>
                                            <th>
                                                <a href={emptyHrefLink}
                                                   onClick={(event) => this.sort(event, SortType.DLCT)}
                                                   style={linkStyle}>
                                                    {this.state.sort && this.state.sort === SortType.DLCT && (
                                                        this.state.sortOrder ?
                                                            <i className="fa fa-arrow-up"/> :
                                                            <i className="fa fa-arrow-down"/>
                                                    )} dlct
                                                </a>
                                            </th>
                                            <th>
                                                <a href={emptyHrefLink}
                                                   onClick={(event) => this.sort(event, SortType.DSCR)}
                                                   style={linkStyle}>
                                                    {this.state.sort && this.state.sort === SortType.DSCR && (
                                                        this.state.sortOrder ?
                                                            <i className="fa fa-arrow-up"/> :
                                                            <i className="fa fa-arrow-down"/>
                                                    )} dscr
                                                </a>
                                            </th>
                                            <th>
                                                <a href={emptyHrefLink}
                                                   onClick={(event) => this.sort(event, SortType.DSCT)}
                                                   style={linkStyle}>
                                                    {this.state.sort && this.state.sort === SortType.DSCT && (
                                                        this.state.sortOrder ?
                                                            <i className="fa fa-arrow-up"/> :
                                                            <i className="fa fa-arrow-down"/>
                                                    )} dsct
                                                </a>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>{programsList}</tbody>
                                    </table>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Programs;
