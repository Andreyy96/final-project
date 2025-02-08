import {IGroup} from "../interfaces/group.interface";
import {groupRepository} from "../repositories/group,repository";
import {ApiError} from "../errors/api-error";

class GroupService {
    public async getList(): Promise<IGroup[]> {
        return await groupRepository.getAll()
    }

    public async createGroup(name: string): Promise<IGroup> {
        return await groupRepository.create({name})
    }

    public async isExistByName(name: string): Promise<void> {
        const isExist = await groupRepository.findByParams({name})

        if (!isExist) {
            throw new ApiError("This group not found", 421)
        }
    }
}

export const groupService = new GroupService();