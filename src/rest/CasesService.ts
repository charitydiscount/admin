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
