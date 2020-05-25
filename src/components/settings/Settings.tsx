import React from "react";
import { Button, TextField } from "@material-ui/core";
import { getSettings, SettingsDTO, updateSettings } from "../../rest/SettingsService";
import FadeLoader from 'react-spinners/FadeLoader';
import { spinnerCss } from "../../Helper";

interface SettingsProps {

}

interface SettingsState {
    settings: SettingsDTO,
    isLoading: boolean
}


class Settings extends React.Component<SettingsProps, SettingsState> {


    constructor(props: Readonly<SettingsProps>) {
        super(props);
        this.state = {
            settings: {
                cashoutEmails: []
            },
            isLoading: true
        };
        this.updateSettings = this.updateSettings.bind(this);
    }

    async updateSettings() {
        try {
            let response = await updateSettings(this.state.settings);
            if (response) {
                alert("Settings successfully updated");
                window.location.reload();
            } else {
                alert("Something went wrong with update");
            }
        } catch (e) {
            alert(e);
        }
    }

    async componentDidMount() {
        try {
            let response = await getSettings();
            if (response) {
                this.setState({
                    settings: response,
                    isLoading: false
                })
            } else {
                this.setState({
                    isLoading: false
                })
            }
        } catch (e) {
            console.log(e);
            //settings not loaded
        }
    }

    public render() {
        let cashoutMails = this.state.settings && this.state.settings.cashoutEmails ?
            this.state.settings.cashoutEmails.map(value => {
                return value;
            }) : '';

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="title-5 m-b-35">Settings</h3>
                        <FadeLoader
                            loading={this.state.isLoading}
                            color={'#1641ff'}
                            css={spinnerCss}
                        />
                        {!this.state.isLoading &&
                        <React.Fragment>
                            <TextField
                                id="amount" label={"To whom to send cashout notification email separated by comma, if empty, no mails will be delivered"}
                                variant="filled"
                                style={{width: '100%'}}
                                onChange={event => {
                                    let settings = this.state.settings;
                                    settings.cashoutEmails = (event.target.value as string).split(",");
                                    this.setState({
                                        settings: settings
                                    })
                                }}
                                value={cashoutMails}
                            />
                            <Button color="primary" variant="contained"
                                    style={{marginTop: 15}}
                                    onClick={this.updateSettings}
                                    size={"large"}>
                                Update
                            </Button>
                        </React.Fragment>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Settings;