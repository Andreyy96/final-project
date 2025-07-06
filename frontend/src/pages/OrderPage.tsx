import {Orders} from "../components/OrdersContainer/Orders/Orders.tsx";
import {OrderFilter} from "../components/OrdersContainer/OrderFilter/OrderFilter.tsx";

const OrderPage = () => {

    return (
        <div>
            <OrderFilter/>
            <Orders/>
        </div>
    );
};

export {OrderPage};
