import React from "react";
import { Achievement } from "../../models/Achievement";
import AchievementModal from "./AchievementModal";
import { setAchievementModalUpdate } from "../../redux/actions/AchievementActions";
import { connect } from "react-redux";
import ElementTableLink from "../general/ElementTableLink";
import {
    emptyHrefLink,
    StorageRef,
    tableRowSpinnerCss
} from "../../Helper";
import { storage } from "../../index";
import FileUploader from 'react-firebase-file-uploader';
import { updateAchievement } from "../../rest/AchievementService";
import { FadeLoader } from "react-spinners";

interface AchievementElementProps {
    achievement: Achievement,

    //global state
    setAchievementModalUpdate?: (achievement) => void
}

interface AchievementElementState {
    achievementUrl: string,
    isLoadingPhoto: boolean
}

class AchievementElement extends React.Component<AchievementElementProps, AchievementElementState> {


    constructor(props: Readonly<AchievementElementProps>) {
        super(props);
        this.state = {
            isLoadingPhoto: true,
            achievementUrl: ''
        }
    }

    openModal = () => {
        this.props.setAchievementModalUpdate(this.props.achievement);
    };

    handleUploadError = () => {
        alert("Something went wrong with the upload");
    };

    handleUploadSuccess = async (filename) => {
        this.props.achievement.badge = filename;
        let response = await updateAchievement(this.props.achievement);
        if (response) {
            alert("Badge path successfully updated");
            window.location.reload();
        }
        this.setState({
            isLoadingPhoto: false
        });
    };

    handleUploadStart = () => {
        this.setState({
            isLoadingPhoto: true
        });
    };

    async componentDidMount() {
        try {
            const response = await storage
                .ref(StorageRef.BADGES + this.props.achievement.badge)
                .getDownloadURL();
            this.setState({
                achievementUrl: response as string,
                isLoadingPhoto: false
            });
        } catch (error) {
            this.setState({
                isLoadingPhoto: false
            });
        }
    }

    public render() {
        return (
            <React.Fragment>
                <AchievementModal title={"Update achievement"}/>
                <tr className="tr-shadow">
                    <ElementTableLink text={this.props.achievement.id || ''} onClick={this.openModal}/>
                    <td>{this.props.achievement.name.ro}</td>
                    <td>{this.props.achievement.description.ro}</td>
                    <td>{this.props.achievement.type}</td>
                    <td>
                        <FadeLoader
                            loading={this.state.isLoadingPhoto}
                            color={'#1641ff'}
                            css={tableRowSpinnerCss}
                        />
                        {!this.state.isLoadingPhoto &&
                        <a href={emptyHrefLink}>
                            <label>
                                {this.state.achievementUrl ?
                                    <div className="image" style={{
                                        width: 64,
                                        height: 64
                                    }}>
                                        <img src={this.state.achievementUrl} alt="John Doe"/>
                                    </div> :
                                    this.props.achievement.badge
                                }
                                <FileUploader hidden
                                              accept="image/*"
                                              storageRef={storage.ref(StorageRef.BADGES)}
                                              onUploadError={this.handleUploadError}
                                              onUploadSuccess={this.handleUploadSuccess}
                                              onUploadStart={this.handleUploadStart}
                                />
                            </label>
                        </a>
                        }
                    </td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setAchievementModalUpdate: (achievement: Achievement) =>
            dispatch(setAchievementModalUpdate(achievement))
    };
};


export default connect(null, mapDispatchToProps)(AchievementElement);
