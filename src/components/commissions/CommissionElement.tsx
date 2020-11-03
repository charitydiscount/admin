import React from "react";
import { CommissionDto, getTotalAmountForUserId, updateCommission } from "../../rest/CommissionService";
import Modal from '../modal';
import { TextField } from "@material-ui/core";
import { dateOptions, emptyHrefLink } from "../../Helper";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ElementTableLink from "../general/ElementTableLink";

interface CommissionsElementProps {
    commission: CommissionDto,
    defaultCommissions: CommissionDto[],
    externalCommission : boolean,
    email?: string
}

interface CommissionsElementState {
    modalVisible: boolean,
    commission: CommissionDto,
    totalAmountForUser: number,
    modalUserVisible: boolean
}

class CommissionsElement extends React.Component<CommissionsElementProps, CommissionsElementState> {

    constructor(props: CommissionsElementProps) {
        super(props);
        this.state = {
            modalVisible: false,
            commission: this.props.commission,
            totalAmountForUser: 0,
            modalUserVisible: false
        };
        this.onModalSave = this.onModalSave.bind(this);
    }

    openModal = () => {
        this.setState({
            commission: this.props.commission,
            modalVisible: true,
        });
    };

    closeModal = () =>  {
        this.setState({
            modalVisible: false,
        });
    };

    openUserModal = () => {
        try {
            let result = getTotalAmountForUserId(this.props.commission.userId, this.props.defaultCommissions);
            this.setState({
                totalAmountForUser: result as number,
                modalUserVisible: true
            })
        } catch (e) {
            alert(e);
        }
    };

    closeUserModal = () => {
        this.setState({
            modalUserVisible: false
        });
    };

    async onModalSave() {
        if (this.props.externalCommission) {
            try {
                let response = await updateCommission(this.props.commission.userId, this.props.commission.commissionId,
                    this.state.commission);
                if (response) {
                    alert("Commission successfully updated");
                    window.location.reload();
                } else {
                    alert("Something went wrong with update");
                }
            } catch (e) {
                alert(e);
            }
        } else {
            this.closeModal();
        }
    }

    render(): React.ReactNode {
        let statusColumn;
        if (this.props.commission.details.status === "paid") {
            statusColumn = <td style={{backgroundColor: "#6eff24"}}>{this.props.commission.details.status}</td>;
        } else if (this.props.commission.details.status === "rejected") {
            statusColumn = <td style={{backgroundColor: "#ff4c4f"}}>{this.props.commission.details.status}</td>;
        } else {
            statusColumn = <td style={{backgroundColor: "#fffc82"}}>{this.props.commission.details.status}</td>;
        }

        return (
            <React.Fragment>
                <Modal
                    visible={this.state.modalVisible}
                    onClose={() => this.closeModal()}
                    title="Update commission"
                    onSave={() => this.onModalSave()}
                >
                    {this.state.modalVisible &&
                    <React.Fragment>
                        {this.props.commission.details.updatedAt &&
                        <TextField
                            id="updated" label={"Last updated"} variant="filled" style={{width: '100%'}}
                            value={
                                new Date(parseFloat(this.props.commission.details.updatedAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)
                            } disabled={true}
                        />
                        }
                        <TextField
                            id="userId" label={"User id"} variant="filled" style={{width: '100%'}}
                            value={this.state.commission.userId} disabled={true}
                        />
                        <TextField
                            id="email" label={"Email"} variant="filled" style={{width: '100%'}}
                            value={this.props.email} disabled={true}
                        />
                        <TextField
                            id="commissionId" label={"Commission id"} variant="filled" style={{width: '100%'}}
                            value={this.state.commission.commissionId} disabled={true}
                        />
                        {this.props.externalCommission &&
                        (this.state.commission.details.status === 'pending' ||
                            this.state.commission.details.status === 'accepted') &&
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
                                value={this.state.commission.details.status}
                                onChange={event => {
                                    let commission = this.state.commission;
                                    commission.details.status = event.target.value as string;
                                    this.setState({
                                        commission: commission
                                    })
                                }}
                            >
                                <MenuItem value={"pending"}> Pending </MenuItem>
                                <MenuItem value={"accepted"}> Accepted </MenuItem>
                                <MenuItem value={"rejected"}> Rejected </MenuItem>
                                <MenuItem value={"paid"}> Paid </MenuItem>
                            </Select>
                        </FormControl>
                        }
                        <TextField
                            id="reason" label={"Reason"} variant="filled" style={{width: '100%'}}
                            value={this.state.commission.details.reason}
                            disabled={!this.props.externalCommission}
                            onChange={event => {
                                let commission = this.state.commission;
                                commission.details.reason = event.target.value;
                                this.setState({
                                    commission: commission
                                });
                            }}
                        />
                        <TextField
                            id="amount" label={"AMOUNT GIVEN TO USER"} variant="filled" style={{width: '100%'}}
                            type="number"
                            value={this.state.commission.details.amount}
                            inputProps={{
                                step: '0.1',
                            }}
                            onChange={event => {
                                let commission = this.state.commission;
                                commission.details.amount = parseFloat(event.target.value);
                                this.setState({
                                    commission: commission
                                });
                            }}
                            disabled={!this.props.externalCommission}
                        />
                    </React.Fragment>
                    }
                </Modal>
                <Modal
                    visible={this.state.modalUserVisible}
                    onClose={() => this.closeUserModal()}
                    title="Total cashout for user"
                    onSave={() => {
                        this.closeUserModal();
                    }}
                >
                    {this.state.modalUserVisible &&
                    <React.Fragment>
                        <TextField
                            id="userId" label={"User id"} variant="filled" style={{width: '100%'}}
                            value={this.props.commission.userId} disabled={true}
                        />
                        <TextField
                            id="email" label={"Email"} variant="filled" style={{width: '100%'}}
                            value={this.props.email} disabled={true}
                        />
                        <TextField
                            id="totalAmount" label={"Total Amount of all commissions(lei)"} variant="filled" style={{width: '100%'}}
                            value={this.state.totalAmountForUser} disabled={true}
                        />
                    </React.Fragment>
                    }
                </Modal>
                <tr className="tr-shadow">
                    <td>{
                        this.props.commission.details.createdAt &&
                        new Date(parseFloat(this.props.commission.details.createdAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)}
                    </td>
                    <ElementTableLink text={this.props.commission.commissionId} onClick={this.openModal} withoutWidth={true}/>
                    {statusColumn}
                    <td>{this.props.commission.details.amount}</td>
                    <td>{this.props.commission.details.source}</td>
                    <ElementTableLink text={this.props.commission.userId} onClick={this.openUserModal} withoutWidth={true}/>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

export default CommissionsElement;
