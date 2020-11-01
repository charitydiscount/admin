import { Achievement, AchievementType, ConditionType, ConditionUnit, RewardUnit } from "../models/Achievement";
import { auth, remoteConfig } from "../index";
import { ExpressLink, isEmpty } from "../Helper";
import axios from "axios";

export async function createAchievement(achievement: Achievement) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    if (isEmpty(achievement.name.en) || isEmpty(achievement.name.ro)) {
        throw Error('Enter both names');
    }

    if (isEmpty(achievement.description.en) || isEmpty(achievement.description.ro)) {
        throw Error('Enter both descriptions');
    }

    if (isEmpty(achievement.badgePath)) {
        throw Error('Enter the image path of the badge');
    }

    if (isEmpty(achievement.condition1.target)) {
        throw Error('Enter the target for Condition 1');
    }

    let condition1Unit = ConditionUnit[achievement.condition1.unit];
    if (!condition1Unit) {
        throw Error('Select the unit for Condition 1');
    }

    let condition2Type = ConditionType[achievement.condition2.type];
    if (condition2Type && isEmpty(achievement.condition2.target)) {
        throw Error('Enter the target for Condition 2');
    }

    if (isEmpty(achievement.reward.amount)) {
        throw Error('Enter the amount for Reward');
    }

    let rewardUnit = RewardUnit[achievement.reward.unit];
    if (!rewardUnit) {
        throw Error('Select the unit for Reward');
    }

    if (isEmpty(achievement.weight)) {
        throw Error('Enter the weight');
    }

    let achievementType = AchievementType[achievement.type];
    if (!achievementType) {
        throw Error('Select the type');
    }

    let data = {
        name: {
            en: achievement.name.en,
            ro: achievement.name.ro
        },
        description: {
            en: achievement.description.en,
            ro: achievement.description.ro
        },
        conditions: {},
        badge: achievement.badgePath,
        reward: {
            unit: rewardUnit,
            amount: achievement.reward.amount
        },
        weight: achievement.weight,
        type: achievementType
    };
    if (condition2Type) {
        data.conditions = [
            {
                type: achievement.condition1.type,
                target: achievement.condition1.target,
                unit: condition1Unit
            },
            {
                type: condition2Type,
                target: achievement.condition2.target,
            }
        ]
    } else {
        data.conditions = [
            {
                type: achievement.condition1.type,
                target: achievement.condition1.target,
                unit: condition1Unit
            }
        ];
    }

    const token = await auth.currentUser.getIdToken();
    let url = remoteConfig.getString('express_url') + ExpressLink.ACHIEVEMENTS;

    let response = await axios.post(url, data, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}