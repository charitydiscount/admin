import { auth } from "../index";
import { ExpressLink } from "../Helper";
import axios from "axios";
import { User } from "../models/User";
import { expressUrl } from "./_Connection";

export async function getStaffUsers() {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl + ExpressLink.USERS;

    let response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`}
    });

    return Object.entries(response.data as User)
        .map(([index, staffUser]) => {
            return staffUser;
        })
}

export async function updateStaffMember(createUser: boolean, user: User) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl + ExpressLink.USERS + '/staff/' + user.userId;

    let staffMember;
    if (createUser) {
        staffMember = 'true';
    } else {
        staffMember = user.staff;
    }

    let response = await axios.put(url, {staff: staffMember}, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}