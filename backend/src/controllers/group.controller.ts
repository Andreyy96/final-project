import { NextFunction, Request, Response } from "express";
import {groupService} from "../services/group.service";

class GroupController {

    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await groupService.getList();
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    public async createGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const {name} = req.body as {name: string}

            const result = await groupService.createGroup(name);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

}

export const groupController = new GroupController();