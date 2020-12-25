import { User } from '../models/User';

export const isStaff = (user: User) => user.roles?.admin === true;
