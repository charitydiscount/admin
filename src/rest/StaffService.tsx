import { auth, remoteConfig } from "../index";
import { ExpressLink } from "../Helper";
import axios from "axios";
import { User } from "../models/User";

export async function getStaffUsers() {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = remoteConfig.getString('express_url') + ExpressLink.USERS;

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
    let url = remoteConfig.getString('express_url') + ExpressLink.USERS + '/staff/' + user.userId;

    let staffMember;
    if (createUser) {
        staffMember = 'true';
    } else {
        staffMember = user.isStaff;
    }

    let response = await axios.put(url, {isStaff: staffMember}, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}