import React from "react";
import { Button, TextField } from "@material-ui/core";
import { getSettings, SettingsDTO, updateSettings } from "../../rest/SettingsService";
import FadeLoader from 'react-spinners/FadeLoader';
import { spinnerCss } from "../../Helper";
import {
    CategoryDto, getCategories,
    getImportantCategories,
    ImportantCategoryDto,
    updateImportantCategories
} from "../../rest/CategoriesService";
import ImportantCategory from "./ImportantCategory";

interface SettingsProps {

}

interface SettingsState {
    settings: SettingsDTO,
    importantCategories: ImportantCategoryDto[],
    currentCategoryIndex: number,
    isLoadingSettings: boolean,
    isLoadingImportantCategories: boolean,
    availableCategories: CategoryDto[]
}

/**
 * Settings panel
 */
class Settings extends React.Component<SettingsProps, SettingsState> {

    constructor(props: Readonly<SettingsProps>) {
        super(props);
        this.state = {
            settings: {
                cashoutEmails: []
            },
            importantCategories: [],
            availableCategories: [],
            currentCategoryIndex: 0,
            isLoadingSettings: true,
            isLoadingImportantCategories: true
        };
        this.updateSettings = this.updateSettings.bind(this);
        this.updateImportantCategories = this.updateImportantCategories.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
        this.handleUploadStart = this.handleUploadStart.bind(this);
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

    async updateImportantCategories() {
        try {
            let response = await updateImportantCategories(this.state.importantCategories);
            if (response) {
                alert("Categories successfully updated");
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
            //load settings
            let response = await getSettings();
            if (response) {
                this.setState({
                    settings: response,
                    isLoadingSettings: false
                })
            }
            //load important categories
            let responseImpCat = await getImportantCategories();
            if (responseImpCat) {
                this.setState({
                    importantCategories: responseImpCat,
                    isLoadingImportantCategories: false
                })
            }

            //loat available categories
            let responseAvailableCategories = await getCategories();
            if (response) {
                this.setState({
                    availableCategories: responseAvailableCategories
                });
            }
        } catch (e) {
            console.log(e);
            this.setState({
                isLoadingSettings: false,
                isLoadingImportantCategories: false
            });
        }
    }

    handleUploadSuccess(filename) {
        let importantCategories = this.state.importantCategories;
        importantCategories[this.state.currentCategoryIndex].photoName = filename;
        this.setState({
            importantCategories: importantCategories
        });
        this.updateImportantCategories()
    }

    handleUploadStart(index) {
        this.setState({currentCategoryIndex: index});
    }

    public render() {
        let cashoutMails = this.state.settings && this.state.settings.cashoutEmails ?
            this.state.settings.cashoutEmails.map(value => {
                return value;
            }) : '';

        let availableCategories = this.state.availableCategories && this.state.availableCategories.map(
            (value, index) => {
                return index + ". " + value.category + " ";
            }
        );


        let importantCategories = this.state.importantCategories && this.state.importantCategories.map(
            (value, index) => {
                return <ImportantCategory key={index}
                                          index={index}
                                          category={value}
                                          onChangeName={(name) => {
                                              let importantCategories = this.state.importantCategories;
                                              importantCategories[index].name = name;
                                              this.setState({
                                                  importantCategories: importantCategories
                                              })
                                          }}
                                          onChangePhoto={(photoName) => {
                                              let importantCategories = this.state.importantCategories;
                                              importantCategories[index].photoName = photoName;
                                              this.setState({
                                                  importantCategories: importantCategories
                                              })
                                          }}
                                          onFileUploadSuccess={(filename) => {
                                              this.handleUploadSuccess(filename);
                                          }}
                                          onFileUploadStart={(index) => {
                                              this.handleUploadStart(index);
                                          }}/>
            }
        );


        return (
            <React.Fragment>
                <h3 className="title-5 m-b-35">Settings</h3>
                <div className="row container">
                    <FadeLoader
                        loading={this.state.isLoadingSettings}
                        color={'#1641ff'}
                        css={spinnerCss}
                    />
                    {!this.state.isLoadingSettings &&
                    <React.Fragment>
                        <div className="col-md-12">
                            <TextField
                                id="amount"
                                label={"To whom to send cashout notification email separated by comma, if empty, no mails will be delivered"}
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
                        </div>
                        <Button color="primary" variant="contained"
                                style={{marginTop: 15}}
                                onClick={this.updateSettings}
                                size={"large"}>
                            Update
                        </Button>
                    </React.Fragment>
                    }
                </div>
                <br/>

                <div className="row container">
                    <FadeLoader
                        loading={this.state.isLoadingImportantCategories}
                        color={'#1641ff'}
                        css={spinnerCss}
                    />
                    <h3 className="title-5 m-b-35">Important Categories</h3>

                    {!this.state.isLoadingImportantCategories &&
                    <React.Fragment>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <strong className="card-title">Available Categories (replace the category name with
                                        one of this)</strong>
                                </div>
                                <div className="card-body">
                                    {availableCategories}
                                </div>
                            </div>
                        </div>
                        {importantCategories}
                        <Button color="primary" variant="contained"
                                style={{marginTop: 15}}
                                onClick={this.updateImportantCategories}
                                size={"large"}>
                            Update important categories
                        </Button>
                    </React.Fragment>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Settings;