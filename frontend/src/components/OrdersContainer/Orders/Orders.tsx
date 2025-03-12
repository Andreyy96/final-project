import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {useEffect} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";
import {orderActions} from "../../../store/slices/orderSlice.ts";
import {Order} from "../Order/Order.tsx";
import css from "./Orders.module.css"
import {OrderPagination} from "../OrderPagination/OrderPagination.tsx";
import {useAppLocation} from "../../../hooks/useAppLocation.ts";
import {useAppSortTable} from "../../../hooks/useAppSortTable.ts";
import {ISortOrder} from "../../../interfaces/order.interface.ts";
import {OrderFilter} from "../OrderFilter/OrderFilter.tsx";
import {usePageQuery} from "../../../hooks/usePageQuery.ts";
import {groupActions} from "../../../store/slices/groupSlice.ts";

const Orders = () => {

    const {orders} = useAppSelector(state => state.order)
    const {trigger} = useAppSelector(state => state.comment)
    const {groupTrigger} = useAppSelector(state => state.group)
    const {orderTrigger} = useAppSelector(state => state.order)
    const {total_page} = usePageQuery()
    const dispatch = useAppDispatch()
    const {
        sortById,
        sortByName,
        sortBySurname,
        sortByEmail,
        sortByPhone,
        sortByAge,
        sortByCourse,
        sortByCourseFormat,
        sortByCourseType,
        sortByStatus,
        sortBySum,
        sortByAlreadyPaid,
        sortByGroup,
        sortByCreatedAt,
        sortByManager
    }: ISortOrder = useAppSortTable()

    const {search} = useAppLocation()

    useEffect(() => {
        dispatch(orderActions.getAll({query: search}))
        dispatch(groupActions.getAll())
    }, [dispatch, search, trigger, groupTrigger, orderTrigger]);

    return (
        <div className={css.main_page_div}>
            <OrderFilter/>
        <table>
            <thead>
            <tr>
                <th onClick={sortById}>id</th>
                <th onClick={sortByName}>name</th>
                <th onClick={sortBySurname}>surname</th>
                <th onClick={sortByEmail}>email</th>
                <th onClick={sortByPhone}>phone</th>
                <th onClick={sortByAge}>age</th>
                <th onClick={sortByCourse}>course</th>
                <th onClick={sortByCourseFormat}>course_format</th>
                <th onClick={sortByCourseType}>course_type</th>
                <th onClick={sortByStatus}>status</th>
                <th onClick={sortBySum}>sum</th>
                <th onClick={sortByAlreadyPaid}>already_paid</th>
                <th onClick={sortByGroup}>group</th>
                <th onClick={sortByCreatedAt}>created_at</th>
                <th onClick={sortByManager}>manager</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order, index) => <Order order={order} index={index+1} key={order._id}/>)}
            </tbody>
        </table>
            {total_page !== 1 && <OrderPagination/>}
        </div>
    );
};

export {Orders};
