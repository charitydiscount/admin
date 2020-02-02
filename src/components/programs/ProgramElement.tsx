import React from "react";
import { ProgramDto } from "../../rest/ProgramService";
import Modal from 'react-awesome-modal';
import { TextField } from '@material-ui/core';

interface ProgramElementState {
    modalVisible: boolean
}

interface ProgramElementProps {
    program: ProgramDto
}

class ProgramElement extends React.Component<ProgramElementProps, ProgramElementState> {

    constructor(props: ProgramElementProps) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }


    openModal() {
        this.setState({
            modalVisible: true,
        });
    }

    closeModal() {
        this.setState({
            modalVisible: false,
        });
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Modal
                    visible={this.state.modalVisible}
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    {this.state.modalVisible && (

                        <React.Fragment>
                                <div className="modal-dialog modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="mediumModalLabel">Edit program</h5>
                                            <button className="close" aria-label="Close" onClick={() => this.closeModal()}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <TextField
                                                id="name" label={"Da1"}
                                                variant="filled"
                                                style={{width: '100%'}}
                                                value={this.props.program.name}
                                                disabled={true}
                                            />
                                            <TextField
                                                id="name" label={"Da1"}
                                                variant="filled"
                                                style={{width: '100%'}}
                                                value={this.props.program.name}
                                                disabled={true}
                                            />
                                            <TextField
                                                id="name" label={"Da1"}
                                                variant="filled"
                                                style={{width: '100%'}}
                                                value={this.props.program.name}
                                                disabled={true}
                                            />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => this.closeModal()}>Cancel</button>
                                            <button type="button" className="btn btn-primary">Confirm</button>
                                        </div>
                                    </div>
                                </div>
                        </React.Fragment>
                    )
                    }
                </Modal>
                <tr className="tr-shadow">
                    <td>{this.props.program.id}</td>
                    <td>{this.props.program.uniqueCode}</td>
                    <td>{this.props.program.name}</td>
                    <td>{this.props.program.order}</td>
                    <td>{this.props.program.status}</td>
                    <td>{this.props.program.category}</td>
                    <td>{this.props.program.defaultLeadCommissionAmount}</td>
                    <td>{this.props.program.defaultLeadCommissionType}</td>
                    <td>{this.props.program.defaultSaleCommissionRate}</td>
                    <td>{this.props.program.defaultSaleCommissionType}</td>
                    <td>
                        <div className="table-data-feature">
                            <button className="item" onClick={() => this.openModal()}>
                                <i className="zmdi zmdi-edit"/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

export default ProgramElement;
