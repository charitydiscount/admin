import React from "react";
import { UiCashoutDto, updateCashout } from "../../rest/CashoutService";
import { dateOptions, emptyHrefLink } from "../../Helper";
import Modal from '../modal';
import { TextField } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

interface CashoutElementProps {
    uiCashout: UiCashoutDto
}

interface CashoutElementState {
    uiCashout: UiCashoutDto,
    modalVisible: boolean
}

class CashoutElement extends React.Component<CashoutElementProps, CashoutElementState> {

    constructor(props: CashoutElementProps) {
        super(props);
        this.state = ({
            uiCashout: this.props.uiCashout,
            modalVisible: false
        })
    }

    openModal() {
        this.setState({
            uiCashout: this.props.uiCashout,
            modalVisible: true
        });
    }

    closeModal() {
        this.setState({
            modalVisible: false
        });
    }

    async onModalSave() {
        try {
            let response = await updateCashout(this.props.uiCashout.id, this.props.uiCashout.cashout);
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
        if (this.props.uiCashout.cashout.status === "PAID") {
            statusColumn = <td style={{backgroundColor: "#6eff24"}}>{this.props.uiCashout.cashout.status}</td>;
        } else if (this.props.uiCashout.cashout.status === "REJECTED") {
            statusColumn = <td style={{backgroundColor: "#ff4c4f"}}>{this.props.uiCashout.cashout.status}</td>;
        } else {
            statusColumn = <td style={{backgroundColor: "#fffc82"}}>{this.props.uiCashout.cashout.status}</td>;
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
                        <TextField
                            id="id" label={"Id"} variant="filled" style={{width: '100%'}}
                            value={this.props.uiCashout.id} disabled={true}
                        />
                        <TextField
                            id="userId" label={"User id"} variant="filled" style={{width: '100%'}}
                            value={this.props.uiCashout.cashout.userId} disabled={true}
                        />
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
                                value={this.state.uiCashout.cashout.status}
                                onChange={event => {
                                    let cashout = this.state.uiCashout;
                                    cashout.cashout.status = event.target.value as string;
                                    this.setState({
                                        uiCashout: cashout
                                    })
                                }}
                            >
                                <MenuItem value={"ACCEPTED"}> Accepted </MenuItem>
                                <MenuItem value={"PAID"}> Paid </MenuItem>
                            </Select>
                        </FormControl>
                    </React.Fragment>
                    }
                </Modal>
                <tr className="tr-shadow">
                    <td>{new Date(parseFloat(this.props.uiCashout.cashout.createdAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)}</td>
                    <td style={{maxWidth: 150, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                        <a href={emptyHrefLink} style={{
                            textDecoration: "underline",
                            color: "#007bff",
                            cursor: "pointer"
                        }} onClick={() => this.openModal()}>
                            {this.props.uiCashout.id}
                        </a>
                    </td>
                    <td>{this.props.uiCashout.cashout.userId}</td>
                    {statusColumn}
                    <td>{this.props.uiCashout.cashout.amount}</td>
                    <td>{this.props.uiCashout.cashout.target}</td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

export default CashoutElement