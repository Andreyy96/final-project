import {Order} from "../models/order.model";
import {ListOrderByEnum} from "../enums/orderBy.enum";
import {IOrder, ISingleOrder} from "../interfaces/order.interface";
import {IQuery} from "../interfaces/query.interface";

class OrderRepository {
    public async getList(query: IQuery): Promise<[IOrder[], number, number]> {

        const page = query.page ? query.page : 1

        const skip = 25 * (+page - 1);

        return await Promise.all([
            Order.aggregate([
                {
                    $lookup: {
                        from: "users",
                        let: { userId: "$_userId" },
                        as: "manager_info",
                        pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userId"] } } }],
                    },
                },
                {
                    $lookup: {
                        from: "comments",
                        let: { id: "$_id" },
                        as: "comments",
                        pipeline: [{ $match: { $expr: { $eq: ["$_orderId", "$$id"] } } }],
                    },
                },
                { $skip: skip },
            ]).limit(25),
            Order.countDocuments(),
            25
        ])
    }

    public async getListByOrder(query: IQuery): Promise<[IOrder[], number, number]> {
        let sortObj: Record<string, 1 | -1>;

        const page = query.page ? query.page : 1

            switch (query.order) {
                case ListOrderByEnum.ID:
                    sortObj = {_id: 1}
                    break
                case ListOrderByEnum._ID:
                    sortObj = {_id: -1}
                    break
                case ListOrderByEnum.NAME:
                    sortObj = {name: 1}
                    break
                case ListOrderByEnum._NAME:
                    sortObj = {name: -1}
                    break
                case ListOrderByEnum.SURNAME:
                    sortObj = {surname: 1}
                    break
                case ListOrderByEnum._SURNAME:
                    sortObj = {surname: -1}
                    break
                case ListOrderByEnum.EMAIL:
                    sortObj = {email: 1}
                    break
                case ListOrderByEnum._EMAIL:
                    sortObj = {email: -1}
                    break
                case ListOrderByEnum.AGE:
                    sortObj = {age: 1}
                    break
                case ListOrderByEnum._AGE:
                    sortObj = {age: -1}
                    break
                case ListOrderByEnum.COURSE:
                    sortObj = {course: 1}
                    break
                case ListOrderByEnum._COURSE:
                    sortObj = {course: -1}
                    break
                case ListOrderByEnum.COURSE_FORMAT:
                    sortObj = {course_format: 1}
                    break
                case ListOrderByEnum._COURSE_FORMAT:
                    sortObj = {course_format: -1}
                    break
                case ListOrderByEnum.COURSE_TYPE:
                    sortObj= {course_type: 1}
                    break
                case ListOrderByEnum._COURSE_TYPE:
                    sortObj = {course_type: -1}
                    break
                case ListOrderByEnum.SUM:
                    sortObj = {sum: 1}
                    break
                case ListOrderByEnum._SUM:
                    sortObj = {sum: 1}
                    break
                case ListOrderByEnum.ALREADY_PAID:
                    sortObj = {already_paid: 1}
                    break
                case ListOrderByEnum._ALREADY_PAID:
                    sortObj = {already_paid: -1}
                    break
                case ListOrderByEnum.CREATED_AT:
                    sortObj = {created_at: 1}
                    break
                case ListOrderByEnum._CREATED_AT:
                    sortObj = {created_at: -1}
                    break
                case ListOrderByEnum.UTM:
                    sortObj = {utm: 1}
                    break
                case ListOrderByEnum._UTM:
                    sortObj = {utm: -1}
                    break
                case ListOrderByEnum.STATUS:
                    sortObj = {status: 1}
                    break
                case ListOrderByEnum._STATUS:
                    sortObj = {status: -1}
                    break
                case ListOrderByEnum.MANAGER:
                    sortObj = {manager: 1}
                    break
                case ListOrderByEnum._MANAGER:
                    sortObj = {manager: -1}
                    break
            }


        const skip = 25 * (+page - 1);

       return await Promise.all([
           Order.aggregate([
               {
                   $lookup: {
                       from: "users",
                       let: { userId: "$_userId" },
                       as: "manager_info",
                       pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userId"] } } }],
                   },
               },
               {
                   $lookup: {
                       from: "comments",
                       let: { id: "$_id" },
                       as: "comments",
                       pipeline: [{ $match: { $expr: { $eq: ["$_orderId", "$$id"] } } }],
                   },
               },
               { $sort: sortObj },
               { $skip: skip },

           ]).limit(25),
           Order.countDocuments(),
           25
       ])
    }


    public async getById(id: string): Promise<ISingleOrder> {
        return await Order.findById({_id: id});
    }

    public async updateStatusAndManagerById(id: string, userId: string, name: string): Promise<void> {
        await Order.findByIdAndUpdate(id, { manager: name, status: "In work", _userId: userId,});
    }
}

export const orderRepository = new OrderRepository();