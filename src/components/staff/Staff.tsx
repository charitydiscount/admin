import React from 'react';
import { FadeLoader } from 'react-spinners';
import { pageLimit, spinnerCss } from '../../Helper';
import ReactPaginate from 'react-paginate';
import StaffElement from './StaffElement';
import { User } from '../../models/User';
import StaffModal from './StaffModal';
import { connect } from 'react-redux';
import {
    loadStaffMembers,
    setStaffModalCreate,
} from '../../redux/actions/StaffActions';
import { AppState } from '../../redux/reducer/RootReducer';

interface RolesState {
    currentPage: number;
}

interface RolesProps {
    //global state
    setStaffModalCreate: () => void;
    loadMembers: () => {};
    staffMembers: User[];
    isLoading: boolean;
}

class Staff extends React.Component<RolesProps, RolesState> {
    constructor(props: RolesProps) {
        super(props);
        this.state = {
            currentPage: 0,
        };
    }

    openModal = () => {
        this.props.setStaffModalCreate();
    };

    async componentDidMount() {
        this.props.loadMembers();
    }

    updatePageNumber = (data) => {
        this.setState({
            currentPage: data.selected,
        });
    };

    public render() {
        let staffMemberList;
        let pageCount = 0;
        if (this.props.staffMembers && this.props.staffMembers.length > 0) {
            staffMemberList = this.props.staffMembers;
            if (staffMemberList.length > pageLimit) {
                pageCount = staffMemberList.length / pageLimit;
                let offset = this.state.currentPage;
                staffMemberList = staffMemberList.slice(
                    offset * pageLimit,
                    (offset + 1) * pageLimit
                );
            } else {
                pageCount = 1;
            }

            staffMemberList = staffMemberList.map((value, index) => {
                return <StaffElement key={index} staffUser={value} />;
            });
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">Staff members</h3>
                        <StaffModal />
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
                                            add member
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
                                                <th>UserId</th>
                                                <th>Email</th>
                                                <th>Photo</th>
                                                <th>Staff Member</th>
                                            </tr>
                                        </thead>
                                        <tbody>{staffMemberList}</tbody>
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
        staffMembers: state.staff.members,
        isLoading: state.staff.loading,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setStaffModalCreate: () => dispatch(setStaffModalCreate()),
        loadMembers: () => dispatch(loadStaffMembers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Staff);
