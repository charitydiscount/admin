import { auth, DB } from '../index';
import { FirebaseTable } from '../Helper';

export interface UserInfoDto {
    name: string;
    photoUrl: string;
}

export interface UserDto {
    userId: string,
    email: string
}

// Check if the user has the required (admin) role
export const authorizeUser = () =>
    DB.collection(FirebaseTable.ROLES)
        .doc(auth.currentUser?.uid)
        .get()
        .then(userRoles =>
            !userRoles.exists ? false : userRoles.data()?.admin === true
        );

export function getAllUsers() {
    return new Promise((resolve, reject) => {
        DB.collection(FirebaseTable.USERS)
            .get()
            .then(
                querySnapshot => {
                    let data = new Map<string, string>();
                    querySnapshot.docs.forEach(value => {
                        data.set(value.id, (value.data() as UserDto).email)
                    });
                    resolve(data);
                }
            ).catch(() => reject());
    });
}

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
