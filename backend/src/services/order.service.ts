import exceljs from "exceljs";

import { StatusEnum } from "../enums/status.enum";
import {
  IDTOOrder,
  IOrderListResponse,
  ISingleOrder,
} from "../interfaces/order.interface";
import { IQuery } from "../interfaces/query.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { orderPresenter } from "../presenters/order.presenter";
import { orderRepository } from "../repositories/order.repository";
import { userRepository } from "../repositories/user.repository";
import { excelService } from "./excel.service";
import { groupService } from "./group.service";

class OrderService {
  public async getList(query: IQuery): Promise<IOrderListResponse> {
    const [entities, total, limit] = await orderRepository.getList(query);
    return orderPresenter.toListResDto(entities, total, limit, query);
  }

  public async getStatusStatisticList(): Promise<{
    total: number;
    agree: number;
    in_work: number;
    disagree: number;
    dubbing: number;
    new: number;
    null: number;
  }> {
    const [Total, Agree, In_work, Disagree, Dubbing, New, Null] =
      await orderRepository.getStatusStatisticList();
    return {
      total: Total,
      agree: Agree,
      in_work: In_work,
      disagree: Disagree,
      dubbing: Dubbing,
      new: New,
      null: Null,
    };
  }

  public async updateStatusAndManagerById(
    id: string,
    userId: string,
    name: string,
  ): Promise<void> {
    const order = await orderRepository.getById(id);

    if (!order.status || order.status === StatusEnum.NEW) {
      await orderRepository.updateStatusAndManagerById(id, userId, name);
    }
  }

  public async updateOrderById(
    orderId: string,
    dto: IDTOOrder,
    jwtPayload: ITokenPayload,
  ): Promise<ISingleOrder> {
    const order = await orderRepository.getById(orderId);
    const user = await userRepository.getById(jwtPayload.userId);

    if (dto.group) {
      await groupService.isExistByName(dto.group);
    }

    return await orderRepository.updateById(dto, order, user);
  }

  public async getExcel(query: IQuery): Promise<exceljs.Workbook> {
    return await excelService.getWorkbook(query);
  }
}

export const orderService = new OrderService();
