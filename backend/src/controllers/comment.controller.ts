import { NextFunction, Request, Response } from "express";

import { ICreateComment} from "../interfaces/comment.intarface";
import {ITokenPayload} from "../interfaces/token.interface";
import {commentService} from "../services/comment.service";
import {ICommentQuery} from "../interfaces/query.interface";

class CommentController {

    public async createComment(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as ICreateComment;
            const {id} = req.query as unknown as ICommentQuery;
            const jwtPayload = req.res.locals.jwtPayload as ITokenPayload;
            const result = await commentService.createComment(body, jwtPayload, id);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

export const commentController = new CommentController();
