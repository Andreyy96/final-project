import { Router } from "express";

import {authMiddleware} from "../middlewares/aurh.middleware";
import {orderController} from "../controllers/order.controller";


const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    orderController.getList,
);

export const orderRouter = router;