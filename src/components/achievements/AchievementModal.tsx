import React from "react";
import Modal from '../modal';
import ModalTextField from "../general/ModalTextField";
import {
    Achievement,
    AchievementType, Condition,
    ConditionType,
    ConditionUnit,
    RewardUnit
} from "../../models/Achievement";
import { AppState } from "../../redux/reducer/RootReducer";
import { connect } from "react-redux";
import { setAchievementModalVisible, updateAchievementModal } from "../../redux/actions/AchievementActions";
import ModalSelect from "../general/ModalSelect";
import { MenuItem } from "@material-ui/core";
import { createAchievement, updateAchievement } from "../../rest/AchievementService";
import { spinnerCss } from "../../Helper";
import { FadeLoader } from "react-spinners";

interface AchievementModalProps {
    title: string

    //global state
    achievementModalVisible: boolean,
    createAchievement: boolean,
    setAchievementModalVisible: (modalVisible) => void
    achievementModal: Achievement,
    updateAchievementModal: (achievement) => void
}

interface AchievementModalState {
    isLoading: boolean
}

class AchievementModal extends React.Component<AchievementModalProps, AchievementModalState> {

    constructor(props: Readonly<AchievementModalProps>) {
        super(props);
        this.state = {
            isLoading: false
        };
    }

    onClose = () => {
        this.setState({
            isLoading: false
        });
        this.props.setAchievementModalVisible(false);
    };

