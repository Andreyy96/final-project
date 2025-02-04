import { Router } from "express";

import {authMiddleware} from "../middlewares/aurh.middleware";
import {commentController} from "../controllers/comment.controller";
import {commentMiddleware} from "../middlewares/comment.middleware";

const router = Router();

// router.get(
//     "/",
//     authMiddleware.checkAccessToken,
//     orderController.getList,
// );

router.post(
    "/",
    authMiddleware.checkAccessToken,
    commentMiddleware.isOrderThisManager,
    commentController.createComment,
);

export const commentRouter = router;