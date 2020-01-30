import React from "react";
import { ProgramDto } from "../../rest/ProgramService";

interface ProgramElementProps {
    program: ProgramDto
}

class ProgramElement extends React.Component<ProgramElementProps> {

    render(): React.ReactNode {
        return (
            <React.Fragment>
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
                            <button className="item" data-placement="top"
                                    title="Delete" data-toggle="modal"
                                    data-target="#mediumModal">
                                <i className="zmdi zmdi-edit"></i>
                            </button>
                            <button className="item" data-toggle="tooltip" data-placement="top"
                                    title="Delete">
                                <i className="zmdi zmdi-delete"></i>
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
