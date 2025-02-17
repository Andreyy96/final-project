import { Router } from "express";

import {authMiddleware} from "../middlewares/auth.middleware";
import {accessMiddleware} from "../middlewares/access.middleware";
import {userController} from "../controllers/user.controller";


const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    accessMiddleware.isAdmin,
    userController.getList,
);

export const userRouter = router;