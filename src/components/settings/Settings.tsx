import React from "react";
import { Button, TextField } from "@material-ui/core";
import { getSettings, SettingsDTO, updateSettings } from "../../rest/SettingsService";
import FadeLoader from 'react-spinners/FadeLoader';
import FileUploader from 'react-firebase-file-uploader';
import { emptyHrefLink, spinnerCss, StorageRef } from "../../Helper";
import {
    CategoryDto, getCategories,
    getImportantCategories,
    ImportantCategoryDto,
    updateImportantCategories
} from "../../rest/CategoriesService";
import { storage } from "../../index";

interface SettingsProps {

}

interface SettingsState {
    settings: SettingsDTO,
    importantCategories: ImportantCategoryDto[],
    isLoadingSettings: boolean,
    file: string,
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
            file: '',
            isLoadingSettings: true,
            isLoadingImportantCategories: true
        };
        this.updateSettings = this.updateSettings.bind(this);
        this.updateImportantCategories = this.updateImportantCategories.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);
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
            console.log(this.state.importantCategories);
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

    handleFileSelect(e) {
        this.setState({file: e.target.files[0]})
    }

    handleUploadSuccess() {
        alert("File has successful updated");
        window.location.reload();
    }

    handleUploadError(event) {
        alert("Something went wrong with the upload");
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
                return <React.Fragment key={index}>
                    <div className="col-md-4" key={index}>
                        <div className="card" key={index}>
                            <div className="card-body" key={index}>
                                {index}
                                <div className="card-text" id={"card" + index} key={index}>
                                    <TextField
                                        id={"categoryName" + index}
                                        label={"Category Name"}
                                        variant="filled"
                                        style={{width: '100%'}}
                                        onChange={event => {
                                            let importantCategories = this.state.importantCategories;
                                            importantCategories[index].name = (event.target.value as string);
                                            this.setState({
                                                importantCategories: importantCategories
                                            })
                                        }}
                                        value={this.state.importantCategories[index].name}
                                    />
                                    <TextField
                                        id={"photoName" + index}
                                        label={"Photo name from storage"}
                                        variant="filled"
                                        style={{width: '100%'}}
                                        onChange={event => {
                                            let importantCategories = this.state.importantCategories;
                                            importantCategories[index].photoName = (event.target.value as string);
                                            this.setState({
                                                importantCategories: importantCategories
                                            })
                                        }}
                                        value={this.state.importantCategories[index].photoName}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
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
                            <a href={emptyHrefLink}>
                                <label>
                                    {'>'} (Click)Upload ICON file to firebase storage(dimension:64x64, .PNG format)
                                    <FileUploader hidden
                                                  accept="image/*"
                                                  filename={
                                                      this.state.file
                                                  }
                                                  storageRef={storage.ref(StorageRef.ICONS + this.state.file)}
                                                  onUploadError={this.handleUploadError}
                                                  onUploadSuccess={this.handleUploadSuccess}
                                    />
                                </label>
                            </a>
                            <label>
                                The name of the uploaded file should be used in the 'Photo name from storage'
                            </label>
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