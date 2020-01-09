export interface IState {
    users: Array<IUser>;
}

export interface IUser {
    firstname: String;
    lastname: String;
    id?: number;
    email: String;
    dob: Date;
    formattedDate?: String;
    gender: String;
    isadmin: Boolean,
    businessunit: String;
}