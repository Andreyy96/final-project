import {urls} from "../constants/urls.ts";
import {apiService} from "./apiService.ts";
import {IRes} from "../types/responeType.ts";
import {IOrderPagination, IUpdateDtoOrder} from "../interfaces/order.interface.ts";

const orderService = {
    getAll: (query: string):IRes<IOrderPagination> => apiService.get(urls.order.getAll(query)),
    updateById: (id: string, dto: IUpdateDtoOrder):IRes<void> => apiService.put(urls.order.updateById(id), dto),
}

export {
    orderService
}