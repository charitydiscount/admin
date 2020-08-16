import React from "react";
import { TextField } from "@material-ui/core";
import { emptyHrefLink, StorageRef } from "../../Helper";
import { storage } from "../../index";
import { ImportantCategoryDto } from "../../rest/CategoriesService";
import FileUploader from 'react-firebase-file-uploader';

export interface ImportantCategoryProps {
    index: number,
    category: ImportantCategoryDto,
    onChangeName: (name: string) => void,
    onChangePhoto: (photoName: string) => void,
    onFileUploadSuccess: (filename: string) => void;
    onFileUploadStart: (index: number) => void;
}

export interface ImportantCategoryState {
    photoUrl: string
}

class ImportantCategory extends React.Component<ImportantCategoryProps, ImportantCategoryState> {

    constructor(props: ImportantCategoryProps, context: any) {
        super(props, context);

        this.state = {
            photoUrl: ''
        };
        this.handleUploadStart = this.handleUploadStart.bind(this);
        this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePhotoNameChange = this.handlePhotoNameChange.bind(this);
    }

    async componentDidMount() {
        try {
            const response = await storage
                .ref(StorageRef.ICONS + this.props.category.photoName)
                .getDownloadURL();
            this.setState({
                photoUrl: response as string,
            });
        } catch (error) {
            console.log(error)
        }
    }

    handleUploadSuccess(filename) {
        this.props.onFileUploadSuccess(filename);
    }


    handleUploadStart() {
        this.props.onFileUploadStart(this.props.index);
    }

    handleNameChange(event) {
        this.props.onChangeName(event.target.value as string)
    }

    handlePhotoNameChange(event) {
        this.props.onChangePhoto(event.target.value as string)
    }


    handleUploadError() {
        alert("Something went wrong with the upload");
    }

    public render() {
        return (
            <React.Fragment>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            {this.props.index}
                            <div className="card-text">
                                <TextField
                                    id={"categoryName" + this.props.index}
                                    label={"Category Name"}
                                    variant="filled"
                                    style={{width: '100%'}}
                                    onChange={this.handleNameChange}
                                    value={this.props.category.name}
                                />
                                <TextField
                                    id={"photoName" + this.props.index}
                                    label={"Photo name from storage"}
                                    variant="filled"
                                    style={{width: '100%'}}
                                    onChange={this.handlePhotoNameChange}
                                    value={this.props.category.photoName}
                                />
                                {this.state.photoUrl &&
                                <div className="image">
                                    <img src={this.state.photoUrl} alt="John Doe"/>
                                </div>
                                }
                                <a href={emptyHrefLink}>
                                    <label>
                                        {'>'} Upload ICON(dimension:64x64, .PNG format)
                                        <FileUploader hidden
                                                      accept="image/*"
                                                      storageRef={storage.ref(StorageRef.ICONS)}
                                                      onUploadError={this.handleUploadError}
                                                      onUploadSuccess={this.handleUploadSuccess}
                                                      onUploadStart={this.handleUploadStart}
                                        />
                                    </label>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ImportantCategory;