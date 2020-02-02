import React from 'react';
import { ProgramDto } from '../../rest/ProgramService';
import Modal from '../modal';
import { TextField } from '@material-ui/core';

interface ProgramElementState {
    modalVisible: boolean;
}

interface ProgramElementProps {
    program: ProgramDto;
}

class ProgramElement extends React.Component<
    ProgramElementProps,
    ProgramElementState
> {
    constructor(props: ProgramElementProps) {
        super(props);
        this.state = {
            modalVisible: false,
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
                {this.state.modalVisible && (
                    <Modal
                        visible={this.state.modalVisible}
                        onClose={() => this.closeModal()}
                        onSave={() => {}}
                        title={this.props.program.name}
                    >
                        <React.Fragment>
                            <TextField
                                id="name"
                                label={'Da1'}
                                variant="filled"
                                style={{ width: '100%' }}
                                value={this.props.program.name}
                                disabled={true}
                            />
                            <TextField
                                id="name"
                                label={'Da1'}
                                variant="filled"
                                style={{ width: '100%' }}
                                value={this.props.program.name}
                                disabled={true}
                            />
                            <TextField
                                id="name"
                                label={'Da1'}
                                variant="filled"
                                style={{ width: '100%' }}
                                value={this.props.program.name}
                                disabled={true}
                            />
                        </React.Fragment>
                    </Modal>
                )}
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
                            <button
                                className="item"
                                onClick={() => this.openModal()}
                            >
                                <i className="zmdi zmdi-edit" />
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
