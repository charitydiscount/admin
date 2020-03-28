import React from "react";
import { CommissionDto, updateCommission } from "../../rest/CommissionService";
import Modal from '../modal';
import { TextField } from "@material-ui/core";
import { dateOptions, emptyHrefLink } from "../../Helper";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface CommissionsElementProps {
    commission: CommissionDto,
    externalCommission : boolean,
    email?: string
}

interface CommissionsElementState {
    modalVisible: boolean,
    commission: CommissionDto
}

class CommissionsElement extends React.Component<CommissionsElementProps, CommissionsElementState> {

    constructor(props: CommissionsElementProps) {
        super(props);
        this.state = {
            modalVisible: false,
            commission: this.props.commission
        };
        this.onModalSave = this.onModalSave.bind(this);
    }

    openModal() {
        this.setState({
            commission: this.props.commission,
            modalVisible: true,
        });
    }

    closeModal() {
        this.setState({
            modalVisible: false,
        });
    }

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
                        {!this.props.externalCommission &&
                        <TextField
                            id="status" label={"Status"} variant="filled" style={{width: '100%'}}
                            value={this.state.commission.details.status} disabled={true}
                        />
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
                <tr className="tr-shadow">
                    <td>{
                        this.props.commission.details.createdAt &&
                        new Date(parseFloat(this.props.commission.details.createdAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)}
                    </td>
                    <td style={{maxWidth: 150, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                        <a href={emptyHrefLink} style={{
                            textDecoration: "underline",
                            color: "#007bff",
                            cursor: "pointer"
                        }} onClick={() => this.openModal()}>
                            {this.props.commission.commissionId}
                        </a>
                    </td>
                    {statusColumn}
                    <td>{this.props.commission.details.amount}</td>
                    <td>{this.props.commission.details.source}</td>
                    <td>{this.props.commission.userId}</td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

export default CommissionsElement;
