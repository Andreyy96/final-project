import {IUser} from "../interfaces/user.interface";
import {User} from "../models/user.model";



class UserRepository {
    public async create(dto: Partial<IUser>): Promise<IUser> {
        return await User.create(dto);
    }

    public async updateLastLoginById(userId: string): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, {last_login: new Date()});
    }


    public async getById(userId: string): Promise<IUser | null> {
        return await User.findById(userId).select("+password");
    }

    public async getByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).select("+password");
    }
}

export const userRepository = new UserRepository();