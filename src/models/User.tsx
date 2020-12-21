export interface User {
    userId: string;
    firstName?: string;
    lastName?: string;
    email: string;
    photoUrl: string;
    staff: boolean;
    admin: boolean;
}

export enum BooleanOptions {
    TRUE = 'true',
    FALSE = 'false',
}

export const DEFAULT_USER: User = {
    userId: '',
    email: '',
    photoUrl: '',
    staff: false,
    admin: false,
};
