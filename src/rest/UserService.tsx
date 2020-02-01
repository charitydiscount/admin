import { auth, DB } from '../index';
import { FirebaseTable } from '../Helper';

export interface UserInfoDto {
    name: string;
    photoUrl: string;
}

// Check if the user has the required (admin) role
export const authorizeUser = () =>
    DB.collection(FirebaseTable.ROLES)
        .doc(auth.currentUser?.uid)
        .get()
        .then(userRoles =>
            !userRoles.exists ? false : userRoles.data()?.admin === true
        );

export function getUserInfo(): UserInfoDto {
    if (auth.currentUser) {
        return {
            name: auth.currentUser.displayName || '',
            photoUrl: auth.currentUser.photoURL || '',
        };
    }
    return {
        name: '',
        photoUrl: '',
    };
}
