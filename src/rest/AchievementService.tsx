import { Achievement } from "../models/Achievement";
import { auth, remoteConfig } from "../index";
import { ExpressLink, isEmpty } from "../Helper";
import axios from "axios";

export async function getAchievements() {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = remoteConfig.getString('express_url') + ExpressLink.ACHIEVEMENTS;

    let response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`}
    });

    return Object.entries(response.data as Achievement)
        .map(([index, click]) => {
            return click;
        })
}

export async function createAchievement(achievement: Achievement) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    validateAchievement(achievement);

    let data = {
        name: {
            en: achievement.name.en,
            ro: achievement.name.ro
        },
        description: {
            en: achievement.description.en,
            ro: achievement.description.ro
        },
        conditions: achievement.conditions,
        badge: achievement.badge,
        reward: {
            unit: achievement.reward.unit,
            amount: achievement.reward.amount
        },
        weight: achievement.weight,
        type: achievement.type
    };

    const token = await auth.currentUser.getIdToken();
    let url = remoteConfig.getString('express_url') + ExpressLink.ACHIEVEMENTS;

    let response = await axios.post(url, data, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}

export async function updateAchievement(achievement: Achievement) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    validateAchievement(achievement);

    let data = {
        name: {
            en: achievement.name.en,
            ro: achievement.name.ro
        },
        description: {
            en: achievement.description.en,
            ro: achievement.description.ro
        },
        conditions: achievement.conditions,
        badge: achievement.badge,
        reward: {
            unit: achievement.reward.unit,
            amount: achievement.reward.amount
        },
        weight: achievement.weight,
        type: achievement.type
    };

    const token = await auth.currentUser.getIdToken();
    let url = remoteConfig.getString('express_url') + ExpressLink.ACHIEVEMENTS + '/' + achievement.id;

    let response = await axios.put(url, data, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}


function validateAchievement(achievement: Achievement) {
    if (isEmpty(achievement.name.en) || isEmpty(achievement.name.ro)) {
        throw Error('Enter both names');
    }

    if (isEmpty(achievement.description.en) || isEmpty(achievement.description.ro)) {
        throw Error('Enter both descriptions');
    }

    if (isEmpty(achievement.badge)) {
        throw Error('Enter the image path of the badge');
    }

    if (isEmpty(achievement.conditions[0].target)) {
        throw Error('Enter the target for Condition 1');
    }

    if (isEmpty(achievement.conditions[0].unit)) {
        throw Error('Select the unit for Condition 1');
    }

    if (achievement.conditions.length > 1 && achievement.conditions[1]) {
        if (isEmpty(achievement.conditions[1].type)) {
            throw Error('Enter the type for Condition 2');
        }
        if (isEmpty(achievement.conditions[1].target)) {
            throw Error('Enter the target for Condition 2');
        }
    }

    if (isEmpty(achievement.reward.amount)) {
        throw Error('Enter the amount for Reward');
    }

    if (isEmpty(achievement.reward.unit)) {
        throw Error('Select the unit for Reward');
    }

    if (isEmpty(achievement.weight)) {
        throw Error('Enter the weight');
    }

    if (isEmpty(achievement.type)) {
        throw Error('Select the type');
    }
}