import React from 'react';
import { CharityCase } from '../../models/CharityCase';

export interface CaseFormProps {
    case?: CharityCase;
}

class CaseForm extends React.Component<CaseFormProps> {
    handleSubmit() {}

    render() {
        return (
            <div className="card">
                <div className="card-body card-block">
                    <form onSubmit={() => this.handleSubmit}>
                        <div className="form-group">
                            <label
                                htmlFor="title"
                                className=" form-control-label"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                placeholder="The charity case name"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="description"
                                className=" form-control-label"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Case details"
                                className="form-control"
                                rows={5}
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="website"
                                className=" form-control-label"
                            >
                                Website
                            </label>
                            <input
                                type="text"
                                id="website"
                                placeholder="https://new-case.com"
                                className="form-control"
                            />
                        </div>
                        <div className="row form-group">
                            <div className="col-8">
                                <div className="form-group">
                                    <label
                                        htmlFor="images"
                                        className=" form-control-label"
                                    >
                                        Images
                                    </label>
                                    <input
                                        type="text"
                                        id="images"
                                        placeholder="Add image links"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CaseForm;
