import React from 'react';
import { getPrograms, ProgramDto } from '../../rest/ProgramService';
import ProgramElement from './ProgramElement';
import FadeLoader from 'react-spinners/FadeLoader';
import { emptyHrefLink, linkStyle, spinnerCss } from '../../Helper';
import { Button, TextField } from "@material-ui/core";
import ReactPaginate from 'react-paginate';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface ProgramsProps {
}

interface ProgramsState {
    isLoading: boolean,
    programs: ProgramDto[],
    currentPage: number,
    defaultProgramList: ProgramDto[],
    sort: SortType,
    sortOrder: boolean, // asc -> true, desc -> false
    filterType: FilterType
}

enum SortType {
    NAME = 'name',
    EMPTY = ''
}

enum FilterType {
    DSCT_VARIABLE = 'dsctVariable',
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
            sortOrder: true,
            filterType: FilterType.EMPTY
        };
        this.searchPrograms = this.searchPrograms.bind(this);
        this.enterSearch = this.enterSearch.bind(this);
        this.updatePageNumber = this.updatePageNumber.bind(this);
        this.sort = this.sort.bind(this);
        this.filter = this.filter.bind(this);
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

    filter(event) {
        event.preventDefault();
        if (event.target.value === 'dsctVariable') {
            this.setState({
                filterType: FilterType.DSCT_VARIABLE
            });
        } else {
            this.setState({
                filterType: FilterType.EMPTY
            });
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
                        switch (this.state.sort) {
                            case SortType.NAME:
                                if (a.name < b.name) {
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
                }).filter(value => {
                    switch (this.state.filterType) {
                        case FilterType.DSCT_VARIABLE:
                            if (value.defaultSaleCommissionType) {
                                return value.defaultSaleCommissionType.includes("variable");
                            }
                            return false;
                        default:
                            return true;
                    }
                });


            if (programsList.length > pageLimit) {
                pageCount = programsList.length / pageLimit;
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
                                        <div className="rs-select2--light rs-select2--md">
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-filled-label">
                                                    Filters
                                                </InputLabel>
                                                <Select
                                                    MenuProps={{
                                                        disableScrollLock: true,
                                                        getContentAnchorEl: null,
                                                        anchorOrigin: {
                                                            vertical: 'bottom',
                                                            horizontal: 'left',
                                                        },
                                                    }}
                                                    labelId="demo-simple-select-filled-label"
                                                    id="demo-simple-select-filled"
                                                    value={this.state.filterType}
                                                    onChange={this.filter}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    <MenuItem value={"dsctVariable"}>DSCT - Variable</MenuItem>
                                                </Select>
                                            </FormControl>
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
                                                main order
                                            </th>
                                            <th>interval</th>
                                            <th>
                                                dlca
                                            </th>
                                            <th>
                                                dlct
                                            </th>
                                            <th>
                                                dscr
                                            </th>
                                            <th>
                                                dsct
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
