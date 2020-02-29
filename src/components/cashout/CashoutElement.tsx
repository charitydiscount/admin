import React from "react";
import { dateOptions, emptyHrefLink, TxType } from "../../Helper";
import Modal from '../modal';
import { TextField } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { getTotalAmount, TransactionDto, updateTransaction } from "../../rest/TransactionsService";

interface CashoutElementProps {
    key: string,
    cashout: TransactionDto,
    email?: string
}

interface CashoutElementState {
    cashout: TransactionDto,
    modalVisible: boolean,
    modalUserVisible: boolean,
    totalAmount: number
}

class CashoutElement extends React.Component<CashoutElementProps, CashoutElementState> {

    constructor(props: CashoutElementProps) {
        super(props);
        this.state = ({
            cashout: this.props.cashout,
            totalAmount: 0,
            modalUserVisible: false,
            modalVisible: false
        })
    }

    openModal() {
        this.setState({
            cashout: this.props.cashout,
            modalVisible: true
        });
    }

    closeModal() {
        this.setState({
            modalVisible: false
        });
    }

    async openUserModal() {
        try {
            let response = await getTotalAmount(TxType.CASHOUT, this.props.cashout.userId);
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


    async onModalSave() {
        try {
            let response = await updateTransaction(TxType.CASHOUT, this.props.cashout);
            if (response) {
                alert("Cashout successfully updated");
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
            value={this.props.cashout.status} disabled={true}
        />;
        if (this.props.cashout.status === "PAID") {
            statusColumn = <td style={{backgroundColor: "#6eff24"}}>{this.props.cashout.status}</td>;
        } else if (this.props.cashout.status === "REJECTED") {
            statusColumn = <td style={{backgroundColor: "#ff4c4f"}}>{this.props.cashout.status}</td>;
        } else {
            statusColumn = <td style={{backgroundColor: "#fffc82"}}>{this.props.cashout.status}</td>;
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
                    value={this.state.cashout.status}
                    onChange={event => {
                        let cashout = this.state.cashout;
                        cashout.status = event.target.value as string;
                        this.setState({
                            cashout: cashout
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
                    title="Update cashout"
                    onSave={() => this.onModalSave()}
                >
                    {this.state.modalVisible &&
                    <React.Fragment>
                        {this.props.cashout.updatedAt &&
                        <TextField
                            id="updated" label={"Updated"} variant="filled" style={{width: '100%'}}
                            value={
                                new Date(parseFloat(this.props.cashout.updatedAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)
                            } disabled={true}
                        />
                        }
                        <TextField
                            id="id" label={"Id"} variant="filled" style={{width: '100%'}}
                            value={this.props.cashout.id} disabled={true}
                        />
                        <TextField
                            id="userId" label={"User id"} variant="filled" style={{width: '100%'}}
                            value={this.props.cashout.userId} disabled={true}
                        />
                        <TextField
                            id="email" label={"Email"} variant="filled" style={{width: '100%'}}
                            value={this.props.email} disabled={true}
                        />
                        <TextField
                            id="iban" label={"IBAN"} variant="filled" style={{width: '100%'}}
                            value={this.props.cashout.target.id} disabled={true}
                        />
                        <TextField
                            id="name" label={"Name"} variant="filled" style={{width: '100%'}}
                            value={this.props.cashout.target.name} disabled={true}
                        />

                        {statusUpdateColumn}
                    </React.Fragment>
                    }
                </Modal>
                <Modal
                    visible={this.state.modalUserVisible}
                    onClose={() => this.closeUserModal()}
                    title="Total cashout for user"
                    onSave={() => {
                    }}
                >
                    {this.state.modalUserVisible &&
                    <React.Fragment>
                        <TextField
                            id="userId" label={"User id"} variant="filled" style={{width: '100%'}}
                            value={this.props.cashout.userId} disabled={true}
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
                        this.props.cashout.createdAt &&
                        new Date(parseFloat(this.props.cashout.createdAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)}
                    </td>
                    <td style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                        <a href={emptyHrefLink} style={{
                            textDecoration: "underline",
                            color: "#007bff",
                            cursor: "pointer"
                        }} onClick={() => this.openModal()}>
                            {this.props.cashout.id}
                        </a>
                    </td>
                    {statusColumn}
                    <td>{this.props.cashout.amount}</td>
                    <td style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                        <a href={emptyHrefLink} style={{
                            textDecoration: "underline",
                            color: "#007bff",
                            cursor: "pointer"
                        }} onClick={() => this.openUserModal()}>
                            {this.props.cashout.userId}
                        </a>
                    </td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

export default CashoutElement