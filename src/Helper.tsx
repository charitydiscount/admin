import { store } from './index';
import { doLogoutAction } from './redux/actions/UserActionsType';
import { css } from '@emotion/core';

export enum ExpressLink {
    PROGRAMS = 'programs',
    MESSAGES = 'messages',
    SETTINGS = 'settings',
    IMPORTANT_CATEGORIES = 'importantCategories',
    MAIL_NOTIFICATION = 'notifications/mail',
    CASHOUT = 'cashout',
    DONATION = 'donations',
    COMMISSIONS = 'commissions',
    CLICKS = 'clicks',
    ACHIEVEMENTS = 'achievements',
    CASES = 'cases',
}

export enum FirebaseTable {
    ROLES = 'roles',
    USERS = 'users',
    META = 'meta'
}

export enum TableDocument {
    PROGRAMS = 'programs',
    IMPORTANT_CATEGORIES = 'importantCategories',
    SETTINGS = 'settings'
}

export enum StorageRef {
    ICONS = "icons/",
}

export const spinnerCss = css`
    display: block;
    margin: 200px auto;
`;

export const mediumSpinnerCss = css`
    display: block;
    margin: 100px auto;
`;

export enum SourceTypes {
    TWO_PERFORMANT = '2p',
    REFERRAL = 'referral'
}

export const linkStyle = {
    textDecoration: "underline",
    color: "#007bff",
    cursor: "pointer"
};

export interface ProxyDate {
    _seconds: string
    _nanoseconds: string
}

export enum TxType {
    DONATION,
    CASHOUT
}

export enum Operation {
    CREATE = 'C',
    UPDATE = 'U',
}

export const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};

export const emptyHrefLink = '#';
export const blueColor = "#1641ff";
export const pageLimit = 8;

export function truncateText(
    text: string,
    length: number,
    useWordBoundary: boolean
) {
    if (text.length <= length) {
        return text;
    }
    const subString = text.substr(0, length - 1);
    return (
        (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString) + '...'
    );
}

export function handleLogOut(event: any) {
    event.preventDefault();
    store.dispatch(doLogoutAction());
}

export function roundAmount(comission) {
    return comission.toFixed(2);
}

export function isEmpty(field) {
    return !field || (field.length < 1)
}
