export interface User {
    userId: string;
    name?: string;
    email: string;
    photoUrl: string;
    roles?: Roles;
}

export enum BooleanOptions {
    TRUE = 'true',
    FALSE = 'false',
}

export const DEFAULT_USER: User = {
    userId: '',
    email: '',
    photoUrl: '',
    roles: { admin: false },
};

export interface Roles {
    admin: boolean;
}
