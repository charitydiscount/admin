import React from "react";
import {CommissionDto} from "../../rest/Mocks";
import CommissionsElement from "./CommissionElement";

interface CommissionsState {
    commissions: CommissionDto[]
}

class Commissions extends React.Component {

    public render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">data table</h3>
                        <div className="table-data__tool">
                            <div className="table-data__tool-left">
                                <div className="rs-select2--light rs-select2--md">
                                    <select className="js-select2" name="property">
                                        {/*<option selected="selected">All Properties</option>*/}
                                        <option value="">Option 1</option>
                                        <option value="">Option 2</option>
                                    </select>
                                    <div className="dropDownSelect2"></div>
                                </div>
                                <div className="rs-select2--light rs-select2--sm">
                                    <select className="js-select2" name="time">
                                        {/*<option selected="selected">Today</option>*/}
                                        <option value="">3 Days</option>
                                        <option value="">1 Week</option>
                                    </select>
                                    <div className="dropDownSelect2"></div>
                                </div>
                                <button className="au-btn-filter">
                                    <i className="zmdi zmdi-filter-list"></i>filters
                                </button>
                            </div>
                            <div className="table-data__tool-right">
                                <button className="au-btn au-btn-icon au-btn--green au-btn--small">
                                    <i className="zmdi zmdi-plus"></i>add item
                                </button>
                                <div className="rs-select2--dark rs-select2--sm rs-select2--dark2">
                                    <select className="js-select2" name="type">
                                        {/*<option selected="selected">Export</option>*/}
                                        <option value="">Option 1</option>
                                        <option value="">Option 2</option>
                                    </select>
                                    <div className="dropDownSelect2"></div>
                                </div>
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
                                    <th>name</th>
                                    <th>email</th>
                                    <th>description</th>
                                    <th>date</th>
                                    <th>status</th>
                                    <th>price</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    <CommissionsElement/>
                                    <CommissionsElement/>
                                    <CommissionsElement/>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default Commissions;