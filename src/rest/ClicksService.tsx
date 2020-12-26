import { auth, expressUrl } from "../index";
import { ExpressLink, ProxyDate } from "../Helper";
import axios from "axios";

export interface ClickDto {
    createdAt: ProxyDate,
    deviceType: string,
    ipAddress: string,
    ipv6Address: string,
    userId: string,
    programId: string,
    id: string
}

export interface ClickCreateDto {
    deviceType: string,
    ipAddress: string,
    ipv6Address: string,
    userId: string,
    programId: string
}

export const DEFAULT_CLICK: ClickCreateDto = {
    deviceType: '',
    ipAddress: '',
    ipv6Address: '',
    userId: '',
    programId: '',
};

export async function getClicks() {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl + ExpressLink.CLICKS;

    let response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`}
    });

    return Object.entries(response.data as ClickDto)
        .map(([index, click]) => {
            return click;
        })
        .sort((c1, c2) => {
            if (c1.createdAt._seconds > c2.createdAt._seconds) {
                return -1;
            } else {
                return 1;
            }
        });
}

export async function createClick(click: ClickCreateDto) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    if (!click.deviceType || (click.deviceType.length < 1)) {
        throw Error('Enter a device type');
    }

    if (!click.programId || (click.programId.length < 1)) {
        throw Error('Enter a program(shop)');
    }

    if (!click.ipAddress || (click.ipAddress.length < 1)) {
        throw Error('Enter an ipAddress');
    }

    if (!click.userId || (click.userId.length < 1)) {
        throw Error('Enter an user Id');
    }

    const token = await auth.currentUser.getIdToken();
    const url = expressUrl + ExpressLink.CLICKS;

    click.programId = click.programId + '';
    const response = await axios.post(url, click, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}

export async function updateClick(clickId: string, click: ClickCreateDto) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl +  ExpressLink.CLICKS + '/' + clickId;

    let requestUpdate = {
        deviceType: click.deviceType,
        ipAddress: click.ipAddress,
        ipv6Address: click.ipv6Address,
        userId: click.userId,
        programId: click.programId + ''
    };

    let response = await axios.put(url, requestUpdate, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}