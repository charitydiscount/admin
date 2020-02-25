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
        return (
            <React.Fragment>
                <tr className="tr-shadow">
                    <td>{new Date(parseFloat(this.props.cashout.createdAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)}</td>
                    <td>{this.props.cashout.userId}</td>
                    <td>{this.props.cashout.status}</td>
                    <td>{this.props.cashout.amount}</td>
                    <td>{this.props.cashout.target}</td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

export default CashoutElement