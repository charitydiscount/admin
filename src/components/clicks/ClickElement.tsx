import React from "react";
import { blueColor, dateOptions, mediumSpinnerCss } from "../../Helper";
import { ClickDto, updateClick } from "../../rest/ClicksService";
import Modal from '../modal';
import { TextField } from "@material-ui/core";
import FadeLoader from 'react-spinners/FadeLoader';
import ElementTableLink from "../general/ElementTableLink";

interface ClickElementProps {
    click: ClickDto
}

interface ClickElementState {
    modalVisible: boolean,
    isLoadingUpdate: boolean,
    click: ClickDto
}

class ClickElement extends React.Component<ClickElementProps, ClickElementState> {

    constructor(props: ClickElementProps) {
        super(props);
        this.state = {
            modalVisible: false,
            isLoadingUpdate: false,
            click: this.props.click
        };

    }

    openModal = () => {
        this.setState({
            click: this.props.click,
            modalVisible: true,
        });
    };

    closeModal = () => {
        this.setState({
            modalVisible: false,
        });
    };

    onModalSave = async () => {
        try {
            this.setState({
                isLoadingUpdate: true
            });

            let response = await updateClick(this.props.click.id, this.state.click);
            if (response) {
                alert("Click successfully updated");
                window.location.reload();
            } else {
                alert("Something went wrong with update");
                this.setState({
                    isLoadingUpdate: false
                });

            }
        } catch (e) {
            alert(e);
            this.setState({
                isLoadingUpdate: false
            });

        }
    };

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Modal
                    visible={this.state.modalVisible}
                    onClose={() => this.closeModal()}
                    title="Update click"
                    onSave={() => this.onModalSave()}
                >
                    {this.state.modalVisible &&
                    <React.Fragment>
                        <FadeLoader
                            loading={this.state.isLoadingUpdate}
                            color={blueColor}
                            css={mediumSpinnerCss}
                        />
                        {!this.state.isLoadingUpdate &&
                        <React.Fragment>
                            <TextField
                                id="clickIdUpdate" label={"Click id"} variant="filled" style={{width: '100%'}}
                                value={this.props.click.id} disabled={true}
                            />
                            <TextField id="userIdUpdate" label={"User Id"} variant="filled" style={{width: '100%'}}
                                       value={this.state.click.userId}
                                       onChange={(event) => {
                                           let click = this.state.click;
                                           click.userId = event.target.value;
                                           this.setState({
                                               click: click
                                           })
                                       }}
                            />
                            <TextField id="ipAddressUpdate" label={"Ip Address"} variant="filled"
                                       style={{width: '100%'}}
                                       value={this.state.click.ipAddress}
                                       onChange={(event) => {
                                           let click = this.state.click;
                                           click.ipAddress = event.target.value;
                                           this.setState({
                                               click: click
                                           })
                                       }}
                            />
                            <TextField id="ipv6AddressUpdate" label={"Ipv6 Address"} variant="filled"
                                       style={{width: '100%'}}
                                       value={this.state.click.ipv6Address}
                                       onChange={(event) => {
                                           let click = this.state.click;
                                           click.ipv6Address = event.target.value;
                                           this.setState({
                                               click: click
                                           })
                                       }}
                            />
                            <TextField id="deviceTypeUpdate" label={"Device(ANDROID,IOS,BROWSER)"} variant="filled"
                                       style={{width: '100%'}}
                                       value={this.state.click.deviceType}
                                       onChange={(event) => {
                                           let click = this.state.click;
                                           click.deviceType = event.target.value;
                                           this.setState({
                                               click: click
                                           })
                                       }}
                            />
                            <TextField id="programIdUpdate" label={"Program Id"} variant="filled"
                                       style={{width: '100%'}}
                                       value={this.state.click.programId}
                                       onChange={(event) => {
                                           let click = this.state.click;
                                           click.programId = event.target.value;
                                           this.setState({
                                               click: click
                                           })
                                       }}
                            />
                        </React.Fragment>}
                    </React.Fragment>
                    }
                </Modal>
                <tr className="tr-shadow">
                    <td>{
                        this.props.click.createdAt &&
                        new Date(parseFloat(this.props.click.createdAt._seconds) * 1000).toLocaleDateString('ro-RO', dateOptions)}
                    </td>
                    <ElementTableLink text={this.props.click.id} onClick={this.openModal}/>
                    <td>{this.props.click.ipAddress}</td>
                    <td>{this.props.click.deviceType}</td>
                    <td>{this.props.click.programId}</td>
                    <td>{this.props.click.userId}</td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

export default ClickElement;
