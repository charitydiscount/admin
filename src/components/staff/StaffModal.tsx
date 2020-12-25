import React from "react";
import { BooleanOptions, User } from "../../models/User";
import Modal from '../modal';
import { AppState } from "../../redux/reducer/RootReducer";
import { connect } from "react-redux";
import { setStaffModalVisible, updateStaffModal } from "../../redux/actions/StaffActions";
import ModalTextField from "../general/ModalTextField";
import { MenuItem } from "@material-ui/core";
import ModalSelect from "../general/ModalSelect";
import { updateStaffMember } from "../../rest/StaffService";

interface StaffModalProps {
    //global state
    staffModalVisible: boolean;
    createStaff: boolean;
    setStaffModalVisible: (modalVisible) => void;
    updateStaffModal: (user) => void;
    staffModal: User;
}

class StaffModal extends React.Component<StaffModalProps> {

    onClose = () => {
        this.props.setStaffModalVisible(false);
    };

    onSave = async () => {
        try {
            const response =
                await updateStaffMember(this.props.createStaff, this.props.staffModal);
            if (response) {
                alert("Staff member successfully created/updated");
                window.location.reload();
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert(error);
            }
        }
    };

    render() {
        const booleanUnits = Object.entries(BooleanOptions).map(([key, value]) => {
            return (
                <MenuItem key={key} value={value}>
                    {value}
                </MenuItem>
            );
        });

        return (
            <React.Fragment>
                <Modal
                    visible={this.props.staffModalVisible}
                    onClose={this.onClose}
                    title={"Staff member"}
                    onSave={this.onSave}
                >
                    {this.props.staffModalVisible &&
                    <React.Fragment>
                        <ModalTextField
                            label={'User id'}
                            value={this.props.staffModal.userId}
                            disabled={!this.props.createStaff}
                            onChange={(event) => {
                                this.props.updateStaffModal({
                                    userId: event.target.value
                                });
                            }}
                        />

                        {!this.props.createStaff &&
                        <ModalSelect
                            id={'staffMember'}
                            title={'Staff'}
                            value={this.props.staffModal.isStaff}
                            options={booleanUnits}
                            onChange={(event) => {
                                this.props.updateStaffModal({
                                    ...this.props.staffModal,
                                    isStaff: event.target.value
                                });
                            }}
                        />
                        }
                    </React.Fragment>
                    }
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        staffModalVisible: state.staff.modalVisible,
        staffModal: state.staff.staffModal,
        createStaff: state.staff.createStaff
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setStaffModalVisible: (modalVisible: boolean) =>
            dispatch(setStaffModalVisible(modalVisible)),
        updateStaffModal: (user: User) =>
            dispatch(updateStaffModal(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffModal);
