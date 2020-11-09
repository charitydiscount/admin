import { ProxyDate } from "../Helper";

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
    commission_paid,
    commission_pending,
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
    badge: string,
    conditions: Condition[],
    createdAt?: ProxyDate,
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
    badge: 'badgePath',
    conditions: [
        {
            type: ConditionType[ConditionType.count],
            target: '',
            unit: ''
        }
    ],
    reward: {
        amount: '',
        unit: ''
    },
    weight: '',
    type: ''
};

