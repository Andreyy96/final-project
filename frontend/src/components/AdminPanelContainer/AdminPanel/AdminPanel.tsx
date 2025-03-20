import {OrderStatistic} from "../OrderStatistic/OrderStatistic.tsx";
import {ButtonCreateManager} from "../ButtonCreateManager/ButtonCreateManager.tsx";
import css from "./AdminPanel.module.css"
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {orderActions} from "../../../store/slices/orderSlice.ts";
import {userActions} from "../../../store/slices/userSlice.ts";
import {Managers} from "../Managers/Managers.tsx";


const AdminPanel = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(orderActions.getStatusStatistic())
        dispatch(userActions.getAllManagers())
    }, [dispatch]);

    return (
        <div className={css.admin_panel}>
            <OrderStatistic/>
            <ButtonCreateManager/>
            <Managers/>
        </div>
    );
};

export {AdminPanel};
