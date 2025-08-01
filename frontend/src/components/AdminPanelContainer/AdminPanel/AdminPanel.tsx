import {OrderStatistic} from "../OrderStatistic/OrderStatistic.tsx";
import css from "./AdminPanel.module.css"
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";
import {useEffect, useState} from "react";
import {orderActions} from "../../../store/slices/orderSlice.ts";
import {userActions} from "../../../store/slices/userSlice.ts";
import {Managers} from "../Managers/Managers.tsx";
import {useAppSelector} from "../../../hooks/useAppSelector.ts";
import {ModalWindow} from "../ModalWindow/ModalWindow.tsx";
import {useAppLocation} from "../../../hooks/useAppLocation.ts";
import {ManagerPagination} from "../ManagerPagination/ManagerPagination.tsx";
import {CircularProgress} from "@mui/material";
import {useAppContext} from "../../../hooks/useAppContext.ts";

const AdminPanel = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {search} = useAppLocation()
    const {userTrigger} = useAppSelector(state => state.user)
    const {createUserTrigger} = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()
    const [flag, setFlag] = useAppContext();

    useEffect(() => {
        const fetchData = async () => {
            if (flag) {
                setIsLoading(false)
            } else  {
                setIsLoading(true)
            }
            dispatch(orderActions.getStatusStatistic())
            const {meta: {requestStatus}} = await dispatch(userActions.getAllManagers({query: search}))
            if (requestStatus==='fulfilled'){
                setFlag(false)
                setIsLoading(false)
            }

        };

        fetchData();
    }, [dispatch, search, userTrigger, createUserTrigger]);

    return (
        <div className={css.admin_panel}>
            <OrderStatistic/>
            <ModalWindow/>
            {isLoading ?
                <div className={css.loader_div}><CircularProgress size={160}/></div>
                :
                <>
                    <Managers/>
                    <ManagerPagination/>
                </>
            }
        </div>
    );
};

export {AdminPanel};
