import { Router } from "express";

import {authMiddleware} from "../middlewares/aurh.middleware";
import {orderController} from "../controllers/order.controller";
import {commonMiddleware} from "../middlewares/common.middleware";
import {OrderValidator} from "../validators/order.validator";


const router = Router();

router.get(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.isQueryValid(OrderValidator.listQuery),
    orderController.getList,
);

export const orderRouter = router;