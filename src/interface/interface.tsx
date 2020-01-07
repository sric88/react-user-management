export interface IState {
    users: Array<IUserList>;
}

export interface IUserList {
    firstname: String;
    lastname: String;
    id: number;
    email: String;
    DOB: String;
    gender: String;
    isadmin: Boolean,
    businessunit: String;
}