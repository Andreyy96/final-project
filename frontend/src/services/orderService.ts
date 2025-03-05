import {urls} from "../constants/urls.ts";
import {apiService} from "./apiService.ts";
import {IRes} from "../types/responeType.ts";
import {IOrderPagination} from "../interfaces/order.interface.ts";


const orderService = {
    getAll: (query: string):IRes<IOrderPagination> => apiService.get(urls.order.getAll(query)),
}

export {
    orderService
}