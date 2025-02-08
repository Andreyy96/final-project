import { Router } from "express";

import {authMiddleware} from "../middlewares/aurh.middleware";
import {orderController} from "../controllers/order.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {OrderValidator} from "../validators/order.validator";
import {orderMiddleware} from "../middlewares/order.middleware";


const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.isQueryValid(OrderValidator.listQuery),
    orderController.getList,
);

router.put(
    "/:orderId",
    authMiddleware.checkAccessToken,
    orderMiddleware.isOrderThisManager,
    commonMiddleware.isBodyValid(OrderValidator.updateOrder),
    orderController.updateOrder,
);

export const orderRouter = router;