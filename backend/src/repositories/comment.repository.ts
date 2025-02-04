import {IComment} from "../interfaces/comment.intarface";
import {Comment} from "../models/comment.model";


class CommentRepository {
    public async create(dto: Partial<IComment>): Promise<IComment> {
        return await Comment.create(dto)
    }

    // public async getByUserId(id: string): Promise<IComment[]> {
    //     return await Comment.find({group})
    // }
}



export const commentRepository = new CommentRepository();