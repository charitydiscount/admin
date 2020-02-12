import React from "react";
import { ProgramDto, updateProgram } from "../../rest/ProgramService";
import { TextField } from '@material-ui/core';
import { emptyHrefLink, SourceTypes } from "../../Helper";
import Modal from '../modal';

interface ProgramElementState {
    modalVisible: boolean
    program: ProgramDto
}

interface ProgramElementProps {
    program: ProgramDto
}

class ProgramElement extends React.Component<ProgramElementProps, ProgramElementState> {

    constructor(props: ProgramElementProps) {
        super(props);
        this.state = {
            modalVisible: false,
            program: this.props.program
        };
        this.onModalSave = this.onModalSave.bind(this);
    }

    openModal() {
        this.setState({
            program: this.props.program,
            modalVisible: true,
        });
    }

    closeModal() {
        this.setState({
            modalVisible: false,
        });
    }

    async onModalSave() {
        try {
            let response = await updateProgram(this.props.program);
            if (response) {
                alert("Program successfully updated");
                window.location.reload();
            } else {
                alert("Something went wrong with update");
            }
        } catch (e) {
            alert(e);
        }
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Modal
                    visible={this.state.modalVisible}
                    onClose={() => this.closeModal()}
                    title="Update program"
                    onSave={() => this.onModalSave()}
                >
                    {this.state.modalVisible &&
                    <React.Fragment>
                        <TextField
                            id="uniqueCode" label={"Unique code"} variant="filled" style={{width: '100%'}}
                            value={this.state.program.uniqueCode} disabled={true}
                        />
                        {this.props.program.source === SourceTypes.TWO_PERFORMANT &&
                        <React.Fragment>
                            <TextField
                                id="name" label={"Name"} variant="filled" style={{width: '100%'}}
                                value={this.state.program.name} disabled={true}
                            />
                            <TextField
                                id="mainorder" label={"Main Order"} type="number" variant="filled"
                                style={{width: '100%'}} value={this.props.program.mainOrder}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.mainOrder = parseInt(event.target.value);
                                    this.setState({
                                        program: program
                                    });
                                }}
                            />
                            {this.props.program.defaultSaleCommissionType === 'variable' &&
                            <TextField
                                id="commisionVariable"
                                label={"Commision variable, take care to show 0.60 % percent to client"}
                                variant="filled" style={{width: '100%'}} value={this.state.program.commissionInterval}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.commissionInterval = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            }
                        </React.Fragment>
                        }
                        {this.props.program.source !== SourceTypes.TWO_PERFORMANT &&
                        <React.Fragment>
                            <TextField
                                id="name" label={"Name"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.name}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.name = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="category" label={"Category"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.category}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.category = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="status" label={"Status"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.status}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.status = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="source" label={"Source"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.source}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.source = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="logoPath" label={"Logo Path"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.logoPath}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.logoPath = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="mainUrl" label={"Main Url"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.mainUrl}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.mainUrl = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="mainorder" label={"Main Order"} type="number" variant="filled"
                                style={{width: '100%'}} value={this.state.program.mainOrder}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.mainOrder = parseInt(event.target.value);
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="averagePaymentTime" label={"Average Payment Time"} variant="filled" type="number"
                                style={{width: '100%'}} value={this.state.program.averagePaymentTime}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.averagePaymentTime = parseInt(event.target.value);
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="commissionInterval"
                                label={"Commision variable, take care to show 0.60 % percent to client"}
                                variant="filled"
                                style={{width: '100%'}} value={this.state.program.commissionInterval}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.commissionInterval = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="defaultLeadCommissionAmount" label={"Default Lead Commission Amount"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.defaultLeadCommissionAmount}
                                onChange={event => {
                                    let program = this.state.program;
                                    program.defaultLeadCommissionAmount = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="defaultLeadCommissionType" label={"Default Lead Commission Type"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.defaultLeadCommissionType }
                                onChange={event => {
                                    let program = this.state.program;
                                    program.defaultLeadCommissionType = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="defaultSaleCommissionRate" label={"Default Sale Commission Rate"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.defaultSaleCommissionRate }
                                onChange={event => {
                                    let program = this.state.program;
                                    program.defaultSaleCommissionRate = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                            <TextField
                                id="defaultSaleCommissionType" label={"Default Sale Commission Type"} variant="filled"
                                style={{width: '100%'}} value={this.state.program.defaultSaleCommissionType }
                                onChange={event => {
                                    let program = this.state.program;
                                    program.defaultSaleCommissionType = event.target.value;
                                    this.setState({
                                        program: program
                                    })
                                }
                                }
                            />
                        </React.Fragment>
                        }
                    </React.Fragment>
                    }
                </Modal>
                <tr className="tr-shadow">
                    <td>{this.props.program.uniqueCode}</td>
                    <td style={{maxWidth: 150, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                        <a href={emptyHrefLink} style={{
                            textDecoration: "underline",
                            color: "#007bff",
                            cursor: "pointer"
                        }} onClick={() => this.openModal()}>
                            {this.props.program.name}
                        </a>
                    </td>
                    <td>{this.props.program.order}</td>
                    <td>{this.props.program.mainOrder}</td>
                    <td>{this.props.program.commissionInterval}</td>
                    <td>{this.props.program.defaultLeadCommissionAmount}</td>
                    <td>{this.props.program.defaultLeadCommissionType}</td>
                    <td>{this.props.program.defaultSaleCommissionRate}</td>
                    <td>{this.props.program.defaultSaleCommissionType}</td>
                </tr>
                <tr className="spacer"/>
            </React.Fragment>
        );
    }
}

export default ProgramElement;
