import { NextFunction, Request, Response } from "express";

import {orderService} from "../services/orderService";
import {IQuery} from "../interfaces/query.interface";

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
}

export const orderController = new OrderController();
