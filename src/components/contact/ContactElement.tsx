import React from "react";
import { emptyHrefLink } from "../../Helper";
import Modal from '../modal';
import { TextField } from "@material-ui/core";
import { MessageDto } from "../../rest/ContactsService";

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

    openModal() {
        this.setState({
            message: this.props.message,
            modalVisible: true
        });
    }


    closeModal() {
        this.setState({
            modalVisible: false
        });
    }

    async onModalSave() {
        this.closeModal();
    }

    render(): React.ReactNode {

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
                            id="email" label={"Name"} variant="filled" style={{width: '100%'}}
                            value={this.props.message.name} disabled={true}
                        />
                        <TextField
                            id="email" label={"Subject"} variant="filled" style={{width: '100%'}}
                            value={this.props.message.subject} disabled={true}
                        />
                        <TextField
                            id="email" label={"Message"} variant="filled" style={{width: '100%'}}
                            value={this.props.message.message} disabled={true}
                        />
                    </React.Fragment>
                    }
                </Modal>
                <tr className="tr-shadow">
                    <td>{this.props.message.email}</td>
                    <td style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                        <a href={emptyHrefLink} style={{
                            textDecoration: "underline",
                            color: "#007bff",
                            cursor: "pointer"
                        }} onClick={() => this.openModal()}>
                            {this.props.message.name}
                        </a>
                    </td>
                    <td>{this.props.message.userId}</td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

export default ContactElement;