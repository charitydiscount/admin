import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';
import { spinnerCss, Operation } from '../../Helper';
import { CharityCase } from '../../models/CharityCase';
import Case from './Case';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducer/RootReducer';
import { loadCases } from '../../redux/actions/Cases';
import Modal from '../modal';
import CaseForm from './CaseForm';
import { updateCase, deleteCase, createCase } from '../../rest/CasesService';

interface StateProps {
    cases?: CharityCase[];
}

interface DispatchProps {
    loadCases: Function;
}

interface ComponentState {
    modalVisible: boolean;
    currentCase?: CharityCase;
    saving: boolean;
}

class Cases extends React.Component<
    StateProps & DispatchProps,
    ComponentState
> {
    constructor(props: StateProps & DispatchProps) {
        super(props);
        this.state = {
            modalVisible: false,
            saving: false,
        };

        this.onCaseChange = this.onCaseChange.bind(this);
        this.onAddImage = this.onAddImage.bind(this);
        this.onRemoveImage = this.onRemoveImage.bind(this);
        this.onDeleteCase = this.onDeleteCase.bind(this);
    }

    componentDidMount() {
        this.props.loadCases();
    }

    showCaseModal(operation: Operation, selectedCase?: CharityCase) {
        let currentCase: CharityCase = {
            title: '',
            description: '',
            site: '',
            images: [],
        };
        if (operation === Operation.UPDATE && selectedCase) {
            currentCase = selectedCase;
        }

        this.setState({
            modalVisible: true,
            currentCase: currentCase,
        });
    }

    onCloseModal() {
        this.setState({ modalVisible: false });
    }

    onSave() {
        //TODO Validate fields
        //TODO Save the case
        if (this.state.currentCase) {
            this.setState({
                saving: true,
            });
            if (this.state.currentCase.id) {
                updateCase(this.state.currentCase).then(() => {
                    this.setState({ modalVisible: false, saving: false });
                    this.props.loadCases();
                });
            } else {
                createCase(this.state.currentCase).then(() => {
                    this.setState({ modalVisible: false, saving: false });
                    this.props.loadCases();
                });
            }
        }
    }

    onCaseChange(field: string, value: any) {
        if (this.state.currentCase) {
            this.setState({
                currentCase: {
                    ...this.state.currentCase,
                    [field]: value,
                },
            });
        }
    }

    onAddImage(imageUrl: string) {
        if (!this.state.currentCase) {
            return;
        }

        this.setState({
            currentCase: {
                ...this.state.currentCase,
                images: this.state.currentCase.images.concat({ url: imageUrl }),
            },
        });
    }

    onRemoveImage(imageUrl: string) {
        if (!this.state.currentCase) {
            return;
        }

        this.setState({
            currentCase: {
                ...this.state.currentCase,
                images: this.state.currentCase.images.filter(
                    i => i.url !== imageUrl
                ),
            },
        });
    }

    onDeleteCase(charityCase: CharityCase) {
        deleteCase(charityCase).then(() => {
            this.setState({ saving: false });
            this.props.loadCases();
        });
    }

    public render() {
        let casesList =
            this.props.cases &&
            this.props.cases.length > 0 &&
            this.props.cases.map(charityCase => {
                return (
                    <Case
                        key={charityCase.title}
                        case={charityCase}
                        onEdit={() =>
                            this.showCaseModal(Operation.UPDATE, charityCase)
                        }
                        onDelete={() => this.onDeleteCase(charityCase)}
                    />
                );
            });

        return (
            <React.Fragment>
                {this.state.modalVisible && (
                    <Modal
                        visible={this.state.modalVisible}
                        onClose={() => this.onCloseModal()}
                        title="New Charity Case"
                        onSave={() => this.onSave()}
                    >
                        <CaseForm
                            case={this.state.currentCase}
                            onChange={this.onCaseChange}
                            onAddImage={this.onAddImage}
                            onRemoveImage={this.onRemoveImage}
                        ></CaseForm>
                    </Modal>
                )}
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">Cases</h3>
                        {this.props.cases === undefined || this.state.saving ? (
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
                                            onClick={() =>
                                                this.showCaseModal(
                                                    Operation.CREATE
                                                )
                                            }
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
