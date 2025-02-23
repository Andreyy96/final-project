import { NextFunction, Request, Response } from "express";
import {userService} from "../services/user.service";

class UserController {

    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.getList();
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    public async bannedManagerById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId
            const result = await userService.bannedManagerById(userId);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    public async unbannedManagerById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId
            const result = await userService.unbannedManagerById(userId);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
