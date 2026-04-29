export interface IUser {
    id: string;
    email: string;
}

export interface IAuthResponse {
    message: string;
    token: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister {
    email: string;
    password: string;
}