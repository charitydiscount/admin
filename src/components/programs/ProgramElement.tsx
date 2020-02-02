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
            modalVisible: true,
        });
    }

    closeModal() {
        this.setState({
            modalVisible: false,
            program: this.props.program
        });
    }

    async onModalSave() {
        try {
            let response = await updateProgram(this.state.program);
            if (response) {
                alert("Program successfully updated");
                window.location.reload();
            } else {
                alert("Something went wrong with update");
            }
        } catch (e) {
            console.log(e);
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
                            id="name" label={"Name"}
                            variant="filled"
                            style={{width: '100%'}}
                            value={this.state.program.name}
                            disabled={true}
                        />
                        <TextField
                            id="mainorder" label={"Main Order"}
                            type="number"
                            variant="filled"
                            style={{width: '100%'}}
                            value={this.props.program.mainOrder}
                            onChange={event => {
                                let program = this.state.program;
                                program.mainOrder = parseInt(event.target.value);
                                this.setState({
                                    program: program
                                })
                            }
                            }
                        />
                        {this.props.program.defaultSaleCommissionType === 'variable' &&
                        <TextField
                            id="commisionVariable" label={"Commision variable, take care to show 0.60 % percent to client"}
                            variant="filled"
                            style={{width: '100%'}}
                            value={this.props.program.commissionInterval}
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
                        {this.props.program.source === SourceTypes.TWO_PERFORMANT &&
                        <React.Fragment>

                        </React.Fragment>
                        }
                        {this.props.program.source !== SourceTypes.TWO_PERFORMANT &&
                        <React.Fragment>

                        </React.Fragment>
                        }
                    </React.Fragment>
                    }
                </Modal>
                <tr className="tr-shadow">
                    <td>{this.props.program.id}</td>
                    <td>{this.props.program.uniqueCode}</td>
                    <td>
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
                    <td>{this.props.program.status}</td>
                    <td>{this.props.program.category}</td>
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
