import React from 'react';
import { createProgram, DEFAULT_PROGRAM, getPrograms, ProgramDto } from '../../rest/ProgramService';
import ProgramElement from './ProgramElement';
import FadeLoader from 'react-spinners/FadeLoader';
import { emptyHrefLink, linkStyle, SourceTypes, spinnerCss } from '../../Helper';
import { Button, TextField } from "@material-ui/core";
import ReactPaginate from 'react-paginate';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Modal from '../modal';
import { CategoryDto, getCategories } from "../../rest/CategoriesService";

interface ProgramsProps {
}

interface ProgramsState {
    isLoading: boolean,
    programs: ProgramDto[],
    categories: CategoryDto[]
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
    SOURCE_EXTERNAL = 'sourceExternal',
    INACTIVE = 'inactive',
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
            categories: [],
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
        try {
            let response = await getCategories();
            if (response) {
                this.setState({
                    categories: response
                });
            }
        } catch (error) {
            alert(error);
            //categories not loaded
        }
    }

    enterSearch(event) {
        if (event.keyCode === 13) {
            this.searchPrograms();
        }
    }

    filter(event) {
        event.preventDefault();
        this.setState({
            filterType: event.target.value
        });
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
                        case FilterType.SOURCE_EXTERNAL:
                            return !value.source.includes(SourceTypes.TWO_PERFORMANT.toString());
                        case FilterType.INACTIVE:
                            return value.status.includes("inactive");
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
                        <ProgramElement key={index} program={value} categories={this.state.categories}/>
                    );
                });
        }
        let categories;
        if (this.state.categories && this.state.categories.length > 0) {
            categories = this.state.categories.map((value) => {
                return (
                    <MenuItem value={value.category}> {value.category} </MenuItem>
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
                                <FormControl variant="filled" style={{width: '100%'}}>
                                    <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
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
                                        value={this.state.createProgram.category}
                                        onChange={(event) => {
                                            let program = this.state.createProgram;
                                            program.category = event.target.value as string;
                                            this.setState({
                                                createProgram: program
                                            })
                                        }}
                                    >
                                        {categories}
                                    </Select>
                                </FormControl>
                                <FormControl variant="filled" style={{width: '100%'}}>
                                    <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
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
                                        value={this.state.createProgram.status}
                                        onChange={event => {
                                            let program = this.state.createProgram;
                                            program.status = event.target.value as string;
                                            this.setState({
                                                createProgram: program
                                            })
                                        }}
                                    >
                                        <MenuItem value={"active"}> Active </MenuItem>
                                        <MenuItem value={"inactive"}> Inactive </MenuItem>
                                    </Select>
                                </FormControl>
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
                                <TextField id="mainUrl" label={"Website"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createProgram.mainUrl}
                                           onChange={(event) => {
                                               let program = this.state.createProgram;
                                               program.mainUrl = event.target.value;
                                               this.setState({
                                                   createProgram: program
                                               })
                                           }}
                                />
                                <TextField
                                    id="affiliateUrl" label={"Affiliate Link (use '{userId}' as a placeholder for the user)"} variant="filled"
                                    style={{width: '100%'}} value={this.state.createProgram.affiliateUrl}
                                    onChange={event => {
                                        const program = this.state.createProgram;
                                        program.affiliateUrl = event.target.value;
                                        this.setState({
                                            createProgram: program
                                        })
                                    }
                                    }
                                />
                                <TextField
                                    id="averagePaymentTime" label={"Average Payment Time"} variant="filled" type="number"
                                    style={{width: '100%'}} value={this.state.createProgram.averagePaymentTime}
                                    onChange={event => {
                                        let program = this.state.createProgram;
                                        program.averagePaymentTime = parseInt(event.target.value);
                                        this.setState({
                                            createProgram: program
                                        })
                                    }
                                    }
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
                                           type="number"
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
                                <FormControl variant="filled" style={{width: '100%'}}>
                                    <InputLabel id="demo-simple-select-filled-label">Default Lead Commission
                                        Type</InputLabel>
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
                                        value={this.state.createProgram.defaultLeadCommissionType}
                                        onChange={event => {
                                            let program = this.state.createProgram;
                                            program.defaultLeadCommissionType = event.target.value as string;
                                            this.setState({
                                                createProgram: program
                                            })
                                        }}
                                    >
                                        <MenuItem value={""}> None </MenuItem>
                                        <MenuItem value={"variable"}> Variable </MenuItem>
                                        <MenuItem value={"fixed"}> Fixed </MenuItem>
                                        <MenuItem value={"percent"}> Percent </MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField id="defaultSaleCommissionRate" label={"Default Sale Commission Rate"}
                                           type="number"
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
                                <FormControl variant="filled" style={{width: '100%'}}>
                                    <InputLabel id="demo-simple-select-filled-label">Default Sale Commission
                                        Type</InputLabel>
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
                                        value={this.state.createProgram.defaultSaleCommissionType}
                                        onChange={event => {
                                            let program = this.state.createProgram;
                                            program.defaultSaleCommissionType = event.target.value as string;
                                            this.setState({
                                                createProgram: program
                                            })
                                        }}
                                    >
                                        <MenuItem value={""}> None </MenuItem>
                                        <MenuItem value={"variable"}> Variable </MenuItem>
                                        <MenuItem value={"fixed"}> Fixed </MenuItem>
                                        <MenuItem value={"percent"}> Percent </MenuItem>
                                    </Select>
                                </FormControl>
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
                                            {'>'}
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
                                                    <MenuItem value={FilterType.DSCT_VARIABLE}>DSCT -
                                                        Variable
                                                    </MenuItem>
                                                    <MenuItem value={FilterType.SOURCE_EXTERNAL}>Source
                                                        external
                                                    </MenuItem>
                                                    <MenuItem value={FilterType.INACTIVE}>
                                                        Inactive
                                                    </MenuItem>
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
                                            <th>% min</th>
                                            <th>% max</th>
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
