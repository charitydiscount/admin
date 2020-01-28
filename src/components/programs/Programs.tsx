import React from "react";
import { getPrograms, ProgramDto } from "../../rest/ProgramService";
import ProgramElement from "./ProgramElement";

interface ProgramsProps {

}

interface ProgramsState {
    programs: ProgramDto[]
}

class Programs extends React.Component<ProgramsProps, ProgramsState> {


    constructor(props: Readonly<ProgramsProps>) {
        super(props);
        this.state = {
            programs: []
        }
    }

    async componentDidMount() {
        try {
            let response = await getPrograms();
            if (response) {
                this.setState({
                    programs: response as ProgramDto[]
                });
            }
        } catch (error) {
            //programs not loaded
        }
    }


    public render() {
        let programsList = this.state.programs && this.state.programs.length > 0 && this.state.programs.map(value => {
            return <ProgramElement key={value.uniqueCode} program={value}/>
        });

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">programs</h3>
                        <div className="table-data__tool">
                            <div className="table-data__tool-left">
                            </div>
                            <div className="table-data__tool-right">
                                <button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                    <i className="zmdi zmdi-plus"></i>add item
                                </button>
                            </div>
                        </div>
                        <div className="table-responsive table-responsive-data2">
                            <table className="table table-data2">
                                <thead>
                                <tr>
                                    <th>
                                        <label className="au-checkbox">
                                            <input type="checkbox"/>
                                            <span className="au-checkmark"></span>
                                        </label>
                                    </th>
                                    <th>id</th>
                                    <th>uniqueCode</th>
                                    <th>name</th>
                                    <th>order</th>
                                    <th>status</th>
                                    <th>category</th>
                                    <th>category</th>
                                    <th>dlca</th>
                                    <th>dlct</th>
                                    <th>dscr</th>
                                    <th>dsct</th>
                                </tr>
                                </thead>
                                <tbody>
                                {programsList}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default Programs;