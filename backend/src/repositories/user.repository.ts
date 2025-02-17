import {IUser} from "../interfaces/user.interface";
import {User} from "../models/user.model";
import {UserRoleEnum} from "../enums/user-role.enum";
import dayjs from "dayjs";



class UserRepository {
    public async getManagerList(): Promise<IUser[]> {
        return await User.find({role: UserRoleEnum.MANAGER}).sort({createdAt: -1})
    }

    public async create(dto: Partial<IUser>): Promise<IUser> {
        return await User.create(dto);
    }

    public async updateLastLoginById(userId: string): Promise<IUser> {
        const last_login = dayjs().format('MMMM D, YYYY')
        return await User.findByIdAndUpdate(userId, {last_login}, {new: true});
    }

    public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, {...dto, is_active: true}, { new: true });
    }

    public async getById(userId: string): Promise<IUser | null> {
        return await User.findById(userId).select("+password");
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).select("+password");
    }
}

export const userRepository = new UserRepository();