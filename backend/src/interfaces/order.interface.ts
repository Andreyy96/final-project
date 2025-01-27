import {IUser} from "./user.interface";

export interface IOrder{
    _id: string
    name: string
    surname: string | null,
    email: string | null,
    phone: string | null,
    age: number | null,
    course: string | null,
    course_format: string | null,
    course_type: string | null,
    sum: number | null,
    already_paid: number | null,
    created_at: string | null,
    utm: string | null,
    msg: string | null,
    status: string | null,
    group: string | null,
    manager: IUser[] | null
}

export interface IOrderResponse{
    _id: string
    name: string
    surname: string | null,
    email: string | null,
    phone: string | null,
    age: number | null,
    course: string | null,
    course_format: string | null,
    course_type: string | null,
    sum: number | null,
    already_paid: number | null,
    created_at: string | null,
    utm: string | null,
    msg: string | null,
    status: string | null,
    group: string | null,
    manager: Partial<IUser> | null
}

export interface IOrderListResponse {
    data: IOrderResponse[];
    total: number;
    page: number;
}