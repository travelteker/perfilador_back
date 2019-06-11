import { Router } from "express";

export interface IOptionsEnv {
    encoding: string,
    path: string
}

export interface IController {
    path: string;
    router: Router;
}


export interface IRouter {
    path: string;
    optionsRouter: any;
    router: Router;
}


export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
    active?: boolean;
    cus?: string;
}


export interface ICredential {
    apiKey: string,
    active: boolean,
    created_at: Date,
    tag: Object,
    valid: Date
}


export interface IGetToken {
    xapikey: string
}

export interface IApiKey {
    active: boolean,
    tag: string[],
    validUntil: Date
}


export interface ITokenData {
    token: string;
    expiresIn: number;
}


export interface IDataStoredInToken {
    xcus: string;
}