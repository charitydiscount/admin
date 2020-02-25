import React from "react";
import { CashoutDto } from "../../rest/CashoutService";
import { dateOptions } from "../../Helper";

interface CashoutElementProps {
    cashout: CashoutDto
}

interface CashoutElementState {

}

class CashoutElement extends React.Component<CashoutElementProps, CashoutElementState> {

    render(): React.ReactNode {
        let statusColumn;
        if (this.props.cashout.status === "PAID") {
            statusColumn = <td style={{backgroundColor: "#6eff24"}}>{this.props.cashout.status}</td>;
        } else if (this.props.cashout.status === "REJECTED") {
            statusColumn = <td style={{backgroundColor: "#ff4c4f"}}>{this.props.cashout.status}</td>;
        } else {
            statusColumn = <td style={{backgroundColor: "#fffc82"}}>{this.props.cashout.status}</td>;
        }

        return (
            <React.Fragment>
                <tr className="tr-shadow">
                    <td>{new Date(parseFloat(this.props.cashout.createdAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)}</td>
                    <td>{this.props.cashout.userId}</td>
                    {statusColumn}
                    <td>{this.props.cashout.amount}</td>
                    <td>{this.props.cashout.target}</td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

export default CashoutElement