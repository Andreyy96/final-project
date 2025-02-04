import {IUser} from "./user.interface";
import {IComment} from "./comment.intarface";

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
    manager: string | null
    manager_info: IUser[] | null
    comments: IComment[] | null
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
    manager: string | null
    manager_info: Partial<IUser> | null
    comments: Partial<IComment>[] | null
}

export interface ISingleOrder{
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
    _userId: string | null,
    _commentId: string | null
}

export interface IOrderListResponse {
    data: IOrderResponse[];
    total: number;
    limit: number;
    page: number;
}