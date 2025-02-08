import { NextFunction, Request, Response } from "express";
import {groupRepository} from "../repositories/group,repository";
import {ApiError} from "../errors/api-error";

class GroupMiddleware {
    public async isGroupExist(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const groupName = req.body as { name: string }

            const isExist = await groupRepository.findByParams(groupName)

            if (isExist) {
                throw new ApiError("This group already created", 409);
            }

            next();
        } catch (e) {
            next(e);
        }
    }

}


export const groupMiddleware = new GroupMiddleware();