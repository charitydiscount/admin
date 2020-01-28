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
                    <td>
                        <label className="au-checkbox">
                            <input type="checkbox"/>
                            <span className="au-checkmark"></span>
                        </label>
                    </td>
                    <td>Lori Lynch</td>
                    <td>
                        <span className="block-email">lori@example.com</span>
                    </td>
                    <td className="desc">Samsung S8 Black</td>
                    <td>2018-09-27 02:12</td>
                    <td>
                        <span className="status--process">Processed</span>
                    </td>
                    <td>$679.00</td>
                    <td>
                        <div className="table-data-feature">
                            <button className="item" data-toggle="tooltip" data-placement="top"
                                    title="Send">
                                <i className="zmdi zmdi-mail-send"></i>
                            </button>
                            <button className="item" data-toggle="tooltip" data-placement="top"
                                    title="Edit">
                                <i className="zmdi zmdi-edit"></i>
                            </button>
                            <button className="item" data-toggle="tooltip" data-placement="top"
                                    title="Delete">
                                <i className="zmdi zmdi-delete"></i>
                            </button>
                            <button className="item" data-toggle="tooltip" data-placement="top"
                                    title="More">
                                <i className="zmdi zmdi-more"></i>
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
