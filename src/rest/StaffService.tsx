import { auth } from '../index';
import { ExpressLink } from '../Helper';
import axios from 'axios';
import { User } from '../models/User';
import { expressUrl } from './_Connection';

export async function getStaffUsers(): Promise<User[]> {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl + ExpressLink.USERS;

    let response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
}

export async function updateStaffMember(createUser: boolean, user: User) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl + ExpressLink.USERS + '/staff/' + user.userId;

    const isAdmin: boolean = createUser ? true : user.roles.admin;
    const response = await axios.put(
        url,
        { admin: isAdmin },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return response.status === 200;
}
