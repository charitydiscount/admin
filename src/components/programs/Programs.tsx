import React from "react";
import { getPrograms, ProgramDto } from "../../rest/ProgramService";
import ProgramElement from "./ProgramElement";
import FadeLoader from 'react-spinners/FadeLoader';
import { spinnerCss } from "../../Helper";

interface ProgramsProps {

}

interface ProgramsState {
    isLoading: boolean,
    programs: ProgramDto[]
}

class Programs extends React.Component<ProgramsProps, ProgramsState> {


    constructor(props: Readonly<ProgramsProps>) {
        super(props);
        this.state = {
            isLoading: true,
            programs: []
        }
    }

    async componentDidMount() {
        try {
            let response = await getPrograms();
            if (response) {
                this.setState({
                    isLoading: false,
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
                        <FadeLoader
                            loading={this.state.isLoading}
                            color={'#1641ff'}
                            css={spinnerCss}
                        />
                        {!this.state.isLoading &&
                        <React.Fragment>
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
                                        <th>id</th>
                                        <th>uniqueCode</th>
                                        <th>name</th>
                                        <th>order</th>
                                        <th>status</th>
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
                        </React.Fragment>
                        }
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default Programs;