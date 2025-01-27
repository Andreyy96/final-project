import { model, Schema } from "mongoose";
import {UserRoleEnum} from "../enums/user-role.enum";
import {IUser} from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        role: { type: String, enum: UserRoleEnum, default: UserRoleEnum.ADMIN },
        is_active: { type: Boolean, default: false },
        last_login: { type: Date, required: true}
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const User = model<IUser>("users", userSchema);