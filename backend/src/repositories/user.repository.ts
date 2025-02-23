import {IUser, IUserWithStatistic} from "../interfaces/user.interface";
import {User} from "../models/user.model";
import {UserRoleEnum} from "../enums/user-role.enum";
import dayjs from "dayjs";
import {StatusEnum} from "../enums/status.enum";



class UserRepository {
    public async getManagerList(): Promise<IUserWithStatistic[]> {
        return await User.aggregate([
            {
                $match: {role: UserRoleEnum.MANAGER}
            },
            {
                $lookup: {
                    from: "orders",
                    let: { userId: "$_id" },
                    as: "total",
                    pipeline: [{ $match: { $expr: { $eq: ["$_userId", "$$userId"] } } }],
                }
            },
            {
                $lookup: {
                    from: "orders",
                    let: { userId: "$_id" },
                    as: "in_work",
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
                        { $match: { status: { $eq: StatusEnum.IN_WORK } } },
                    ],
                },
            },
            {
                $lookup: {
                    from: "orders",
                    let: { userId: "$_id" },
                    as: "agree",
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
                        { $match: { status: { $eq: StatusEnum.AGREE } } },
                    ],
                },
            },
            {
                $lookup: {
                    from: "orders",
                    let: { userId: "$_id" },
                    as: "disagree",
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
                        { $match: { status: { $eq: StatusEnum.DISAGREE } } },
                    ],
                },
            },
            {
                $lookup: {
                    from: "orders",
                    let: { userId: "$_id" },
                    as: "dubbing",
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_userId", "$$userId"] } } },
                        { $match: { status: { $eq: StatusEnum.DUBBING } } },
                    ],
                },
            },
            {$sort: {createdAt: -1}}
        ])
    }

    public async getLustUser(): Promise<IUser[]> {
        return await User.find({role: UserRoleEnum.MANAGER}).sort({id: -1}).limit(1)
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

    public async bannedManagerById(userId: string): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, {is_banned: true}, { new: true });
    }

    public async unbannedManagerById(userId: string): Promise<IUser> {
        return await User.findByIdAndUpdate(userId, {is_banned: false}, { new: true });
    }
}

export const userRepository = new UserRepository();