import {useSearchParams} from "react-router-dom";
import {ChangeEvent} from "react";
import {useAppSelector} from "./useAppSelector.ts";

const usePageQuery = () => {

    const {total, limit} = useAppSelector(state => state.order)
    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page');

    const total_page = Math.ceil(total / limit)

    return {
        page: page ? page : "1",
        handleChange: (event: ChangeEvent<unknown>, value: number) => {
            setQuery(prev => {
                prev.set('page', (value).toString())
                return prev
            })
        },
        total_page
    }
}

export {usePageQuery}