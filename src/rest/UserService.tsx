import {DB} from "../index";
import {FirebaseTable, getSessionStorage, StorageKey} from "../Helper";

export function checkUserIsAuthorized() {
    return new Promise(((resolve) => {
        let userKey = getSessionStorage(StorageKey.USER_AUTH_KEY);
        if (userKey) {
            DB.collection(FirebaseTable.ROLES).doc(userKey)
                .get()
                .then(function (doc: any) {
                    if (doc.exists) {
                        resolve(userKey);
                    } else {
                        resolve(false);
                    }
                })
                .catch(() => {
                    resolve(false);
                });
        } else {
            resolve(false);
        }
    }));
}