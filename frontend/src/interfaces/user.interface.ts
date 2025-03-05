import {UserRoleEnum} from "../enums/user-role.enum.ts";
import {ITokenPair} from "./token.interface.ts";

export interface IUser {
    _id: string
    id: number
    name: string
    surname: string
    email: string
    role: UserRoleEnum
    is_active: boolean
    last_login: Date
    is_banned: boolean
}

export interface IAuthUser {
    user: IUser,
    tokens: ITokenPair
}

export interface IManagerInfo {
	_id: string;
	id: number;
	name: string;
	surname: string;
	email: string;
	is_active: boolean;
	last_login: string;
	is_banned: boolean;
	role: string;
}