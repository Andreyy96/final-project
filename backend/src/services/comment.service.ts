import {IComment, ICreateComment} from "../interfaces/comment.intarface";
import {ITokenPayload} from "../interfaces/token.interface";
import {commentRepository} from "../repositories/comment.repository";
import {orderService} from "./order.service";
import {userRepository} from "../repositories/user.repository";
import {orderRepository} from "../repositories/order.repository";


class CommentService {
   public async createComment(dto: ICreateComment, jwtPayload: ITokenPayload, id: string): Promise<IComment> {
       const date = new Date()
       const user = await userRepository.getById(jwtPayload.userId)
       const order = await orderRepository.getById(id)

       const comment = await commentRepository.create({
           body: dto.body,
           manager_name: user.name,
           manager_surname: user.surname,
           date: `${date.toLocaleString("en-GB", { month: 'long' })} ${date.getDate()} ${date.getFullYear()}`,
           _userId: user._id,
           _orderId: order._id
       })

       await orderService.updateStatusAndManagerById(id, user._id, user.name)

       return comment
   }
}

export const commentService = new CommentService();