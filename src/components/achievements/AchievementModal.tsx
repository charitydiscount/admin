import React from 'react';
import Modal from '../modal';
import ModalTextField from '../general/ModalTextField';
import {
    Achievement,
    AchievementConditionUnit,
    AchievementType,
    Condition,
    RewardUnit,
} from '../../models/Achievement';
import { AppState } from '../../redux/reducer/RootReducer';
import { connect } from 'react-redux';
import {
    loadAchievements,
    setAchievementModalVisible,
    updateAchievementModal,
} from '../../redux/actions/AchievementActions';
import ModalSelect from '../general/ModalSelect';
import { MenuItem } from '@material-ui/core';
import {
    createAchievement,
    updateAchievement,
} from '../../rest/AchievementService';
import { spinnerCss } from '../../Helper';
import { FadeLoader } from 'react-spinners';

interface AchievementModalProps {
    title: string;

    //global state
    achievementModalVisible: boolean;
    createAchievement: boolean;
    setAchievementModalVisible: (modalVisible) => void;
    achievementModal: Achievement;
    updateAchievementModal: (achievement) => void;
    loadAchievements: () => {};
    isLoading: boolean;
}

class AchievementModal extends React.Component<AchievementModalProps> {
    onClose = () => {
        this.props.setAchievementModalVisible(false);
    };

    onSave = async () => {
        try {
            const success = await (this.props.createAchievement
                ? createAchievement(this.props.achievementModal)
                : updateAchievement(this.props.achievementModal));

            if (success) {
                this.props.loadAchievements();
                this.props.setAchievementModalVisible(false);
            } else {
                alert(`Failed to save the achievement`);
            }
        } catch (e) {
            alert(e);
        }
    };

    render() {
        const conditionsUnits = Object.entries(AchievementConditionUnit).map(
            ([key, value]) => {
                return (
                    <MenuItem key={key} value={value}>
                        {' '}
                        {value}
                    </MenuItem>
                );
            }
        );

        const rewardUnits = Object.entries(RewardUnit).map(([key, value]) => {
            return (
                <MenuItem key={key} value={value}>
                    {' '}
                    {value}
                </MenuItem>
            );
        });

        const achievementTypes = Object.entries(AchievementType).map(
            ([key, value]) => {
                return (
                    <MenuItem key={key} value={value}>
                        {' '}
                        {value}
                    </MenuItem>
                );
            }
        );

        return (
            <React.Fragment>
                <Modal
                    visible={this.props.achievementModalVisible}
                    onClose={this.onClose}
                    title={this.props.title}
                    onSave={this.onSave}
                >
                    <FadeLoader
                        loading={this.props.isLoading}
                        color={'#1641ff'}
                        css={spinnerCss}
                    />
                    {!this.props.isLoading && (
                        <React.Fragment>
                            <ModalTextField
                                label={'Name RO'}
                                value={this.props.achievementModal.name.ro}
                                onChange={(event) => {
                                    this.props.updateAchievementModal({
                                        ...this.props.achievementModal,
                                        name: {
                                            ...this.props.achievementModal.name,
                                            ro: event.target.value,
                                        },
                                    });
                                }}
                            />
                            <ModalTextField
                                label={'Name EN'}
                                value={this.props.achievementModal.name.en}
                                onChange={(event) => {
                                    this.props.updateAchievementModal({
                                        ...this.props.achievementModal,
                                        name: {
                                            ...this.props.achievementModal.name,
                                            en: event.target.value,
                                        },
                                    });
                                }}
                            />
                            <ModalTextField
                                label={'Description RO'}
                                value={
                                    this.props.achievementModal.description.ro
                                }
                                onChange={(event) => {
                                    this.props.updateAchievementModal({
                                        ...this.props.achievementModal,
                                        description: {
                                            ...this.props.achievementModal
                                                .description,
                                            ro: event.target.value,
                                        },
                                    });
                                }}
                            />
                            <ModalTextField
                                label={'Description EN'}
                                value={
                                    this.props.achievementModal.description.en
                                }
                                onChange={(event) => {
                                    this.props.updateAchievementModal({
                                        ...this.props.achievementModal,
                                        description: {
                                            ...this.props.achievementModal
                                                .description,
                                            en: event.target.value,
                                        },
                                    });
                                }}
                            />
                            <ModalTextField
                                label={'Badge path'}
                                value={this.props.achievementModal.badgeUrl}
                                onChange={(event) => {
                                    this.props.updateAchievementModal({
                                        ...this.props.achievementModal,
                                        badgeUrl: event.target.value,
                                    });
                                }}
                            />
                            <ModalTextField
                                label={'Condition - Type'}
                                value={
                                    this.props.achievementModal.conditions[0]
                                        .type
                                }
                                disabled={true}
                            />
                            <ModalTextField
                                label={'Condition - Target'}
                                value={
                                    this.props.achievementModal.conditions[0]
                                        .target
                                }
                                onChange={(event) => {
                                    let conditions = this.props.achievementModal
                                        .conditions as Condition[];
                                    conditions[0].target = parseInt(
                                        event.target.value
                                    );
                                    this.props.updateAchievementModal({
                                        ...this.props.achievementModal,
                                        conditions: conditions,
                                    });
                                }}
                                type="number"
                            />
                            <ModalSelect
                                id={'condition1Unit'}
                                title={'Condition - Unit'}
                                value={
                                    this.props.achievementModal.conditions[0]
                                        .unit
                                }
                                options={conditionsUnits}
                                onChange={(event) => {
                                    let conditions = this.props.achievementModal
                                        .conditions as Condition[];
                                    conditions[0].unit = event.target.value;
                                    this.props.updateAchievementModal({
                                        ...this.props.achievementModal,
                                        conditions: conditions,
                                    });
                                }}
                            />
                            <ModalTextField
                                label={'Reward - Amount'}
                                value={
                                    this.props.achievementModal.reward.amount
                                }
                                onChange={(event) => {
                                    this.props.updateAchievementModal({
                                        ...this.props.achievementModal,
                                        reward: {
                                            ...this.props.achievementModal
                                                .reward,
                                            amount: parseInt(
                                                event.target.value
                                            ),
                                        },
                                    });
                                }}
                                type="number"
                            />
                            <ModalSelect
                                id={'rewardUnit'}
                                title={'Reward - Unit'}
                                value={this.props.achievementModal.reward.unit}
                                options={rewardUnits}
                                onChange={(event) => {
                                    this.props.updateAchievementModal({
                                        ...this.props.achievementModal,
                                        reward: {
                                            ...this.props.achievementModal
                                                .reward,
                                            unit: event.target.value,
                                        },
                                    });
                                }}
                            />
                            <ModalSelect
                                id={'type'}
                                title={'Type'}
                                value={this.props.achievementModal.type}
                                options={achievementTypes}
                                onChange={(event) => {
                                    this.props.updateAchievementModal({
                                        ...this.props.achievementModal,
                                        type: event.target.value,
                                    });
                                }}
                            />
                        </React.Fragment>
                    )}
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        achievementModalVisible: state.achievement.modalVisible,
        createAchievement: state.achievement.createAchievement,
        achievementModal: state.achievement.achievementModal,
        isLoading: state.achievement.loading,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setAchievementModalVisible: (modalVisible: boolean) =>
            dispatch(setAchievementModalVisible(modalVisible)),
        updateAchievementModal: (achievement: Achievement) =>
            dispatch(updateAchievementModal(achievement)),
        loadAchievements: () => dispatch(loadAchievements()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AchievementModal);
