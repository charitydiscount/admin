import React from "react";
import { Button, TextField } from "@material-ui/core";
import { sendMail } from "../../rest/MailsService";
import FadeLoader from 'react-spinners/FadeLoader';
import { spinnerCss } from "../../Helper";
import ReactModal from 'react-modal';
import axios from "axios";

interface MailsProps {

}

interface MailsState {
    modalVisible: boolean,
    loadingVisible: boolean,
    content: string,
    subject: string
}


class Mails extends React.Component<MailsProps, MailsState> {

    constructor(props: Readonly<MailsProps>) {
        super(props);
        this.state = {
            content: '',
            subject: '',
            modalVisible: false,
            loadingVisible: false
        };
        this.submitSendEmail = this.submitSendEmail.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onModalSave = this.onModalSave.bind(this);
    }


    componentDidMount(): void {
        axios.get("/template/NotificationMailTemplate.html")
            .then(
                response => {
                    this.setState({
                        content: response.data,
                        subject: "Te-ar putea interesa această ofertă"
                    })
                });
    }

    submitSendEmail() {
        if (!this.state.subject) {
            alert("Write a subject");
            return;
        }
        if (!this.state.content) {
            alert("Write a content");
            return;
        }
        if(this.state.content.includes("procentCashback")){
            alert("Search after procentCashback and replace");
            return;
        }
        if(this.state.content.includes("textCashback")){
            alert("Search after textCashback and replace");
            return;
        }

        if(this.state.content.includes("linkAcceseaza")){
            alert("Search after linkAcceseaza and replace");
            return;
        }

        if(this.state.content.includes("linkImagine")){
            alert("Search after linkImagine and replace");
            return;
        }

        this.setState({
            modalVisible: true
        });
    }

    async onModalSave() {
        this.setState({
            modalVisible: false,
            loadingVisible: true
        });
        try {
            //load settings
            let response = await sendMail({
                subject: this.state.subject,
                content: this.state.content
            });
            if (response) {
                this.setState({
                    loadingVisible: false
                });
                alert(response);
            }
        } catch (e) {
            this.setState({
                loadingVisible: false
            });
            alert(e);
        }
    }


    closeModal() {
        this.setState({
            modalVisible: false
        });
    }

    public render() {
        return (
            <React.Fragment>
                <FadeLoader
                    loading={this.state.loadingVisible}
                    color={'#1641ff'}
                    css={spinnerCss}
                />
                <div className="modal">
                    <ReactModal
                        isOpen={this.state.modalVisible}
                        onRequestClose={this.closeModal}
                        shouldCloseOnOverlayClick={true}
                        role="dialog"
                        aria={{
                            labelledby: 'mediumModalLabel',
                        }}
                        style={{
                            overlay: {
                                zIndex: 10,
                                backgroundColor: 'rgba(0, 0, 0, 0.75)'
                            },
                            content: {
                                border: 'none',
                                background: 'transparent',
                                overflow: 'auto',
                            },
                        }}
                    >
                        <div className="modal-body">
                            <div dangerouslySetInnerHTML={{__html: this.state.content}}>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={this.closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.onModalSave}
                            >
                                Send notification mail
                            </button>
                        </div>
                    </ReactModal>
                </div>
                {!this.state.loadingVisible &&
                <React.Fragment>
                    <h3 className="title-5 m-b-35">Notification mail</h3>
                    <div>
                        <p>Daca folosesti template-ul default(cel de mai jos), pentru a trimite un mail de notificare trebuie inlocuite urmatoarele field-uri</p>
                        <p>procentCashback - procentul care va aparea mare langa "Nu rata!"</p>
                        <p>textCashback - textul copiat de la postarea de pe facebook</p>
                        <p>linkAcceseaza - dynamic link-ul generat pentru magazinul despre care se face postarea</p>
                        <p>linkImagine - link-ul spre poza de la postare</p>
                    </div>
                    <Button color="primary" variant="contained"
                            style={{marginBottom: 15}}
                            onClick={this.submitSendEmail}
                            size={"large"}>
                        Preview
                    </Button>
                    <TextField
                        id="subject"
                        label={"Mail Subject"}
                        variant="filled"
                        style={{width: '100%', marginBottom: 15}}
                        onChange={(event) => {
                            this.setState({
                                subject: event.target.value
                            })
                        }}
                        value={this.state.subject}
                    />
                    <textarea id="editor" name="body" style={{minHeight: 500}}
                              placeholder="Mail content..."
                              className="form-control" value={this.state.content}
                              onChange={(event) => {
                                  this.setState({
                                      content: event.target.value
                                  })
                              }}/>
                </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default Mails;