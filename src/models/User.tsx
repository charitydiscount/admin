export interface User {
    userId: string,
    email: string,
    photoUrl: string,
    isStaff: boolean,
}

export enum BooleanOptions {
    TRUE = 'true',
    FALSE = 'false'
}

export const DEFAULT_USER: User = {
    userId: '',
    email: '',
    photoUrl: '',
    isStaff: false
};