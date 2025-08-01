import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";
import {orderActions} from "../../../store/slices/orderSlice.ts";
import {Order} from "../Order/Order.tsx";
import css from "./Orders.module.css"
import {OrderPagination} from "../OrderPagination/OrderPagination.tsx";
import {useAppLocation} from "../../../hooks/useAppLocation.ts";
import {useAppSortTable} from "../../../hooks/useAppSortTable.ts";
import {ISortOrder} from "../../../interfaces/order.interface.ts";
import {usePageQuery} from "../../../hooks/usePageQuery.ts";
import {useDebounce} from "../../../hooks/useDebounce.ts";
import { CircularProgress } from "@mui/material";
import {useAppContext} from "../../../hooks/useAppContext.ts";

const Orders = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {orders} = useAppSelector(state => state.order)
    const {trigger, createCommentAction} = useAppSelector(state => state.comment)
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
    const debouncedSearchTerm = useDebounce(search, 1000);

    const [flag, setFlag] = useAppContext();

    console.log("flag", flag)
    useEffect(() => {
            // if (debouncedSearchTerm.debouncedValue) {
            //     dispatch(orderActions.getAll({query: debouncedSearchTerm.debouncedValue}))
            // } else {
            //     dispatch(orderActions.getAll({query: search}))
            // }

        const fetchData = async () => {
                if (debouncedSearchTerm.debouncedValue) {
                    if (flag) {
                        setIsLoading(false)
                    } else  {
                        setIsLoading(true)
                    }
                     const {meta: {requestStatus}} = await dispatch(orderActions.getAll({query: debouncedSearchTerm.debouncedValue}))
                    if (requestStatus==='fulfilled'){
                        setFlag(false)
                        setIsLoading(false)
                    }
                } else {
                    if (flag) {
                        setIsLoading(false)
                    } else  {
                        setIsLoading(true)
                    }
                    const {meta: {requestStatus}} = await dispatch(orderActions.getAll({query: search}))
                    if (requestStatus==='fulfilled'){
                        setFlag(false)
                        setIsLoading(false)
                    }
                }
        };

        fetchData();
    }, [debouncedSearchTerm.debouncedValue, trigger, orderTrigger]);
    console.log(isLoading, createCommentAction)
    return (
        <div className={css.main_page_div}>

            { isLoading && !createCommentAction  ?
                <div className={css.loader_div}><CircularProgress size={160} /></div>
                :
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
            }
            {(total_page !== 1 && !isLoading) && <OrderPagination/>}

        </div>
    );
};

export {Orders};
