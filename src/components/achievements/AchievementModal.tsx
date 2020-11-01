import React from "react";
import Modal from '../modal';
import ModalTextField from "../general/ModalTextField";
import {
    Achievement,
    AchievementType,
    ConditionType,
    ConditionUnit,
    DEFAULT_ACHIEVEMENT,
    RewardUnit
} from "../../models/Achievement";
import { AppState } from "../../redux/reducer/RootReducer";
import { connect } from "react-redux";
import { setAchievementModalVisible } from "../../redux/actions/AchievementActions";
import ModalSelect from "../general/ModalSelect";
import { MenuItem } from "@material-ui/core";
import { createAchievement } from "../../rest/AchievementService";
import { spinnerCss } from "../../Helper";
import { FadeLoader } from "react-spinners";

interface AchievementModalProps {
    title: string

    //global state
    achievementModalVisible?: boolean,
    setAchievementModalVisible?: (modalVisible) => void
}

interface AchievementModalState {
    achievement: Achievement,
    isLoading: boolean
}

class AchievementModal extends React.Component<AchievementModalProps, AchievementModalState> {

    constructor(props: Readonly<AchievementModalProps>) {
        super(props);
        this.state = {
            achievement: {...DEFAULT_ACHIEVEMENT},
            isLoading: false
        };
    }

    onClose = () => {
        this.setState({
            achievement: {...DEFAULT_ACHIEVEMENT},
            isLoading: false
        });
        // @ts-ignore
        this.props.setAchievementModalVisible(false);
    };

    onSave = async () => {
        if (!this.state.isLoading) {
            try {
                this.setState({
                    isLoading: true
                });
                let response = await createAchievement(this.state.achievement);
                if (response) {
                    alert("Achievement successfully created");
                    window.location.reload();
                }
                this.setState({
                    isLoading: false
                });
            } catch (e) {
                alert(e);
                this.setState({
                    isLoading: false
                });
            }
        }
    };

