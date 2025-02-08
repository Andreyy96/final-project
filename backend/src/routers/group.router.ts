import { Router } from "express";

import {authMiddleware} from "../middlewares/aurh.middleware";
import {commonMiddleware} from "../middlewares/common.middleware";
import {GroupValidator} from "../validators/group.validator";
import {groupMiddleware} from "../middlewares/group.middleware";
import {groupController} from "../controllers/group.controller";


const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    groupController.getList,
);

router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(GroupValidator.createGroupDTO),
    groupMiddleware.isGroupExist,
    groupController.createGroup,
);

export const groupRouter = router;