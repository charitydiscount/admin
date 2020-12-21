import { auth } from '..';
import { ExpressLink } from '../Helper';
import { CharityCase } from '../models/CharityCase';
import { expressUrl } from './_Connection';

export const fetchCases = async (): Promise<CharityCase[]> => {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl + ExpressLink.CASES;

    let response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
};

export const createCase = async (charityCase: CharityCase): Promise<any> => {
    if (!auth.currentUser) {
        return;
    }

    if (!charityCase.description || (charityCase.description.length < 1)) {
        throw Error('Enter a description');
    }

    if (!charityCase.title || (charityCase.title.length < 1)) {
        throw Error('Enter a title');
    }

    if (!charityCase.site || (charityCase.site.length < 1)) {
        throw Error('Enter a site URL');
    }

    if (!charityCase.images || (charityCase.images.length < 1)) {
        throw Error('Enter an image');
    }

    const token = await auth.currentUser.getIdToken();
    let url = `${expressUrl}${ExpressLink.CASES}`;

    return fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(charityCase),
    });
};

export const updateCase = async (charityCase: CharityCase): Promise<any> => {
    if (!auth.currentUser || !charityCase.id) {
        return;
    }

    if (!charityCase.description || (charityCase.description.length < 1)) {
        throw Error('Enter a description');
    }

    if (!charityCase.title || (charityCase.title.length < 1)) {
        throw Error('Enter a title');
    }

    if (!charityCase.site || (charityCase.site.length < 1)) {
        throw Error('Enter a site URL');
    }

    if (!charityCase.images || (charityCase.images.length < 1)) {
        throw Error('Enter an image');
    }

    const token = await auth.currentUser.getIdToken();
    let url = `${expressUrl}${ExpressLink.CASES}/${charityCase.id}`;

    return fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(charityCase),
    });
};

export const deleteCase = async (charityCase: CharityCase): Promise<any> => {
    if (!auth.currentUser || !charityCase.id) {
        return;
    }

    const token = await auth.currentUser.getIdToken();
    let url = `${expressUrl}${ExpressLink.CASES}/${charityCase.id}`;

    return fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'DELETE',
    });
};
