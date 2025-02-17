import {IUser} from "../interfaces/user.interface";
import {userRepository} from "../repositories/user.repository";

class UserService {
    public async getList(): Promise<IUser[]> {
        return await userRepository.getManagerList()
    }
}

export const userService = new UserService();