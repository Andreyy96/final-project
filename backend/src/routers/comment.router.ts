import { Router } from "express";

import {authMiddleware} from "../middlewares/aurh.middleware";
import {commentController} from "../controllers/comment.controller";
import {orderMiddleware} from "../middlewares/order.middleware";

const router = Router();

router.post(
    "/:orderId",
    authMiddleware.checkAccessToken,
    orderMiddleware.isOrderThisManager,
    commentController.createComment,
);

export const commentRouter = router;