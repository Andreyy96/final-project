import { NextFunction, Request, Response } from "express";

import { IDTOOrder } from "../interfaces/order.interface";
import { IQuery } from "../interfaces/query.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { orderService } from "../services/order.service";

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

  public async getStatusStatisticList(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const result = await orderService.getStatusStatisticList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IDTOOrder;
      const orderId = req.params.orderId;
      const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
      const result = await orderService.updateOrderById(
        orderId,
        dto,
        jwtPayload,
      );
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const orderController = new OrderController();
