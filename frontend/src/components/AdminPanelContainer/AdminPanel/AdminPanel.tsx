import {OrderStatistic} from "../OrderStatistic/OrderStatistic.tsx";
import css from "./AdminPanel.module.css"
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {orderActions} from "../../../store/slices/orderSlice.ts";
import {userActions} from "../../../store/slices/userSlice.ts";
import {Managers} from "../Managers/Managers.tsx";
import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {ModalWindow} from "../ModalWindow/ModalWindow.tsx";


const AdminPanel = () => {
    const {userTrigger} = useAppSelector(state => state.user)
    const {createUserTrigger} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(orderActions.getStatusStatistic())
        dispatch(userActions.getAllManagers())
    }, [dispatch, userTrigger, createUserTrigger]);

    return (
        <div className={css.admin_panel}>
            <OrderStatistic/>
            <ModalWindow/>
            <Managers/>
        </div>
    );
};

export {AdminPanel};
