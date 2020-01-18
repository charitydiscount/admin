import React from "react";

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
                                <tr className="tr-shadow">
                                    <td>
                                        <label className="au-checkbox">
                                            <input type="checkbox"/>
                                            <span className="au-checkmark"></span>
                                        </label>
                                    </td>
                                    <td>Lori Lynch</td>
                                    <td>
                                        <span className="block-email">john@example.com</span>
                                    </td>
                                    <td className="desc">iPhone X 64Gb Grey</td>
                                    <td>2018-09-29 05:57</td>
                                    <td>
                                        <span className="status--process">Processed</span>
                                    </td>
                                    <td>$999.00</td>
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
                                <tr className="tr-shadow">
                                    <td>
                                        <label className="au-checkbox">
                                            <input type="checkbox"/>
                                            <span className="au-checkmark"></span>
                                        </label>
                                    </td>
                                    <td>Lori Lynch</td>
                                    <td>
                                        <span className="block-email">lyn@example.com</span>
                                    </td>
                                    <td className="desc">iPhone X 256Gb Black</td>
                                    <td>2018-09-25 19:03</td>
                                    <td>
                                        <span className="status--denied">Denied</span>
                                    </td>
                                    <td>$1199.00</td>
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
                                <tr className="tr-shadow">
                                    <td>
                                        <label className="au-checkbox">
                                            <input type="checkbox"/>
                                            <span className="au-checkmark"></span>
                                        </label>
                                    </td>
                                    <td>Lori Lynch</td>
                                    <td>
                                        <span className="block-email">doe@example.com</span>
                                    </td>
                                    <td className="desc">Camera C430W 4k</td>
                                    <td>2018-09-24 19:10</td>
                                    <td>
                                        <span className="status--process">Processed</span>
                                    </td>
                                    <td>$699.00</td>
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