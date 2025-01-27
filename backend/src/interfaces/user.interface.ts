import {UserRoleEnum} from "../enums/user-role.enum";

export interface IAdmin {
    _id: string
    name: string
    email: string
    password: string
    role: UserRoleEnum
}