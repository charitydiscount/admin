import React from "react";
import FadeLoader from 'react-spinners/FadeLoader';
import { blueColor, mediumSpinnerCss, pageLimit, spinnerCss } from "../../Helper";
import ReactPaginate from 'react-paginate';
import { Button, TextField } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Modal from '../modal';
import { ClickCreateDto, ClickDto, createClick, DEFAULT_CLICK, getClicks } from "../../rest/ClicksService";
import ClickElement from "./ClickElement";

interface ClicksProps{

}

interface ClicksState {
    modalVisible: boolean
    isLoadingCreate: boolean
    isLoading: boolean
    filterType: ClickType,
    clicks: ClickDto[],
    defaultClicksList: ClickDto[],
    currentPage: number,
    createClick: ClickCreateDto,
}


enum ClickType{
    ANDROID = 'android',
    IOS = 'ios',
    DESKTOP = 'desktop',
    EMPTY = ''
}

class Clicks extends React.Component<ClicksProps, ClicksState> {

    private search: string = '';

    constructor(props: Readonly<ClicksProps>) {
        super(props);
        this.state = {
            modalVisible: false,
            isLoadingCreate: false,
            isLoading: true,
            currentPage: 0,
            filterType: ClickType.EMPTY,
            clicks: [],
            defaultClicksList: [],
            createClick: DEFAULT_CLICK
        };
    }

    async componentDidMount() {
        document.addEventListener('keydown', this.enterSearch, false);

        try {
            let responseClicks = await getClicks();
            if (responseClicks) {
                this.setState({
                    clicks: responseClicks as ClickDto[],
                    defaultClicksList: responseClicks as ClickDto[],
                    isLoading: false
                });
            }
        } catch (error) {
            alert(error);
        }
    }

    enterSearch = (event) => {
        if (event.keyCode === 13) {
            this.searchClicks();
        }
    };

    updatePageNumber = (data) => {
        this.setState({
            currentPage: data.selected
        });
    };

    filter = (event) => {
        event.preventDefault();
        let filterType;
        switch (event.target.value) {
            case ClickType.ANDROID.toString():
                filterType = ClickType.ANDROID;
                break;
            case ClickType.IOS.toString():
                filterType = ClickType.IOS;
                break;
            case ClickType.DESKTOP.toString():
                filterType = ClickType.DESKTOP;
                break;
            default:
                filterType = ClickType.EMPTY;

        }
        this.setState({
            filterType: filterType
        });
    };

    searchClicks = () => {
        if (this.search) {
            let resultedClicks = this.state.defaultClicksList
                .filter(value => value.id.startsWith(this.search) || value.userId.startsWith(this.search));
            this.setState({
                clicks: resultedClicks
            })
        } else {
            this.setState({
                clicks: this.state.defaultClicksList
            })
        }
    };

    openModal = () => {
        this.setState({
            modalVisible: true
        });
    };

    closeModal = () => {
        this.setState({
            modalVisible: false
        });
    };

    onModalSave = async () => {
        if (!this.state.isLoadingCreate) {
            try {
                this.setState({
                    isLoadingCreate: true
                });

                let response = await createClick(this.state.createClick);
                if (response) {
                    alert("Click successfully created");
                    window.location.reload();
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
    };

    public render() {
        let pageCount = 0;
        let clicksList;
        if (this.state.clicks && this.state.clicks.length > 0) {
            clicksList = this.state.clicks
                .filter(value => {
                    switch (this.state.filterType) {
                        case ClickType.ANDROID:
                            if (value.deviceType) {
                                return value.deviceType.includes("android");
                            }
                            return false;
                        case ClickType.IOS:
                            if (value.deviceType) {
                                return value.deviceType.includes("ios");
                            }
                            return false;
                        case ClickType.DESKTOP:
                            if (value.deviceType) {
                                return !value.deviceType.includes("ios") && !value.deviceType.includes("android");
                            }
                            return false;
                        default:
                            return true;
                    }
                });


            if (clicksList.length > pageLimit) {
                pageCount = clicksList.length / pageLimit;
                let offset = this.state.currentPage;
                clicksList = clicksList
                    .slice(offset * pageLimit, (offset + 1) * pageLimit);
            } else {
                pageCount = 1;
            }

            clicksList = clicksList
                .map((value, index) => {
                    return (
                        <ClickElement key={index} click={value}/>
                    );
                });
        }


        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">Clicks</h3>
                        <Modal
                            visible={this.state.modalVisible}
                            onClose={() => this.closeModal()}
                            title="Create click"
                            onSave={() => this.onModalSave()}
                        >
                            <FadeLoader
                                loading={this.state.isLoadingCreate}
                                color={blueColor}
                                css={mediumSpinnerCss}
                            />
                            {!this.state.isLoadingCreate &&
                            <React.Fragment>
                                <TextField id="userId" label={"User Id"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createClick.userId}
                                           onChange={(event) => {
                                               let createClick = this.state.createClick;
                                               createClick.userId = event.target.value;
                                               this.setState({
                                                   createClick: createClick
                                               })
                                           }}
                                />
                                <TextField id="ipAddress" label={"Ip Address"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createClick.ipAddress}
                                           onChange={(event) => {
                                               let createClick = this.state.createClick;
                                               createClick.ipAddress = event.target.value;
                                               this.setState({
                                                   createClick: createClick
                                               })
                                           }}
                                />
                                <TextField id="ipv6Address" label={"Ipv6 Address"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createClick.ipv6Address}
                                           onChange={(event) => {
                                               let createClick = this.state.createClick;
                                               createClick.ipv6Address = event.target.value;
                                               this.setState({
                                                   createClick: createClick
                                               })
                                           }}
                                />
                                <TextField id="programId" label={"Program Id"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createClick.programId}
                                           onChange={(event) => {
                                               let createClick = this.state.createClick;
                                               createClick.programId = event.target.value;
                                               this.setState({
                                                   createClick: createClick
                                               })
                                           }}
                                />
                                <TextField id="deviceType" label={"DeviceType(IOS,ANDROID,BROWSER)"} variant="filled" style={{width: '100%'}}
                                           value={this.state.createClick.deviceType}
                                           onChange={(event) => {
                                               let createClick = this.state.createClick;
                                               createClick.deviceType = event.target.value;
                                               this.setState({
                                                   createClick: createClick
                                               })
                                           }}
                                />
                            </React.Fragment>
                            }
                        </Modal>
                        <FadeLoader
                            loading={this.state.isLoading}
                            color={blueColor}
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
                                            this.searchClicks
                                        }
                                    >
                                        {'>'}
                                    </Button>
                                    <div className="rs-select2--light rs-select2--md">
                                        <TextField
                                            id="commisionVariable" label={"Search after userId or clickId"}
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
                                                    value={ClickType.ANDROID.toString()}>Android</MenuItem>
                                                <MenuItem
                                                    value={ClickType.IOS.toString()}>IOS</MenuItem>
                                                <MenuItem
                                                    value={ClickType.DESKTOP.toString()}>Desktop</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="table-data__tool-right">
                                    <button className="au-btn au-btn-icon au-btn--green au-btn--small"
                                            onClick={() => this.openModal()}>
                                        <i className="zmdi zmdi-plus"/>
                                        add click
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
                                        <th>Click Id</th>
                                        <th>Ip</th>
                                        <th>Device</th>
                                        <th>Program Id</th>
                                        <th>User Id</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                       {clicksList}
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

export default Clicks;