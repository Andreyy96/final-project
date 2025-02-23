import { NextFunction, Request, Response } from "express";

import {orderService} from "../services/order.service";
import {IQuery} from "../interfaces/query.interface";
import {IDTOOrder} from "../interfaces/order.interface";

class OrderController {

    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as unknown as IQuery;

            const result = await orderService.getList(query);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    public async getStatusStatisticList(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await orderService.getStatusStatisticList();
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    public async updateOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IDTOOrder
            const orderId = req.params.orderId
            const result = await orderService.updateOrderById(orderId, dto);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

export const orderController = new OrderController();
