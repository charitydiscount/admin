import React from 'react';
import { pageLimit, spinnerCss } from '../../Helper';
import { FadeLoader } from 'react-spinners';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import {
    loadAchievements,
    setAchievementModalCreate,
} from '../../redux/actions/AchievementActions';
import AchievementModal from './AchievementModal';
import { Achievement } from '../../models/Achievement';
import AchievementElement from './AchievementElement';
import { AppState } from '../../redux/reducer/RootReducer';

interface AchievementsProps {
    //global state
    setAchievementModalCreate: () => void;
    achievements: Achievement[];
    isLoading: boolean;
    loadAchievements: () => {};
}

interface AchievementsState {
    currentPage: number;
    filterType: string;
}

class Achievements extends React.Component<
    AchievementsProps,
    AchievementsState
> {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            filterType: '',
        };
    }

    async componentDidMount() {
        this.props.loadAchievements();
    }

    openModal = () => {
        this.props.setAchievementModalCreate();
    };

    updatePageNumber = (data) => {
        this.setState({
            currentPage: data.selected,
        });
    };

    filter = () => {};

    public render() {
        let pageCount = 0;
        let achievementList;
        if (this.props.achievements && this.props.achievements.length > 0) {
            achievementList = this.props.achievements;
            if (achievementList.length > pageLimit) {
                pageCount = achievementList.length / pageLimit;
                let offset = this.state.currentPage;
                achievementList = achievementList.slice(
                    offset * pageLimit,
                    (offset + 1) * pageLimit
                );
            } else {
                pageCount = 1;
            }

            achievementList = achievementList.map((value, index) => {
                return <AchievementElement key={index} achievement={value} />;
            });
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">Achievements</h3>
                        <AchievementModal title={'Create achievement'} />
                        <FadeLoader
                            loading={this.props.isLoading}
                            color={'#1641ff'}
                            css={spinnerCss}
                        />
                        {!this.props.isLoading && (
                            <React.Fragment>
                                <div className="table-data__tool">
                                    <div className="table-data__tool-left"></div>
                                    <div className="table-data__tool-right">
                                        <button
                                            className="au-btn au-btn-icon au-btn--green au-btn--small"
                                            onClick={this.openModal}
                                        >
                                            <i className="zmdi zmdi-plus" />
                                            add achievement
                                        </button>
                                        <ReactPaginate
                                            previousLabel={'<'}
                                            previousLinkClassName={'page-link'}
                                            nextLabel={'>'}
                                            nextLinkClassName={'page-link'}
                                            breakLabel={'...'}
                                            breakClassName={'blank'}
                                            breakLinkClassName={'page-link'}
                                            pageCount={pageCount}
                                            marginPagesDisplayed={1}
                                            pageRangeDisplayed={2}
                                            forcePage={0}
                                            onPageChange={this.updatePageNumber}
                                            containerClassName={'pagination'}
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
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Type</th>
                                                <th>Badge</th>
                                            </tr>
                                        </thead>
                                        <tbody>{achievementList}</tbody>
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

const mapStateToProps = (state: AppState) => {
    return {
        achievements: state.achievement.achievements,
        isLoading: state.achievement.loading,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setAchievementModalCreate: () => dispatch(setAchievementModalCreate()),
        loadAchievements: () => dispatch(loadAchievements()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Achievements);
