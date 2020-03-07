import { auth, remoteConfig } from "../index";
import { ExpressLink, ProxyDate } from "../Helper";
import axios from "axios";

export interface MessageDto {
    createdAt: ProxyDate
    email: string,
    message: string,
    name: string,
    subject: string,
    userId: string,
    status: string,
    id: string
}

export async function getMessages() {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = remoteConfig.getString('express_url') + ExpressLink.MESSAGES;

    let response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`}
    });

    return Object.entries(response.data as MessageDto)
        .map(([index, program]) => {
            return program;
        });
}

export async function getNewMessages() {
    if (!auth.currentUser) {
        return [];
    }

    const token = await auth.currentUser.getIdToken();
    let url = remoteConfig.getString('express_url') + ExpressLink.MESSAGES;

    let response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`}
    });

    let entries = Object.entries(response.data as MessageDto)
        .map(([index, program]) => {
            return program;
        }).filter(
            value => value.status === "NEW"
        );
    return entries.length;
}

export async function updateMessage(message: MessageDto) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    const token = await auth.currentUser.getIdToken();
    let url = remoteConfig.getString('express_url') + ExpressLink.MESSAGES + '/' + message.id;

    let requestUpdate = {
        status: message.status
    };

    let response = await axios.put(url, requestUpdate, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}