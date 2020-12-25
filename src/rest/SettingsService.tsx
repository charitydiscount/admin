import { auth, DB } from "../index";
import { ExpressLink, FirebaseTable, TableDocument } from "../Helper";
import axios from "axios";
import { expressUrl } from "./_Connection";

export interface SettingsDTO {
    cashoutEmails: string[]
}

export function getSettings() {
    return DB.collection(FirebaseTable.META).doc(TableDocument.SETTINGS).get()
        .then(doc => {
            if (doc.exists) {
                return doc.data() as SettingsDTO;
            } else {
                return null;
            }
        })
        .catch(() => {
            return null;
        })

}

export async function updateSettings(settings: SettingsDTO) {
    if (!auth.currentUser) {
        throw Error('User not logged in');
    }

    const token = await auth.currentUser.getIdToken();
    let url = expressUrl + ExpressLink.SETTINGS;

    let response = await axios.put(url, settings, {
        headers: {Authorization: `Bearer ${token}`},
    });

    return response.status === 200;
}