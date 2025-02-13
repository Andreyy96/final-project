import {IDTOOrder, IOrder, IOrderListResponse, ISingleOrder} from "../interfaces/order.interface";
import {orderRepository} from "../repositories/order.repository";
import {IQuery} from "../interfaces/query.interface";
import {orderPresenter} from "../presenters/order.presenter";
import {groupService} from "./group.service";
import {StatusEnum} from "../enums/status.enum";

class OrderService {
    public async getList(query: IQuery): Promise<IOrderListResponse> {


        if ((query.name || query.surname || query.age || query.group || query.course || query.course_format ||
            query.course_type || query.email || query.status || query.phone || query.start_date || query.manager || query.end_date) && !query.order) {
            const [entries, total, limit] = await orderRepository.getListNoAggregation(query)
            const orders = await this.makeOneArray(entries)
            return orderPresenter.toListResDto(orders, total, limit, query)
        }
        else if ((query.name || query.surname || query.age || query.group || query.course || query.course_format ||
            query.course_type || query.email || query.status || query.phone || query.start_date || query.manager || query.end_date) && query.order) {
            const [entries, total, limit] = await orderRepository.getSortListNoAggregation(query)
            const orders = await this.makeOneArray(entries)
            return orderPresenter.toListResDto(orders, total, limit, query)
        }
        else if (query.order) {
            const [entities, total, limit] = await orderRepository.getListByOrder(query);
            return orderPresenter.toListResDto(entities, total, limit, query)
        }
        else {
            const [entities, total, limit] = await orderRepository.getList(query);
            return orderPresenter.toListResDto(entities, total, limit, query)
        }
    }

    public async updateStatusAndManagerById(id: string, userId: string, name: string): Promise<void> {
        const order = await orderRepository.getById(id)

        if (!order.status || order.status === StatusEnum.NEW) {
            await orderRepository.updateStatusAndManagerById(id, userId, name)
        }
    }

    public async updateOrderById(orderId: string, dto: IDTOOrder): Promise<ISingleOrder> {
        const order = await orderRepository.getById(orderId)

        if (dto.group) {
            await groupService.isExistByName(dto.group)
        }

        return await orderRepository.updateById(dto, order)
    }

    private async makeOneArray(entities: IOrder[]): Promise<IOrder[]> {
        const maped = await Promise.all(entities.map(async order => await orderRepository.getCommentsAndManagerInfo(order)))
        let arrRows = [];
        arrRows = arrRows.concat.apply(arrRows, maped);
        return arrRows
    }

}

export const orderService = new OrderService();