import React from 'react';
import { createProgram, DEFAULT_PROGRAM, getPrograms, ProgramDto } from '../../rest/ProgramService';
import ProgramElement from './ProgramElement';
import FadeLoader from 'react-spinners/FadeLoader';
import { emptyHrefLink, linkStyle, spinnerCss } from '../../Helper';
import { Button, TextField } from "@material-ui/core";
import ReactPaginate from 'react-paginate';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Modal from '../modal';

interface ProgramsProps {
}

interface ProgramsState {
    isLoading: boolean,
    programs: ProgramDto[],
    currentPage: number,
    defaultProgramList: ProgramDto[],
    sort: SortType,
    sortOrder: boolean, // asc -> true, desc -> false
    filterType: FilterType,
    modalVisible: boolean,
    createProgram: ProgramDto
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
            filterType: FilterType.EMPTY,
            modalVisible: false,
            createProgram: {...DEFAULT_PROGRAM}
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
            alert(error);
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

    openModal() {
        this.setState({
            modalVisible: true
        });
    }

    closeModal() {
        this.setState({
            modalVisible: false
        });
    }

    async onModalSave() {
        try {
            if (this.state.createProgram) {
                let response = await createProgram(this.state.createProgram);
                if (response) {
                    alert("Program successfully created");
                    window.location.reload();
                } else {
                    alert("Something went wrong with update");
                }
            } else {
                alert("Nothing to update")
            }
        } catch (e) {
            alert(e);
        }
    }

    public render() {
        let programsList;
        let pageCount = 0;
        if (this.state.programs && this.state.programs.length > 0) {
            programsList = this.state.programs
                .filter(value => {
                    switch (this.state.filterType) {
                        case FilterType.DSCT_VARIABLE:
                            if (value.defaultSaleCommissionType) {
                                return value.defaultSaleCommissionType.includes("variable");
                            }
                            return false;
                        default:
                            return true;
                    }
                })
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
                        <Modal
                            visible={this.state.modalVisible}
                            onClose={() => this.closeModal()}
                            title="Create program"
                            onSave={() => this.onModalSave()}
                        >
                            {this.state.modalVisible &&
                            <React.Fragment>
                                <TextField id="name" label={"Name"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createProgram.name}
                                           onChange={(event) => {
                                               let program = this.state.createProgram;
                                               program.name = event.target.value;
                                               this.setState({
                                                   createProgram: program
                                               })
                                           }}
                                />
                                <TextField id="category" label={"Category"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createProgram.category}
                                           onChange={(event) => {
                                               let program = this.state.createProgram;
                                               program.category = event.target.value;
                                               this.setState({
                                                   createProgram: program
                                               })
                                           }}
                                />
                                <TextField id="status" label={"Status"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createProgram.status}
                                           onChange={(event) => {
                                               let program = this.state.createProgram;
                                               program.status = event.target.value;
                                               this.setState({
                                                   createProgram: program
                                               })
                                           }}
                                />
                                <TextField id="logoPath" label={"Logo Path"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createProgram.logoPath}
                                           onChange={(event) => {
                                               let program = this.state.createProgram;
                                               program.logoPath = event.target.value;
                                               this.setState({
                                                   createProgram: program
                                               })
                                           }}
                                />
                                <TextField id="mainUrl" label={"Main Url"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createProgram.mainUrl}
                                           onChange={(event) => {
                                               let program = this.state.createProgram;
                                               program.mainUrl = event.target.value;
                                               this.setState({
                                                   createProgram: program
                                               })
                                           }}
                                />
                                <TextField id="source" label={"Source"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createProgram.source}
                                           onChange={(event) => {
                                               let program = this.state.createProgram;
                                               program.source = event.target.value;
                                               this.setState({
                                                   createProgram: program
                                               })
                                           }}
                                />
                                <TextField id="order" label={"Order"} variant="filled" style={{width: '100%'}}
                                           type="number"
                                           value={this.state.createProgram.order}
                                           onChange={(event) => {
                                               let program = this.state.createProgram;
                                               program.order = parseInt(event.target.value);
                                               this.setState({
                                                   createProgram: program
                                               })
                                           }}
                                />
                                <TextField id="defaultLeadCommissionAmount" label={"Default Lead Commission Amount"}
                                           variant="filled" style={{width: '100%'}}
                                           value={this.state.createProgram.defaultLeadCommissionAmount}
                                           onChange={(event) => {
                                               let program = this.state.createProgram;
                                               program.defaultLeadCommissionAmount = event.target.value;
                                               this.setState({
                                                   createProgram: program
                                               })
                                           }}
                                />
                                <TextField id="defaultLeadCommissionType" label={"Default Lead Commission Type"}
                                           variant="filled" style={{width: '100%'}}
                                           value={this.state.createProgram.defaultLeadCommissionType}
                                           onChange={(event) => {
                                               let program = this.state.createProgram;
                                               program.defaultLeadCommissionType = event.target.value;
                                               this.setState({
                                                   createProgram: program
                                               })
                                           }}
                                />
                                <TextField id="defaultSaleCommissionRate" label={"Default Sale Commission Rate"}
                                           variant="filled" style={{width: '100%'}}
                                           value={this.state.createProgram.defaultSaleCommissionRate}
                                           onChange={(event) => {
                                               let program = this.state.createProgram;
                                               program.defaultSaleCommissionRate = event.target.value;
                                               this.setState({
                                                   createProgram: program
                                               })
                                           }}
                                />
                                <TextField id="defaultSaleCommissionType" label={"Default Sale Commission Type"}
                                           variant="filled" style={{width: '100%'}}
                                           value={this.state.createProgram.defaultSaleCommissionType}
                                           onChange={(event) => {
                                               let program = this.state.createProgram;
                                               program.defaultSaleCommissionType = event.target.value;
                                               this.setState({
                                                   createProgram: program
                                               })
                                           }}
                                />
                            </React.Fragment>
                            }
                        </Modal>
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
                                        <button className="au-btn au-btn-icon au-btn--green au-btn--small"
                                                onClick={() => this.openModal()}>
                                            <i className="zmdi zmdi-plus"/>
                                            add program
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
