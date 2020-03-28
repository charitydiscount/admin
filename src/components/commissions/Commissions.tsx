import React from "react";
import CommissionsElement from "./CommissionElement";
import {
    CommissionCreateDto,
    CommissionDto,
    createCommission,
    DEFAULT_COMMISSION,
    getCommissions
} from "../../rest/CommissionService";
import FadeLoader from 'react-spinners/FadeLoader';
import { emptyHrefLink, linkStyle, mediumSpinnerCss, SourceTypes, spinnerCss } from "../../Helper";
import ReactPaginate from 'react-paginate';
import { Button, TextField } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getAllUsers } from "../../rest/UserService";
import {
    getExternalPrograms,
    ProgramDto
} from "../../rest/ProgramService";
import Modal from '../modal';

interface CommissionsProps {

}

interface CommissionsState {
    isLoading: boolean,
    commissions: CommissionDto[],
    defaultCommissionsList: CommissionDto[],
    externalPrograms: ProgramDto[],
    currentPage: number,
    filterType: FilterType,
    users: Map<string, string>,
    sortOrder: boolean,
    modalVisible: boolean,
    isLoadingCreate: boolean
    createCommission: CommissionCreateDto,
    createCommissionUserId: string,
    sort: SortType
}

enum FilterType {
    STATUS_PAID = 'paid',
    STATUS_ACCEPTED = 'accepted',
    STATUS_REJECTED = 'rejected',
    STATUS_PENDING = 'pending',
    EXTERNAL = 'external',
    EMPTY = ''
}


enum SortType {
    AMOUNT = 'amount',
    EMPTY = ''
}

const pageLimit = 8; // commissions per page

class Commissions extends React.Component<CommissionsProps, CommissionsState> {

    private search: string = '';

    constructor(props: Readonly<CommissionsProps>) {
        super(props);
        this.state = {
            isLoading: true,
            commissions: [],
            defaultCommissionsList: [],
            currentPage: 0,
            externalPrograms: [],
            filterType: FilterType.EMPTY,
            users: new Map<string, string>(),
            modalVisible: false,
            sortOrder: true,
            isLoadingCreate: false,
            createCommission: {...DEFAULT_COMMISSION},
            createCommissionUserId: '',
            sort: SortType.EMPTY
        };
        this.searchCommissions = this.searchCommissions.bind(this);
        this.enterSearch = this.enterSearch.bind(this);
        this.updatePageNumber = this.updatePageNumber.bind(this);
        this.filter = this.filter.bind(this);
    }


    async componentDidMount() {
        document.addEventListener('keydown', this.enterSearch, false);

        try {
            let response = await getCommissions();
            if (response) {
                this.setState({
                    commissions: response as CommissionDto[],
                    defaultCommissionsList: response as CommissionDto[],
                    isLoading: false
                });
            }
        } catch (error) {
            alert(error);
        }

        try {
            let response = await getExternalPrograms();
            if (response) {
                this.setState({
                    externalPrograms: response,
                });
            }
        } catch (error) {
            alert(error);
            //programs not loaded
        }

        try {
            let response = await getAllUsers();
            if (response) {
                this.setState({
                    users: response as Map<string, string>,
                });
            }
        } catch (error) {
            alert(error);
            //users not loaded
        }
    }

