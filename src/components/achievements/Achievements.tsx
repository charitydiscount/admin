import React from "react";
import { spinnerCss } from "../../Helper";
import { FadeLoader } from "react-spinners";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import ReactPaginate from 'react-paginate';
import { AppState } from "../../redux/reducer/RootReducer";
import { connect } from "react-redux";
import { setAchievementModalVisible } from "../../redux/actions/AchievementActions";
import AchievementModal from "./AchievementModal";

interface AchievementsProps {

    //global state
    achievementModalVisible: boolean,
    setAchievementModalVisible: (modalVisible) => void
}

interface AchievementsState {
    isLoading: boolean,
    currentPage: number
    filterType: string
}

class Achievements extends React.Component<AchievementsProps, AchievementsState> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            currentPage: 0,
            filterType: ''
        }
    }

    openModal = () => {
        this.props.setAchievementModalVisible(true);
    };

    updatePageNumber = (data) => {
        this.setState({
            currentPage: data.selected
        });
    };

    filter = () => {

    };

    public render() {
        let pageCount = 0;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">Achievements</h3>
                        <AchievementModal title={"Create achievement"}/>
                        <FadeLoader
                            loading={this.state.isLoading}
                            color={'#1641ff'}
                            css={spinnerCss}
                        />
                        {!this.state.isLoading &&
                        <React.Fragment>
                            <div className="table-data__tool">
                                <div className="table-data__tool-left">
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
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="table-data__tool-right">
                                    <button className="au-btn au-btn-icon au-btn--green au-btn--small"
                                            onClick={this.openModal}>
                                        <i className="zmdi zmdi-plus"/>
                                        add achievement
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
                                        <th>Id</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {/*//achievement list*/}
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


const mapStateToProps = (state: AppState) => {
    return {
        achievementModalVisible: state.achievement.modalVisible
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setAchievementModalVisible: (modalVisible: boolean) =>
            dispatch(setAchievementModalVisible(modalVisible))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Achievements);

