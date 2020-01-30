import { store } from "./index";
import { doLogoutAction } from "./redux/actions/UserActions";
import {css} from '@emotion/core';

export enum StorageKey {
    //SESSION STORAGE
    USER_AUTH_KEY = '/userAdminAuthCD'
}

export const EXPRESS_URL = 'https://europe-west1-charitydiscount-test.cloudfunctions.net/manage/';

export enum ExpressLink {
    PROGRAMS = "programs"
}

export enum FirebaseTable {
    ROLES = "roles"
}

export const spinnerCss = css`
    display: block;
    margin: 200px auto;
`;


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
