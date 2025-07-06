import {useSearchParams} from "react-router-dom";
import {ChangeEvent} from "react";
import {useAppSelector} from "./useAppSelector.ts";
import {orderActions} from "../store/slices/orderSlice.ts";
import {useAppDispatch} from "./useAppDispatch.ts";

const usePageQuery = () => {

    const {total, limit} = useAppSelector(state => state.order)
    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');

    const dispatch = useAppDispatch()

    const total_page = Math.ceil(total / limit)

    return {
        page: page ? page : "1",
        handleChange: (_event: ChangeEvent<unknown>, value: number) => {
            dispatch(orderActions.setString(null))
            setQuery(prev => {
                prev.set('page', (value).toString())
                return prev
            })
        },
        total_page
    }
}

export {usePageQuery}