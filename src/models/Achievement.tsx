import { ProxyDate } from '../Helper';

export interface LocalizedText {
    en: string;
    ro: string;
}

export enum RewardUnit {
    RON = 'ron',
    EUR = 'eur',
    CHARITY_POINTS = 'CharityPoints',
}

export enum AchievementType {
    COMMISSION_PAID = 'commission-paid',
    COMMISSION_PENDING = 'commission-pending',
    CLICK = 'click',
    DONATION = 'donation',
    CASHOUT = 'cashout',
    REVIEW = 'review',
    INVITE = 'invite',
    FAVORITE = 'favorite',
}

export enum AchievementConditionType {
    COUNT = 'count',
    EXACT_DATE = 'exactDate',
    UNTIL_DATE = 'untilDate',
}

export enum AchievementConditionUnit {
    SHOP = 'shop',
    COMMISSION = 'commission',
    DONATION = 'donation',
    CASHOUT = 'cashout',
    REVIEW = 'review',
    INVITE = 'invite',
}

export interface Reward {
    amount: number;
    unit: string;
}

export interface Condition {
    target: number | Date | string;
    type: AchievementConditionType;
    unit: AchievementConditionUnit;
}

export interface Achievement {
    id?: string;
    name: LocalizedText;
    description: LocalizedText;
    badgeUrl: string;
    conditions: Condition[];
    createdAt?: ProxyDate;
    updatedAt?: ProxyDate;
    reward: Reward;
    weight: number;
    type: AchievementType;
    order: number;
    targetDate?: Date;
    exactDate?: boolean;
}

export const DEFAULT_ACHIEVEMENT: Achievement = {
    name: {
        ro: '',
        en: '',
    },
    description: {
        ro: '',
        en: '',
    },
    badgeUrl:
        'https://firebasestorage.googleapis.com/v0/b/charitydiscount-test.appspot.com/o/badges%2F157152.png?alt=media',
    conditions: [
        {
            type: AchievementConditionType.COUNT,
            target: '',
            unit: AchievementConditionUnit.SHOP,
        },
    ],
    reward: {
        amount: 0,
        unit: '',
    },
    weight: 0,
    type: AchievementType.CLICK,
    order: 100,
};
