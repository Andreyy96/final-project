import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api-error";
import {ITokenPayload} from "../interfaces/token.interface";
import {orderRepository} from "../repositories/order.repository";
import {ICommentQuery} from "../interfaces/query.interface";

class CommentMiddleware {
    public async isOrderThisManager(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const {id} = req.query as unknown as ICommentQuery;
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;



            const order = await orderRepository.getById(id);

            console.log("order", order)
            console.log("payload", jwtPayload)
            if (order._userId && jwtPayload.userId !== order._userId.toString()) {
                throw new ApiError("This user cannot add comments", 403);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const commentMiddleware = new CommentMiddleware()