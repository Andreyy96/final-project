// import {useAppLocation} from "../hooks/useAppLocation.ts";
// import {useSearchParams} from "react-router-dom";

import {Orders} from "../components/OrdersContainer/Orders/Orders.tsx";

const OrderPage = () => {
    // const {pathname, key, search} = useAppLocation()
    // const [searchParams, setSearchParams] = useSearchParams();
    //
    // setSearchParams(prev => {
    //     prev.set('page', `1`)
    //     return prev
    // })
    //
    // setSearchParams(prev => {
    //     prev.set('order', `id`)
    //     return prev
    // })
    // console.log(searchParams.get("order"))

    return (
        <div>
            <Orders/>
        </div>
    );
};

export {OrderPage};