    render() {
        let conditionsTypes = [
            <MenuItem key={'conditionType0'} value={ConditionType.exactDate}> Exact Date</MenuItem>,
            <MenuItem key={'conditionType1'} value={ConditionType.untilDate}> Until Date</MenuItem>
        ];

        let conditionsUnits = [
            <MenuItem key={'conditionUnit0'} value={ConditionUnit.count}> Count </MenuItem>,
            <MenuItem key={'conditionUnit1'} value={ConditionUnit.ron}> Ron</MenuItem>
        ];

        let rewardUnits = [
            <MenuItem key={'rewardUnit0'} value={RewardUnit.charityPoints}> Charity Points </MenuItem>,
            <MenuItem key={'rewardUnit1'} value={RewardUnit.ron}> Ron</MenuItem>
        ];

        let achievementTypes = [
            <MenuItem key={'type0'} value={AchievementType.click}>Click</MenuItem>,
            <MenuItem key={'type1'} value={AchievementType.commission}>Commission</MenuItem>,
            <MenuItem key={'type2'} value={AchievementType.donation}>Donation</MenuItem>,
            <MenuItem key={'type3'} value={AchievementType.invite}>Referral Invite</MenuItem>,
            <MenuItem key={'type4'} value={AchievementType.cashout}>Cashout</MenuItem>,
            <MenuItem key={'type5'} value={AchievementType.review}>Review</MenuItem>,
            <MenuItem key={'type6'} value={AchievementType.favorite}>Favorite shop</MenuItem>
        ];

        return (
            <React.Fragment>
                <Modal
                    visible={this.props.achievementModalVisible || false}
                    onClose={this.onClose}
                    title={this.props.title}
                    onSave={this.onSave}
                >
                    <FadeLoader
                        loading={this.state.isLoading}
                        color={'#1641ff'}
                        css={spinnerCss}
                    />
                    {!this.state.isLoading &&
                    <React.Fragment>
                        <ModalTextField id={"nameRo"} label={"Name RO"} value={this.state.achievement.name.ro}
                                        onChange={(event) => {
                                            this.setState({
                                                achievement: {
                                                    ...this.state.achievement,
                                                    name: {
                                                        ...this.state.achievement.name,
                                                        ro: event.target.value,
                                                    }
                                                }
                                            })
                                        }}/>
                        <ModalTextField id={"nameEn"} label={"Name EN"} value={this.state.achievement.name.en}
                                        onChange={(event) => {
                                            this.setState({
                                                achievement: {
                                                    ...this.state.achievement,
                                                    name: {
                                                        ...this.state.achievement.name,
                                                        en: event.target.value
                                                    }
                                                }
                                            })
                                        }}/>
                        <ModalTextField id={"descriptionRo"} label={"Description RO"}
                                        value={this.state.achievement.description.ro}
                                        onChange={(event) => {
                                            this.setState({
                                                achievement: {
                                                    ...this.state.achievement,
                                                    description: {
                                                        ...this.state.achievement.description,
                                                        ro: event.target.value
                                                    }
                                                }
                                            })
                                        }}/>
                        <ModalTextField id={"descriptionEn"} label={"Description EN"}
                                        value={this.state.achievement.description.en}
                                        onChange={(event) => {
                                            this.setState({
                                                achievement: {
                                                    ...this.state.achievement,
                                                    description: {
                                                        ...this.state.achievement.description,
                                                        en: event.target.value
                                                    }
                                                }
                                            })
                                        }}/>
                        <ModalTextField id={"badgePath"} label={"Badge path"}
                                        value={this.state.achievement.badgePath}
                                        onChange={(event) => {
                                            this.setState({
                                                achievement: {
                                                    ...this.state.achievement,
                                                    badgePath: event.target.value
                                                }
                                            })
                                        }}/>
                        <ModalTextField id={"condition1Type"} label={"Condition 1 - Type"}
                                        value={this.state.achievement.condition1.type}
                                        disabled={true}
                        />
                        <ModalTextField id={"condition1Target"} label={"Condition 1 - Target"}
                                        value={this.state.achievement.condition1.target}
                                        onChange={(event) => {
                                            this.setState({
                                                achievement: {
                                                    ...this.state.achievement,
                                                    condition1: {
                                                        ...this.state.achievement.condition1,
                                                        target: event.target.value
                                                    }
                                                }
                                            })
                                        }}/>
                        <ModalSelect id={"condition1Unit"} title={"Condition 1 - Unit"}
                                     value={this.state.achievement.condition1.unit}
                                     options={conditionsUnits}
                                     onChange={(event) => {
                                         this.setState({
                                             achievement: {
                                                 ...this.state.achievement,
                                                 condition1: {
                                                     ...this.state.achievement.condition1,
                                                     unit: event.target.value
                                                 }
                                             },
                                         })
                                     }}/>
                        <ModalSelect id={"condition2Type"} title={"Condition 2 - Type"}
                                     value={this.state.achievement.condition2.type}
                                     options={conditionsTypes}
                                     onChange={(event) => {
                                         this.setState({
                                             achievement: {
                                                 ...this.state.achievement,
                                                 condition2: {
                                                     ...this.state.achievement.condition2,
                                                     type: event.target.value
                                                 }
                                             },
                                         })
                                     }}/>
                        <ModalTextField id={"condition2Target"} label={"Condition 2 - Target"}
                                        value={this.state.achievement.condition2.target}
                                        onChange={(event) => {
                                            this.setState({
                                                achievement: {
                                                    ...this.state.achievement,
                                                    condition2: {
                                                        ...this.state.achievement.condition2,
                                                        target: event.target.value
                                                    }
                                                }
                                            })
                                        }}/>
                        <ModalTextField id={"reward"} label={"Reward - Amount"}
                                        value={this.state.achievement.reward.amount}
                                        onChange={(event) => {
                                            this.setState({
                                                achievement: {
                                                    ...this.state.achievement,
                                                    reward: {
                                                        ...this.state.achievement.reward,
                                                        amount: event.target.value
                                                    }
                                                }
                                            })
                                        }}/>
                        <ModalSelect id={"rewardUnit"} title={"Reward - Unit"}
                                     value={this.state.achievement.reward.unit}
                                     options={rewardUnits}
                                     onChange={(event) => {
                                         this.setState({
                                             achievement: {
                                                 ...this.state.achievement,
                                                 reward: {
                                                     ...this.state.achievement.reward,
                                                     unit: event.target.value
                                                 }
                                             },
                                         })
                                     }}/>
                        <ModalTextField id={"weight"} label={"Weight"}
                                        value={this.state.achievement.weight}
                                        onChange={(event) => {
                                            this.setState({
                                                achievement: {
                                                    ...this.state.achievement,
                                                    weight: event.target.value
                                                }
                                            })
                                        }}/>
                        <ModalSelect id={"type"} title={"Type"}
                                     value={this.state.achievement.type}
                                     options={achievementTypes}
                                     onChange={(event) => {
                                         this.setState({
                                             achievement: {
                                                 ...this.state.achievement,
                                                 type: event.target.value
                                             },
                                         })
                                     }}/>
                    </React.Fragment>
                    }
                </Modal>
            </React.Fragment>
        )
    }
}

const
    mapStateToProps = (state: AppState) => {
        return {
            achievementModalVisible: state.achievement.modalVisible
        };
    };

const
    mapDispatchToProps = (dispatch: any) => {
        return {
            setAchievementModalVisible: (modalVisible: boolean) =>
                dispatch(setAchievementModalVisible(modalVisible))
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(AchievementModal);
