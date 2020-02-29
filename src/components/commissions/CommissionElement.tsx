import React from "react";
import { CommissionDto } from "../../rest/CommissionService";
import Modal from '../modal';
import { TextField } from "@material-ui/core";
import { dateOptions, emptyHrefLink } from "../../Helper";

interface CommissionsElementProps {
    commission: CommissionDto,
    email?: string
}

interface CommissionsElementState {
    modalVisible: boolean
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
        this.closeModal();
        //nothing yet
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
                        <TextField
                            id="uniqueCode" label={"User id"} variant="filled" style={{width: '100%'}}
                            value={this.state.commission.userId} disabled={true}
                        />
                        <TextField
                            id="email" label={"Email"} variant="filled" style={{width: '100%'}}
                            value={this.props.email} disabled={true}
                        />
                        <TextField
                            id="uniqueCode" label={"Commission id"} variant="filled" style={{width: '100%'}}
                            value={this.state.commission.commissionId} disabled={true}
                        />
                        <TextField
                            id="uniqueCode" label={"Status"} variant="filled" style={{width: '100%'}}
                            value={this.state.commission.details.status} disabled={true}
                        />
                        <TextField
                            id="uniqueCode" label={"Reason"} variant="filled" style={{width: '100%'}}
                            value={this.state.commission.details.reason} disabled={true}
                        />
                        <TextField
                            id="uniqueCode" label={"Amount"} variant="filled" style={{width: '100%'}}
                            value={this.state.commission.details.amount} disabled={true}
                        />
                    </React.Fragment>
                    }
                </Modal>
                <tr className="tr-shadow">
                    <td>{
                        this.props.commission.details.createdAt &&
                        new Date(parseFloat(this.props.commission.details.createdAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)}</td>
                    <td>{
                        this.props.commission.details.updatedAt &&
                        new Date(parseFloat(this.props.commission.details.updatedAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)
                    }</td>
                    <td>{this.props.commission.userId}</td>
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
                    <td>{this.props.commission.details.currency}</td>
                    <td>{this.props.commission.details.originalCurrency}</td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

export default CommissionsElement;
