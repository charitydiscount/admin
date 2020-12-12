import React from 'react';
import { Achievement } from '../../models/Achievement';
import AchievementModal from './AchievementModal';
import { setAchievementModalUpdate } from '../../redux/actions/AchievementActions';
import { connect } from 'react-redux';
import ElementTableLink from '../general/ElementTableLink';

interface AchievementElementProps {
    achievement: Achievement;

    //global state
    setAchievementModalUpdate?: (achievement: Achievement) => void;
}

class AchievementElement extends React.Component<AchievementElementProps> {
    openModal = () => {
        this.props.setAchievementModalUpdate(this.props.achievement);
    };

    public render() {
        return (
            <React.Fragment>
                <AchievementModal title={'Update achievement'}/>
                <tr className="tr-shadow">
                    <ElementTableLink
                        text={this.props.achievement.id || ''}
                        onClick={this.openModal}
                    />
                    <td>{this.props.achievement.name.ro}</td>
                    <td>{this.props.achievement.description.ro}</td>
                    <td>{this.props.achievement.type}</td>
                    <td>
                        <img
                            width={64}
                            height={64}
                            src={this.props.achievement.badgeUrl}
                            alt="Badge URL"
                        />
                    </td>
                </tr>
                <tr className="spacer"></tr>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setAchievementModalUpdate: (achievement: Achievement) =>
            dispatch(setAchievementModalUpdate(achievement)),
    };
};

export default connect(null, mapDispatchToProps)(AchievementElement);
