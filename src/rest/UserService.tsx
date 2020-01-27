import { auth, DB } from "../index";
import { FirebaseTable, getSessionStorage, removeSessionStorage, StorageKey } from "../Helper";

export interface UserInfoDto {
    name: string,
    photoUrl: string
}

export function checkUserIsAuthorized() {
    return new Promise(((resolve) => {
        let userKey = getSessionStorage(StorageKey.USER_AUTH_KEY);
        if (userKey) {
            removeSessionStorage(StorageKey.USER_AUTH_KEY);
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

export function getUserInfo(): UserInfoDto {
    if (auth.currentUser) {
        return {
            name: auth.currentUser.displayName || '',
            photoUrl: auth.currentUser.photoURL || ''
        }
    }
    return {
        name: '',
        photoUrl: ''
    };
}