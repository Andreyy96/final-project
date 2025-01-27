import {IOrderListResponse} from "../interfaces/order.interface";
import {orderRepository} from "../repositories/order.repository";
import {IQuery} from "../interfaces/query.interface";
import {orderPresenter} from "../presenters/order.presenter";

class OrderService {
    public async getList(query: IQuery): Promise<IOrderListResponse> {


        if (query.order) {
            const [entities, total] = await orderRepository.getListByOrder(query);
            return orderPresenter.toListResDto(entities, total, query)
        }
        else {
            const [entities, total] = await orderRepository.getList(query);
            return orderPresenter.toListResDto(entities, total, query)
        }

    }
}

export const orderService = new OrderService();