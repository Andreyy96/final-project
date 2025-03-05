import {FC} from 'react';
import {IOrder} from "../../../interfaces/order.interface.ts";

interface IProps {
    order: IOrder
}

const Order: FC<IProps> = ({order}) => {
    return (
        <tr>
            <th>{order.id}</th>
            <th>{order.name ? order.name : "null"}</th>
            <th>{order.surname ? order.surname : "null"}</th>
            <th>{order.email ? order.email : "null"}</th>
            <th>{order.phone ? order.phone : "null"}</th>
            <th>{order.age ? order.age : "null"}</th>
            <th>{order.course ? order.course : "null"}</th>
            <th>{order.course_format ? order.course_format : "null"}</th>
            <th>{order.course_type ? order.course_type : "null"}</th>
            <th>{order.status ? order.status : "null"}</th>
            <th>{order.sum ? order.sum : "null"}</th>
            <th>{order.already_paid ? order.already_paid : "null"}</th>
            <th>{order.group ? order.group : "null"}</th>
            <th>{order.created_at ? order.created_at : "null"}</th>
            <th>{order.manager ? order.manager : "null"}</th>
        </tr>
)};

export {Order};