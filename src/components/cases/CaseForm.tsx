import React from 'react';
import { CharityCase } from '../../models/CharityCase';

export interface CaseFormProps {
    case?: CharityCase[];
}

class CaseForm extends React.Component<CaseFormProps> {
    handleSubmit() {}

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <strong>Company</strong>
                    <small> Form</small>
                </div>
                <div className="card-body card-block">
                    <form onSubmit={() => this.handleSubmit}>
                        <div className="form-group">
                            <label
                                htmlFor="company"
                                className=" form-control-label"
                            >
                                Company
                            </label>
                            <input
                                type="text"
                                id="company"
                                placeholder="Enter your company name"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="vat"
                                className=" form-control-label"
                            >
                                VAT
                            </label>
                            <input
                                type="text"
                                id="vat"
                                placeholder="DE1234567890"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="street"
                                className=" form-control-label"
                            >
                                Street
                            </label>
                            <input
                                type="text"
                                id="street"
                                placeholder="Enter street name"
                                className="form-control"
                            />
                        </div>
                        <div className="row form-group">
                            <div className="col-8">
                                <div className="form-group">
                                    <label
                                        htmlFor="city"
                                        className=" form-control-label"
                                    >
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        placeholder="Enter your city"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="form-group">
                                    <label
                                        htmlFor="postal-code"
                                        className=" form-control-label"
                                    >
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        id="postal-code"
                                        placeholder="Postal Code"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="country"
                                className=" form-control-label"
                            >
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                placeholder="Country name"
                                className="form-control"
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CaseForm;
