import {Pagination} from "@mui/material";


import {ChangeEvent} from "react";
import {usePageQuery} from "../../../hooks/usePageQuery.ts";
import "./OrderPagination.module.css"

const OrderPagination = () => {

    const {page, handleChange, total_page}: {page: string, handleChange: (event: ChangeEvent<unknown>, value: number) => void, total_page: number} = usePageQuery()



    return (
        <div>
            <Pagination
                count={total_page}
                page={+page}
                onChange={handleChange}
                siblingCount={2}
                boundaryCount={1}
            />
        </div>
    );
};

export {OrderPagination};