    onSave = async () => {
        if (!this.state.isLoading) {
            try {
                this.setState({
                    isLoading: true
                });
                let response;
                if (this.props.createAchievement) {
                    response = await createAchievement(this.props.achievementModal);
                } else {
                    response = await updateAchievement(this.props.achievementModal);
                }
                if (response) {
                    alert("Achievement successfully created/updated");
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
            <MenuItem key={'conditionType0'} value={ConditionType[ConditionType.exactDate]}> Exact Date</MenuItem>,
            <MenuItem key={'conditionType1'} value={ConditionType[ConditionType.untilDate]}> Until Date</MenuItem>
        ];

        let conditionsUnits = [
            <MenuItem key={'conditionUnit0'} value={ConditionUnit[ConditionUnit.count]}> Count </MenuItem>,
            <MenuItem key={'conditionUnit1'} value={ConditionUnit[ConditionUnit.ron]}> Ron</MenuItem>
        ];

        let rewardUnits = [
            <MenuItem key={'rewardUnit0'} value={RewardUnit[RewardUnit.charityPoints]}> Charity Points </MenuItem>,
            <MenuItem key={'rewardUnit1'} value={RewardUnit[RewardUnit.ron]}> Ron</MenuItem>
        ];

        let achievementTypes = [
            <MenuItem key={'type0'} value={AchievementType[AchievementType.click]}>Click</MenuItem>,
            <MenuItem key={'type1'} value={AchievementType[AchievementType.commission_paid]}>Commission Paid</MenuItem>,
            <MenuItem key={'type1'} value={AchievementType[AchievementType.commission_pending]}>Commission Pending</MenuItem>,
            <MenuItem key={'type2'} value={AchievementType[AchievementType.donation]}>Donation</MenuItem>,
            <MenuItem key={'type3'} value={AchievementType[AchievementType.invite]}>Referral Invite</MenuItem>,
            <MenuItem key={'type4'} value={AchievementType[AchievementType.cashout]}>Cashout</MenuItem>,
            <MenuItem key={'type5'} value={AchievementType[AchievementType.review]}>Review</MenuItem>,
            <MenuItem key={'type6'} value={AchievementType[AchievementType.favorite]}>Favorite shop</MenuItem>
        ];

        return (
            <React.Fragment>
                <Modal
                    visible={this.props.achievementModalVisible}
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
                        <ModalTextField id={"nameRo"} label={"Name RO"} value={this.props.achievementModal.name.ro}
                                        onChange={(event) => {
                                            this.props.updateAchievementModal({
                                                ...this.props.achievementModal,
                                                name: {
                                                    ...this.props.achievementModal.name,
                                                    ro: event.target.value,
                                                }
                                            });
                                        }}/>
                        <ModalTextField id={"nameEn"} label={"Name EN"} value={this.props.achievementModal.name.en}
                                        onChange={(event) => {
                                            this.props.updateAchievementModal({
                                                ...this.props.achievementModal,
                                                name: {
                                                    ...this.props.achievementModal.name,
                                                    en: event.target.value
                                                }
                                            });
                                        }}/>
                        <ModalTextField id={"descriptionRo"} label={"Description RO"}
                                        value={this.props.achievementModal.description.ro}
                                        onChange={(event) => {
                                            this.props.updateAchievementModal({
                                                ...this.props.achievementModal,
                                                description: {
                                                    ...this.props.achievementModal.description,
                                                    ro: event.target.value
                                                }
                                            });
                                        }}/>
                        <ModalTextField id={"descriptionEn"} label={"Description EN"}
                                        value={this.props.achievementModal.description.en}
                                        onChange={(event) => {
                                            this.props.updateAchievementModal({
                                                ...this.props.achievementModal,
                                                description: {
                                                    ...this.props.achievementModal.description,
                                                    en: event.target.value
                                                }
                                            });
                                        }}/>
                        <ModalTextField id={"badgePath"} label={"Badge path"}
                                        value={this.props.achievementModal.badge}
                                        onChange={(event) => {
                                            this.props.updateAchievementModal({
                                                ...this.props.achievementModal,
                                                badge: event.target.value
                                            });
                                        }}/>
                        <ModalTextField id={"condition1Type"} label={"Condition 1 - Type"}
                                        value={this.props.achievementModal.conditions[0].type}
                                        disabled={true}
                        />
                        <ModalTextField id={"condition1Target"} label={"Condition 1 - Target"}
                                        value={this.props.achievementModal.conditions[0].target}
                                        onChange={(event) => {
                                            let conditions = this.props.achievementModal.conditions as Condition[];
                                            conditions[0].target = event.target.value;
                                            this.props.updateAchievementModal({
                                                ...this.props.achievementModal,
                                                conditions: conditions
                                            });
                                        }}/>
                        <ModalSelect id={"condition1Unit"} title={"Condition 1 - Unit"}
                                     value={this.props.achievementModal.conditions[0].unit}
                                     options={conditionsUnits}
                                     onChange={(event) => {
                                         let conditions = this.props.achievementModal.conditions as Condition[];
                                         conditions[0].unit = event.target.value;
                                         this.props.updateAchievementModal({
                                             ...this.props.achievementModal,
                                             conditions: conditions
                                         });
                                     }}/>
                        <ModalSelect id={"condition2Type"} title={"Condition 2 - Type"}
                                     value={this.props.achievementModal.conditions[1] ?
                                         this.props.achievementModal.conditions[1].type :
                                         ''}
                                     options={conditionsTypes}
                                     onChange={(event) => {
                                         let conditions = this.props.achievementModal.conditions as Condition[];
                                         if (conditions.length === 1) {
                                             conditions.push({
                                                 type: event.target.value,
                                                 target: '',
                                                 unit: ''
                                             })
                                         } else {
                                             conditions[1].type = event.target.value;
                                         }
                                         this.props.updateAchievementModal({
                                             ...this.props.achievementModal,
                                             conditions: conditions
                                         });
                                     }}/>
                        <ModalTextField id={"condition2Target"} label={"Condition 2 - Target"}
                                        value={this.props.achievementModal.conditions[1] ?
                                            this.props.achievementModal.conditions[1].target :
                                            ''}
                                        onChange={(event) => {
                                            let conditions = this.props.achievementModal.conditions as Condition[];
                                            if (conditions.length === 1) {
                                                conditions.push({
                                                    type: '',
                                                    target: event.target.value,
                                                    unit: ''
                                                })
                                            } else {
                                                conditions[1].target = event.target.value;
                                            }
                                            this.props.updateAchievementModal({
                                                ...this.props.achievementModal,
                                                conditions: conditions
                                            });
                                        }}/>
                        <ModalTextField id={"reward"} label={"Reward - Amount"}
                                        value={this.props.achievementModal.reward.amount}
                                        onChange={(event) => {
                                            this.props.updateAchievementModal({
                                                ...this.props.achievementModal,
                                                reward: {
                                                    ...this.props.achievementModal.reward,
                                                    amount: event.target.value
                                                }
                                            });
                                        }}/>
                        <ModalSelect id={"rewardUnit"} title={"Reward - Unit"}
                                     value={this.props.achievementModal.reward.unit}
                                     options={rewardUnits}
                                     onChange={(event) => {
                                         this.props.updateAchievementModal({
                                             ...this.props.achievementModal,
                                             reward: {
                                                 ...this.props.achievementModal.reward,
                                                 unit: event.target.value
                                             }
                                         });
                                     }}/>
                        <ModalTextField id={"weight"} label={"Weight"}
                                        value={this.props.achievementModal.weight}
                                        onChange={(event) => {
                                            this.props.updateAchievementModal({
                                                ...this.props.achievementModal,
                                                weight: event.target.value
                                            });
                                        }}/>
                        <ModalSelect id={"type"} title={"Type"}
                                     value={this.props.achievementModal.type}
                                     options={achievementTypes}
                                     onChange={(event) => {
                                         this.props.updateAchievementModal({
                                             ...this.props.achievementModal,
                                             type: event.target.value
                                         });
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
            achievementModalVisible: state.achievement.modalVisible,
            createAchievement: state.achievement.createAchievement,
            achievementModal: state.achievement.achievementModal
        };
    };

const
    mapDispatchToProps = (dispatch: any) => {
        return {
            setAchievementModalVisible: (modalVisible: boolean) =>
                dispatch(setAchievementModalVisible(modalVisible)),
            updateAchievementModal: (achievement: Achievement) =>
                dispatch(updateAchievementModal(achievement))
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(AchievementModal);
