// import {useEffect} from "react";
// import {useAppDispatch} from "../hooks/useAppDispatch.ts";
// import {orderActions} from "../store/slices/orderSlice.ts";
import {AdminPanel} from "../components/AdminPanelContainer/AdminPanel/AdminPanel.tsx";

const AdminPanelPage = () => {
    
    // const dispatch = useAppDispatch()
    //
    // useEffect(() => {
    //     dispatch(orderActions.getStatusStatistic())
    // }, [dispatch]);

    return (
        <div>
            <AdminPanel/>
        </div>
    );
};

export {AdminPanelPage};
