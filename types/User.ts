export type User = {
    username: string;
    email: string;
    password: string;
    token: string;
}

export interface IUser {
    user: User | null;
}