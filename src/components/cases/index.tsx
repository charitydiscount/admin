import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import { spinnerCss } from '../../Helper';
import { CharityCase } from '../../models/CharityCase';
import Case from './Case';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducer/RootReducer';
import { loadCases } from '../../redux/actions/Cases';
import Modal from '../modal';
import CaseForm from './CaseForm';

interface StateProps {
    cases?: CharityCase[];
}

interface DispatchProps {
    loadCases: Function;
}

interface ComponentState {
    showModal: boolean;
}

class Cases extends React.Component<
    StateProps & DispatchProps,
    ComponentState
> {
    constructor(props: StateProps & DispatchProps) {
        super(props);
        this.state = {
            showModal: false,
        };
    }

    componentDidMount() {
        this.props.loadCases();
    }

    showCaseModal() {
        this.setState({
            showModal: true,
        });
    }

    onSave(charityCase: CharityCase) {}

    public render() {
        let casesList =
            this.props.cases &&
            this.props.cases.length > 0 &&
            this.props.cases.map(charityCase => {
                return <Case key={charityCase.title} case={charityCase} />;
            });

        return (
            <React.Fragment>
                {this.state.showModal && (
                    <Modal
                        title="New Charity Case"
                        onSave={() => this.onSave}
                        onClose={() => this.setState({ showModal: false })}
                    >
                        <CaseForm></CaseForm>
                    </Modal>
                )}
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">Cases</h3>
                        {this.props.cases === undefined ? (
                            <FadeLoader
                                loading={true}
                                color={'#1641ff'}
                                css={spinnerCss}
                            />
                        ) : (
                            <React.Fragment>
                                <div className="table-data__tool">
                                    <div className="table-data__tool-left"></div>
                                    <div className="table-data__tool-right">
                                        <button
                                            className="au-btn au-btn-icon au-btn--green au-btn--small"
                                            data-toggle="modal"
                                            onClick={() => this.showCaseModal()}
                                        >
                                            <i className="zmdi zmdi-plus"></i>
                                            add case
                                        </button>
                                    </div>
                                </div>
                                <div className="table-responsive table-responsive-data2">
                                    <table className="table table-data2">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Website</th>
                                                <th>Images</th>
                                                <th>Funds</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>{casesList}</tbody>
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

const mapStateToProps = (state: AppState): StateProps => {
    return {
        cases: state.cases.cases,
    };
};

export default connect(mapStateToProps, { loadCases })(Cases);
