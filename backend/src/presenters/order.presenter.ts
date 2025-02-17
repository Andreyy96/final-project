import {IOrder, IOrderListResponse, IOrderResponse} from "../interfaces/order.interface";
import {IQuery} from "../interfaces/query.interface";
import {userPresenter} from "./user.presenter";
import {commentPresenter} from "./comment.presenter";

class OrderPresenter {
    toPublicResDto(entity: IOrder): IOrderResponse {
        return {
            _id: entity._id,
            id: entity.id,
            name: entity.name,
            surname: entity.surname,
            email: entity.email,
            phone: entity.phone,
            age: entity.age,
            course: entity.course,
            course_format: entity.course_format,
            course_type: entity.course_type,
            sum: entity.sum,
            already_paid: entity.already_paid,
            group: entity.group,
            status: entity.status,
            msg: entity.msg,
            utm: entity.utm,
            created_at: entity.created_at,
            manager: entity.manager ? entity.manager : null,
            manager_info: entity.manager_info.length <= 0 ? null : userPresenter.toPublicResDto(entity.manager_info[0]),
            comments: entity.comments.length <= 0 ? null : entity.comments.map(comment => commentPresenter.toPublicResDto(comment))
        };
    }

    public toListResDto(
        entities: IOrder[],
        total: number,
        limit: number,
        query: IQuery,
    ): IOrderListResponse {
        return {
            data: entities.map(this.toPublicResDto),
            page: query.page ? +query.page : 1,
            total,
            limit
        };
    }
}

export const orderPresenter = new OrderPresenter();