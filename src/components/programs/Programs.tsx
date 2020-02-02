import React from 'react';
import { getPrograms, ProgramDto } from '../../rest/ProgramService';
import ProgramElement from './ProgramElement';
import FadeLoader from 'react-spinners/FadeLoader';
import { spinnerCss } from '../../Helper';
import { Button, TextField } from "@material-ui/core";

interface ProgramsProps {
}

interface ProgramsState {
    isLoading: boolean;
    programs: ProgramDto[];
    defaultProgramList: ProgramDto[];
}

class Programs extends React.Component<ProgramsProps, ProgramsState> {

    private search: string = '';

    constructor(props: Readonly<ProgramsProps>) {
        super(props);
        this.state = {
            isLoading: true,
            programs: [],
            defaultProgramList: []
        };
        this.searchPrograms = this.searchPrograms.bind(this);
        this.enterSearch = this.enterSearch.bind(this);
    }

    async componentDidMount() {
        document.addEventListener('keydown', this.enterSearch, false);
        try {
            let response = await getPrograms();
            if (response) {
                this.setState({
                    isLoading: false,
                    programs: response,
                    defaultProgramList: response,
                });
            }
        } catch (error) {
            //programs not loaded
        }
    }

    enterSearch(event) {
        if (event.keyCode === 13) {
            this.searchPrograms();
        }
    }

    searchPrograms() {
        if (this.search) {
            let resultedPrograms = this.state.defaultProgramList.filter(value => value.name.startsWith(this.search) || value.uniqueCode.startsWith(this.search));
            this.setState({
                programs: resultedPrograms
            })
        } else {
            this.setState({
                programs: this.state.defaultProgramList
            })
        }

    }

    public render() {
        let programsList =
            this.state.programs &&
            this.state.programs.length > 0 &&
            this.state.programs.map((value, index) => {
                return (
                    <ProgramElement key={index} program={value}/>
                );
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
                        {!this.state.isLoading && (
                            <React.Fragment>
                                <div className="table-data__tool">
                                    <div className="table-data__tool-left">
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            style={{marginTop:25}}
                                            size={"large"}
                                            onClick={
                                                this.searchPrograms
                                            }
                                        >
                                            >
                                        </Button>
                                        <div className="rs-select2--light rs-select2--md">
                                            <TextField
                                                id="commisionVariable" label={"Search after name or uniqueCode"}
                                                style={{width: '100%', marginLeft:8}}
                                                onChange={event => this.search = event.target.value}
                                            />
                                        </div>
                                    </div>
                                    <div className="table-data__tool-right">
                                        <button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                            <i className="zmdi zmdi-plus"></i>
                                            add item
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
                                            <th>main order</th>
                                            <th>status</th>
                                            <th>category</th>
                                            <th>interval</th>
                                            <th>dlca</th>
                                            <th>dlct</th>
                                            <th>dscr</th>
                                            <th>dsct</th>
                                        </tr>
                                        </thead>
                                        <tbody>{programsList}</tbody>
                                    </table>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Programs;
