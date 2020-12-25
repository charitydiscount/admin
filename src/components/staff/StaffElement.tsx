import React from 'react';
import ElementTableLink from '../general/ElementTableLink';
import { User } from '../../models/User';
import StaffModal from './StaffModal';
import { connect } from 'react-redux';
import { setStaffModalUpdate } from '../../redux/actions/StaffActions';
import { isStaff } from '../../util/user';

interface StaffElementProps {
    staffUser: User;
    //global state
    setStaffModalUpdate?: (user: User) => void;
}

interface StaffElementState {}

class StaffElement extends React.Component<
    StaffElementProps,
    StaffElementState
> {
    openModal = () => {
        this.props.setStaffModalUpdate(this.props.staffUser);
    };

    public render() {
        return (
            <React.Fragment>
                <StaffModal />
                <tr className="tr-shadow">
                    <ElementTableLink
                        text={this.props.staffUser.userId}
                        onClick={this.openModal}
                    />
                    <td>{this.props.staffUser.email}</td>
                    <td>
                        <img
                            width={64}
                            height={64}
                            src={this.props.staffUser.photoUrl}
                            alt=""
                        />
                    </td>
                    <td>
                        {isStaff(this.props.staffUser) ? (
                            <i className="fa fa-check" />
                        ) : (
                            'Inactive'
                        )}
                    </td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setStaffModalUpdate: (user: User) =>
            dispatch(setStaffModalUpdate(user)),
    };
};

export default connect(null, mapDispatchToProps)(StaffElement);
