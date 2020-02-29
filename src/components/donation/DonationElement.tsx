import React from "react";
import { dateOptions, emptyHrefLink, TxType } from "../../Helper";
import Modal from '../modal';
import { TextField } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { getTotalAmount, TransactionDto, updateTransaction } from "../../rest/TransactionsService";


interface DonationElementProps {
    key: string,
    donation: TransactionDto,
    email?: string
}

interface DonationElementState {
    donation: TransactionDto,
    modalUserVisible: boolean,
    totalAmount: number,
    modalVisible: boolean
}

class DonationElement extends React.Component<DonationElementProps, DonationElementState> {

    constructor(props: DonationElementProps) {
        super(props);
        this.state = ({
            donation: this.props.donation,
            modalUserVisible: false,
            totalAmount: 0,
            modalVisible: false
        })
    }

    openModal() {
        this.setState({
            donation: this.props.donation,
            modalVisible: true
        });
    }

    async openUserModal() {
        try {
            let response = await getTotalAmount(TxType.DONATION, this.props.donation.userId);
            if (response) {
                this.setState({
                    totalAmount: response as number,
                    modalUserVisible: true
                })
            } else {
                alert("Something went wrong with returning total amount");
            }
        } catch (e) {
            alert(e);
        }
    }

    closeUserModal() {
        this.setState({
            modalUserVisible: false
        });
    }


    closeModal() {
        this.setState({
            modalVisible: false
        });
    }

    async onModalSave() {
        try {
            let response = await updateTransaction(TxType.DONATION, this.props.donation);
            if (response) {
                alert("Donation successfully updated");
                window.location.reload();
            } else {
                alert("Something went wrong with update");
            }
        } catch (e) {
            alert(e);
        }
    }

    render(): React.ReactNode {
        let statusColumn;
        let statusUpdateColumn = <TextField
            id="status" label={"Status"} variant="filled" style={{width: '100%'}}
            value={this.props.donation.status} disabled={true}
        />;
        if (this.props.donation.status === "PAID") {
            statusColumn = <td style={{backgroundColor: "#6eff24"}}>{this.props.donation.status}</td>;
        } else if (this.props.donation.status === "REJECTED") {
            statusColumn = <td style={{backgroundColor: "#ff4c4f"}}>{this.props.donation.status}</td>;
        } else {
            statusColumn = <td style={{backgroundColor: "#fffc82"}}>{this.props.donation.status}</td>;
            statusUpdateColumn = <FormControl variant="filled" style={{width: '100%'}}>
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
                    value={this.state.donation.status}
                    onChange={event => {
                        let donation = this.state.donation;
                        donation.status = event.target.value as string;
                        this.setState({
                            donation: donation
                        })
                    }}
                >
                    <MenuItem value={"ACCEPTED"}> Accepted </MenuItem>
                    <MenuItem value={"PAID"}> Paid </MenuItem>
                </Select>
            </FormControl>
        }

        return (
            <React.Fragment>
                <Modal
                    visible={this.state.modalVisible}
                    onClose={() => this.closeModal()}
                    title="Update donation"
                    onSave={() => this.onModalSave()}
                >
                    {this.state.modalVisible &&
                    <React.Fragment>
                        <TextField
                            id="id" label={"Id"} variant="filled" style={{width: '100%'}}
                            value={this.props.donation.id} disabled={true}
                        />
                        <TextField
                            id="userId" label={"User id"} variant="filled" style={{width: '100%'}}
                            value={this.props.donation.userId} disabled={true}
                        />
                        <TextField
                            id="caseId" label={"Case Id"} variant="filled" style={{width: '100%'}}
                            value={this.props.donation.target.id}
                            disabled={this.props.donation.status === "PAID"}
                            onChange={event => {
                                let donation = this.state.donation;
                                donation.target.id = event.target.value;
                                this.setState({
                                    donation: donation
                                });
                            }}
                        />
                        <TextField
                            id="caseTitle" label={"Case Title"} variant="filled" style={{width: '100%'}}
                            value={this.props.donation.target.name}
                            disabled={this.props.donation.status === "PAID"}
                            onChange={event => {
                                let donation = this.state.donation;
                                donation.target.name = event.target.value;
                                this.setState({
                                    donation: donation
                                });
                            }}
                        />
                        <TextField
                            id="email" label={"Email"} variant="filled" style={{width: '100%'}}
                            value={this.props.email} disabled={true}
                        />
                        {statusUpdateColumn}
                    </React.Fragment>
                    }
                </Modal>
                <Modal
                    visible={this.state.modalUserVisible}
                    onClose={() => this.closeUserModal()}
                    title="Total donation for user"
                    onSave={() => {
                    }}
                >
                    {this.state.modalUserVisible &&
                    <React.Fragment>
                        <TextField
                            id="userId" label={"User id"} variant="filled" style={{width: '100%'}}
                            value={this.props.donation.userId} disabled={true}
                        />
                        <TextField
                            id="email" label={"Email"} variant="filled" style={{width: '100%'}}
                            value={this.props.email} disabled={true}
                        />
                        <TextField
                            id="totalAmount" label={"Total Amount(lei)"} variant="filled" style={{width: '100%'}}
                            value={this.state.totalAmount} disabled={true}
                        />
                    </React.Fragment>
                    }
                </Modal>
                <tr className="tr-shadow">
                    <td>{
                        this.props.donation.createdAt &&
                        new Date(parseFloat(this.props.donation.createdAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)}
                    </td>
                    <td style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                        <a href={emptyHrefLink} style={{
                            textDecoration: "underline",
                            color: "#007bff",
                            cursor: "pointer"
                        }} onClick={() => this.openModal()}>
                            {this.props.donation.id}
                        </a>
                    </td>
                    {statusColumn}
                    <td>{this.props.donation.amount}</td>
                    <td style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                        <a href={emptyHrefLink} style={{
                            textDecoration: "underline",
                            color: "#007bff",
                            cursor: "pointer"
                        }} onClick={() => this.openUserModal()}>
                            {this.props.donation.userId}
                        </a>
                    </td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

export default DonationElement