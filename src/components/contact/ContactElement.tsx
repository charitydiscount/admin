import React from "react";
import { dateOptions, emptyHrefLink } from "../../Helper";
import Modal from '../modal';
import { TextField } from "@material-ui/core";
import { MessageDto, updateMessage } from "../../rest/ContactsService";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ElementTableLink from "../general/ElementTableLink";

interface ContactElementProps {
    message: MessageDto,
}

interface ContactElementState {
    message: MessageDto,
    modalVisible: boolean
}

class ContactElement extends React.Component<ContactElementProps, ContactElementState> {

    constructor(props: ContactElementProps) {
        super(props);
        this.state = ({
            message: this.props.message,
            modalVisible: false
        })
    }

    openModal = () => {
        this.setState({
            message: this.props.message,
            modalVisible: true
        });
    };


    closeModal = () => {
        this.setState({
            modalVisible: false
        });
    };

    async onModalSave() {
        try {
            let response = await updateMessage(this.state.message);
            if (response) {
                alert("Message successfully updated");
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
        if (this.props.message.status === "NEW") {
            statusColumn = <td style={{backgroundColor: "#fffc82"}}>{this.props.message.status}</td>;
        } else if (this.props.message.status === "CHECKED") {
            statusColumn = <td style={{backgroundColor: "#6eff24"}}>{this.props.message.status}</td>;
        }

        return (
            <React.Fragment>
                <Modal
                    visible={this.state.modalVisible}
                    onClose={() => this.closeModal()}
                    title="Contact info"
                    onSave={() => this.onModalSave()}
                >
                    {this.state.modalVisible &&
                    <React.Fragment>
                        <TextField
                            id="od" label={"Id"} variant="filled" style={{width: '100%'}}
                            value={this.props.message.id} disabled={true}
                        />
                        <TextField
                            id="creationDate" label={"Creation date"} variant="filled" style={{width: '100%'}}
                            value={
                                new Date(parseFloat(this.props.message.createdAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)
                            } disabled={true}
                        />
                        <TextField
                            id="email" label={"Name"} variant="filled" style={{width: '100%'}}
                            value={this.props.message.name} disabled={true}
                        />
                        <TextField
                            id="subject" label={"Subject"} variant="filled" style={{width: '100%'}}
                            value={this.props.message.subject} disabled={true}
                        />
                        <TextField
                            id="message" label={"Message"} variant="filled" style={{width: '100%'}}
                            value={this.props.message.message} disabled={true}
                        />
                        {this.state.message.status === 'NEW' &&
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
                                value={this.state.message.status}
                                onChange={event => {
                                    let message = this.state.message;
                                    message.status = event.target.value as string;
                                    this.setState({
                                        message: message
                                    })
                                }}
                            >
                                <MenuItem value={"NEW"}> NEW </MenuItem>
                                <MenuItem value={"CHECKED"}> CHECKED </MenuItem>
                            </Select>
                        </FormControl>
                        }
                        {this.state.message.status !== 'NEW' &&
                        <TextField
                            id="status" label={"Status"} variant="filled" style={{width: '100%'}}
                            value={this.state.message.status} disabled={true}
                        />
                        }
                    </React.Fragment>
                    }
                </Modal>
                <tr className="tr-shadow">
                    <td>{
                        new Date(parseFloat(this.props.message.createdAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)
                    }
                    </td>
                    {statusColumn}
                    <td>{this.props.message.email}</td>
                    <ElementTableLink text={this.props.message.name} onClick={this.openModal}/>
                    <td>{this.props.message.userId}</td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

export default ContactElement;