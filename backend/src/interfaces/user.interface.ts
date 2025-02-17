import {UserRoleEnum} from "../enums/user-role.enum";

export interface IUser {
    _id: string
    name: string
    surname: string
    email: string
    password: string
    role: UserRoleEnum
    is_active: boolean
    last_login: Date
    is_banned: boolean
}

export interface IDTOUser {
    name: string
    surname: string
    email: string
}