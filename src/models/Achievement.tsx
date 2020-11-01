import { firestore } from 'firebase/app';

export interface Languages {
    en: string,
    ro: string
}

export enum ConditionType {
    count,
    untilDate,
    exactDate
}

export enum ConditionUnit {
    count,
    ron
}

export enum RewardUnit {
    charityPoints,
    ron
}

export enum AchievementType {
    click,
    commission,
    donation,
    invite,
    cashout,
    review,
    favorite
}

export interface Reward {
    amount: string,
    unit: string
}

export interface Condition {
    type: string,
    target: string,
    unit: string
}

export interface Achievement {
    id?: string,
    name: Languages,
    description: Languages,
    badgePath: string,
    condition1: Condition,
    condition2: Condition,
    createdAt?: firestore.Timestamp,
    reward: Reward,
    weight: string,
    type: string
}

export const DEFAULT_ACHIEVEMENT: Achievement = {
    name: {
        ro: '',
        en: ''
    },
    description: {
        ro: '',
        en: ''
    },
    badgePath: '',
    condition1: {
        type: ConditionType[ConditionType.count],
        target: '',
        unit: ''
    },
    condition2: {
        type: '',
        target: '',
        unit: ''
    },
    reward: {
        amount: '',
        unit: ''
    },
    weight: '',
    type: ''
};