    enterSearch(event) {
        if (event.keyCode === 13) {
            this.searchCommissions();
        }
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

    searchCommissions() {
        if (this.search) {
            let resultedPrograms = this.state.defaultCommissionsList
                .filter(value => value.commissionId.startsWith(this.search) || value.userId.startsWith(this.search));
            this.setState({
                commissions: resultedPrograms
            })
        } else {
            this.setState({
                commissions: this.state.defaultCommissionsList
            })
        }
    }

    filter(event) {
        event.preventDefault();
        let filterType;
        switch (event.target.value) {
            case FilterType.STATUS_PAID.toString():
                filterType = FilterType.STATUS_PAID;
                break;
            case FilterType.STATUS_ACCEPTED.toString():
                filterType = FilterType.STATUS_ACCEPTED;
                break;
            case FilterType.STATUS_REJECTED.toString():
                filterType = FilterType.STATUS_REJECTED;
                break;
            case FilterType.STATUS_PENDING.toString():
                filterType = FilterType.STATUS_PENDING;
                break;
            case FilterType.EXTERNAL.toString():
                filterType = FilterType.EXTERNAL;
                break;
            default:
                filterType = FilterType.EMPTY;

        }
        this.setState({
            filterType: filterType
        });
    }

    updatePageNumber(data) {
        this.setState({
            currentPage: data.selected
        });
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
        if (!this.state.isLoadingCreate) {
            try {
                this.setState({
                    isLoadingCreate: true
                });
                if (this.state.createCommission && this.state.createCommissionUserId) {
                    let response = await createCommission(this.state.createCommissionUserId, this.state.createCommission);
                    if (response) {
                        alert("Commission successfully created");
                        window.location.reload();
                    } else {
                        alert("Something went wrong with creation");
                    }
                } else {
                    alert("Nothing to update")
                }
                this.setState({
                    isLoadingCreate: false
                });
            } catch (e) {
                alert(e);
                this.setState({
                    isLoadingCreate: false
                });
            }
        }
    }


    public render() {
        let pageCount = 0;
        let commissionsList;
        if (this.state.commissions && this.state.commissions.length > 0) {
            commissionsList = this.state.commissions
                .filter(value => {
                    switch (this.state.filterType) {
                        case FilterType.STATUS_ACCEPTED:
                            if (value.details.status) {
                                return value.details.status.includes("accepted");
                            }
                            return false;
                        case FilterType.STATUS_PAID:
                            if (value.details.status) {
                                return value.details.status.includes("paid");
                            }
                            return false;
                        case FilterType.STATUS_PENDING:
                            if (value.details.status) {
                                return value.details.status.includes("pending");
                            }
                            return false;
                        case FilterType.STATUS_REJECTED:
                            if (value.details.status) {
                                return value.details.status.includes("rejected");
                            }
                            return false;
                        case FilterType.EXTERNAL:
                            if (value.details.source) {
                                return !value.details.source.includes(SourceTypes.TWO_PERFORMANT);
                            }
                            return false;
                        default:
                            return true;
                    }
                }).sort((a, b) => {
                    if (this.state.sort) {
                        switch (this.state.sort) {
                            case SortType.AMOUNT:
                                return this.state.sortOrder ? a.details.amount - b.details.amount : b.details.amount - a.details.amount;
                            default:
                                return 0;
                        }
                    } else {
                        return 0;
                    }
                });


            if (commissionsList.length > pageLimit) {
                pageCount = commissionsList.length / pageLimit;
                let offset = this.state.currentPage;
                commissionsList = commissionsList
                    .slice(offset * pageLimit, (offset + 1) * pageLimit);
            } else {
                pageCount = 1;
            }

            commissionsList = commissionsList
                .map((value, index) => {
                    let com = value as CommissionDto;
                    let externalCommission = false;
                    if (com.details.source !== SourceTypes.REFERRAL) {
                        this.state.externalPrograms.forEach((program) => {
                                if (program.id.toString().localeCompare(com.details.shopId) === 0
                                    || program.uniqueCode.toString().localeCompare(com.details.shopId) === 0) {
                                    externalCommission = true;
                                    return;
                                }
                            }
                        );
                    }
                    return (
                        <CommissionsElement key={index} commission={value}
                                            externalCommission={externalCommission}
                                            email={this.state.users.get((value as CommissionDto).userId)}/>
                    );
                });
        }

        let programsList;
        if (this.state.externalPrograms && this.state.externalPrograms.length > 0) {
            programsList = this.state.externalPrograms
                .map((value, index) => {
                    return (
                        <MenuItem key={index} value={value.id}> {value.name}</MenuItem>
                    );
                });
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">Commissions</h3>
                        <Modal
                            visible={this.state.modalVisible}
                            onClose={() => this.closeModal()}
                            title="Create commission"
                            onSave={() => this.onModalSave()}
                        >
                            <FadeLoader
                                loading={this.state.isLoadingCreate}
                                color={'#1641ff'}
                                css={mediumSpinnerCss}
                            />
                            {!this.state.isLoadingCreate &&
                            <React.Fragment>
                                <TextField id="userId" label={"User Id"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createCommissionUserId}
                                           onChange={(event) => {
                                               this.setState({
                                                   createCommissionUserId: event.target.value
                                               })
                                           }}
                                />
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
                                        value={this.state.createCommission.status}
                                        onChange={event => {
                                            let createCommission = this.state.createCommission;
                                            createCommission.status = event.target.value as string;
                                            this.setState({
                                                createCommission: createCommission
                                            })
                                        }}
                                    >
                                        <MenuItem value={"pending"}> Pending </MenuItem>
                                        <MenuItem value={"accepted"}> Accepted </MenuItem>
                                        <MenuItem value={"rejected"}> Rejected </MenuItem>
                                        <MenuItem value={"paid"}> Paid </MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField id="reason" label={"Reason"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createCommission.reason}
                                           onChange={(event) => {
                                               let createCommission = this.state.createCommission;
                                               createCommission.reason = event.target.value;
                                               this.setState({
                                                   createCommission: createCommission
                                               })
                                           }}
                                />
                                <TextField id="originalAmount" label={"Original Amount"} variant="filled"
                                           style={{width: '100%'}}
                                           type="number"
                                           inputProps={{
                                               min: 0,
                                               step: '0.1'
                                           }}
                                           value={this.state.createCommission.originalAmount}
                                           onChange={event => {
                                               let commission = this.state.createCommission;
                                               commission.originalAmount = parseFloat(event.target.value);
                                               this.setState({
                                                   createCommission: commission
                                               })
                                           }}
                                />
                                <TextField id="originId" label={"Origin Id"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createCommission.originId}
                                           onChange={(event) => {
                                               let commission = this.state.createCommission;
                                               commission.originId = event.target.value;
                                               this.setState({
                                                   createCommission: commission
                                               })
                                           }}
                                />
                                <TextField id="originalCurrency" label={"Original Currency"} variant="filled"
                                           style={{width: '100%'}}
                                           value={this.state.createCommission.originalCurrency}
                                           onChange={(event) => {
                                               let commission = this.state.createCommission;
                                               commission.originalCurrency = event.target.value;
                                               this.setState({
                                                   createCommission: commission
                                               })
                                           }}
                                />
                                <FormControl variant="filled" style={{width: '100%'}}>
                                    <InputLabel id="demo-simple-select-filled-label">Program</InputLabel>
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
                                        value={this.state.createCommission.shopId}
                                        onChange={event => {
                                            let createCommission = this.state.createCommission;
                                            createCommission.shopId = event.target.value as string;
                                            let extProgram = this.state.externalPrograms.find(value => value.id === createCommission.shopId);
                                            if (extProgram) {
                                                createCommission.program.name = extProgram.name;
                                                createCommission.program.logo = extProgram.logoPath;
                                                createCommission.program.status = extProgram.status;
                                                createCommission.source = extProgram.source;
                                            }
                                            this.setState({
                                                createCommission: createCommission
                                            })
                                        }}
                                    >
                                        {programsList}
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
                                            this.searchCommissions
                                        }
                                    >
                                        >
                                    </Button>
                                    <div className="rs-select2--light rs-select2--md">
                                        <TextField
                                            id="commisionVariable" label={"Search after userId or commissionId"}
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
                                                <MenuItem
                                                    value={FilterType.STATUS_ACCEPTED.toString()}>Accepted</MenuItem>
                                                <MenuItem
                                                    value={FilterType.STATUS_PAID.toString()}>Paid</MenuItem>
                                                <MenuItem
                                                    value={FilterType.STATUS_REJECTED.toString()}>Rejected</MenuItem>
                                                <MenuItem
                                                    value={FilterType.STATUS_PENDING.toString()}>Pending</MenuItem>
                                                <MenuItem
                                                    value={FilterType.EXTERNAL.toString()}>External</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="table-data__tool-right">
                                    <button className="au-btn au-btn-icon au-btn--green au-btn--small"
                                            onClick={() => this.openModal()}>
                                        <i className="zmdi zmdi-plus"/>
                                        add commission
                                    </button>
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
                                        <th>Commission Id</th>
                                        <th>Status</th>
                                        <th>
                                            <a href={emptyHrefLink}
                                               onClick={(event) => this.sort(event, SortType.AMOUNT)}
                                               style={linkStyle}>
                                                {this.state.sort && this.state.sort === SortType.AMOUNT && (
                                                    this.state.sortOrder ?
                                                        <i className="fa fa-arrow-up"/> :
                                                        <i className="fa fa-arrow-down"/>
                                                )}
                                                amount
                                            </a>
                                        </th>
                                        <th>Source</th>
                                        <th>User Id</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {commissionsList}
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

export default Commissions;