import { auth, remoteConfig } from "../index";
import { ExpressLink } from "../Helper";
import axios from "axios";

export interface MailDto {
    subject: string,
    content: string
}


export async function sendMail(mail: MailDto) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    const token = await auth.currentUser.getIdToken();
    let url = remoteConfig.getString('express_url') + ExpressLink.MAIL_NOTIFICATION;

    let response = await axios.put(url, mail, {
        headers: {Authorization: `Bearer ${token}`},
    });

    if(response.status === 200){
        return response.data;
    }

    return "Failed to send, check logs"
}