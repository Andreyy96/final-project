import { Router } from "express";

import {authMiddleware} from "../middlewares/auth.middleware";
import {accessMiddleware} from "../middlewares/access.middleware";
import {userController} from "../controllers/user.controller";
import {commonMiddleware} from "../middlewares/common.middleware";


const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    accessMiddleware.isAdmin,
    userController.getList,
);

router.patch(
    "/banned/:userId",
    authMiddleware.checkAccessToken,
    accessMiddleware.isAdmin,
    commonMiddleware.isIdValid("userId"),
    userController.bannedManagerById,
);

router.patch(
    "/unbanned/:userId",
    authMiddleware.checkAccessToken,
    accessMiddleware.isAdmin,
    commonMiddleware.isIdValid("userId"),
    userController.unbannedManagerById,
);

export const userRouter = router;