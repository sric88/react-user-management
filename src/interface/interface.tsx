export interface IState {
    users: Array<IUser>;
}

export interface IUser {
    firstname: string;
    lastname: string;
    id?: number;
    email: string;
    dob: Date;
    formattedDate?: string;
    gender: string;
    isadmin: boolean,
    businessunit: string;
}