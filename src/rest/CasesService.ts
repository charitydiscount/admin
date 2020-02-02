import { auth } from '..';
import { EXPRESS_URL, ExpressLink } from '../Helper';
import { CharityCase } from '../models/CharityCase';

export const fetchCases = async (): Promise<CharityCase[]> => {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = EXPRESS_URL + ExpressLink.CASES;

    let response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.json();
};

export const createCase = async (charityCase: CharityCase): Promise<any> => {
    if (!auth.currentUser) {
        return;
    }

    const token = await auth.currentUser.getIdToken();
    let url = `${EXPRESS_URL}${ExpressLink.CASES}`;

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

    const token = await auth.currentUser.getIdToken();
    let url = `${EXPRESS_URL}${ExpressLink.CASES}/${charityCase.id}`;

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
    let url = `${EXPRESS_URL}${ExpressLink.CASES}/${charityCase.id}`;

    return fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        method: 'DELETE',
    });
};
