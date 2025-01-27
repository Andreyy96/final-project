import { model, Schema } from "mongoose";
import {UserRoleEnum} from "../enums/user-role.enum";
import {IAdmin} from "../interfaces/user.interface";

const adminSchema = new Schema(
    {
            name: { type: String, required: true },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true, select: false },
            role: { type: String, enum: UserRoleEnum, default: UserRoleEnum.ADMIN },
    },
    {
            versionKey: false,
    },
);

export const Admin = model<IAdmin>("admins", adminSchema);