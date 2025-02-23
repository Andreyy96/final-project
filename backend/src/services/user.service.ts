import {userRepository} from "../repositories/user.repository";
import {IManagerListResponse, IUser} from "../interfaces/user.interface";
import {userPresenter} from "../presenters/user.presenter";
import {ApiError} from "../errors/api-error";
import {UserRoleEnum} from "../enums/user-role.enum";

class UserService {
    public async getList(): Promise<IManagerListResponse> {
        const users = await userRepository.getManagerList()
        return userPresenter.toListResDto(users)
    }

    public async bannedManagerById(userId: string): Promise<Partial<IUser>> {
        const user = await userRepository.bannedManagerById(userId)

        if (!user) {
            throw new ApiError("User not found", 421);
        }

        if (user.role === UserRoleEnum.ADMIN) {
            throw new ApiError("THis user cannot be banned", 403);
        }

        return userPresenter.toPublicResDto(user)
    }

    public async unbannedManagerById(userId): Promise<Partial<IUser>> {
        const user = await userRepository.unbannedManagerById(userId)

        if (!user) {
            throw new ApiError("User not found", 421);
        }

        return userPresenter.toPublicResDto(user)
    }
}

export const userService = new UserService();