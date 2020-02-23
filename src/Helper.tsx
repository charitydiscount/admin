import { store } from './index';
import { doLogoutAction } from './redux/actions/UserActions';
import { css } from '@emotion/core';

export const EXPRESS_URL =
    'https://europe-west1-charitydiscount-test.cloudfunctions.net/manage/';

export enum ExpressLink {
    PROGRAMS = 'programs',
    CASHOUT = 'cashout',
    COMMISSIONS = 'commissions',
    CASES = 'cases',
}

export enum FirebaseTable {
    ROLES = 'roles',
    META = 'meta'
}

export enum TableDocument {
    PROGRAMS = 'programs'
}

export const spinnerCss = css`
    display: block;
    margin: 200px auto;
`;

export enum SourceTypes {
    TWO_PERFORMANT = '2p',
}

export const linkStyle = {
    textDecoration: "underline",
    color: "#007bff",
    cursor: "pointer"
};

export function handleLogOut(event: any) {
    event.preventDefault();
    store.dispatch(doLogoutAction());
}

export const emptyHrefLink = '#';

export function setLocalStorage(key: string, object: any) {
    localStorage.setItem(process.env.PUBLIC_URL + key, object);
}

export function getLocalStorage(key: string) {
    return localStorage.getItem(process.env.PUBLIC_URL + key);
}

export function removeLocalStorage(key: string) {
    localStorage.removeItem(process.env.PUBLIC_URL + key);
}

export function setSessionStorage(key: string, object: any) {
    sessionStorage.setItem(process.env.PUBLIC_URL + key, object);
}

export function getSessionStorage(key: string) {
    return sessionStorage.getItem(process.env.PUBLIC_URL + key);
}

export function removeSessionStorage(key: string) {
    return sessionStorage.removeItem(process.env.PUBLIC_URL + key);
}

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

