import {FC} from 'react';
import {IManagerWithStatistic} from "../../../interfaces/user.interface.ts";
import css from "./Manager.module.css"
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";
import {userActions} from "../../../store/slices/userSlice.ts";
import {authActions} from "../../../store/slices/authSlice.ts";
import {UserRoleEnum} from "../../../enums/user-role.enum.ts";

interface IProps {
    manager: IManagerWithStatistic
}

const Manager: FC<IProps> = ({manager: {user, orders}}) => {
    const dispatch = useAppDispatch()

    const banUser = () => {
        dispatch(userActions.bannedById({userId: user._id}))
    }

    const unbanUser = () => {
        dispatch(userActions.unbannedById({userId: user._id}))
    }

    const sendEmailForActivate = () => {
        dispatch(authActions.sendEmailForActivate({userId: user._id}))
    }

    const sendEmailForRecoveryPassword = () => {
        dispatch(authActions.sendEmailForRecoveryPassword({email: user.email}))
    }



    return (
        <div className={css.manager_main_div}>
            <div className={css.user_info_div}>
                <p>Id: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Surname: {user.surname}</p>
                <p>Email: {user.email}</p>
                <p>Last login: {user.last_login}</p>
                <p>Banned: {!user.is_banned ? "false" : "true"}</p>
                <p>Is active: {!user.is_active ? "false" : "true"}</p>
            </div>
            <div className={css.statistic_div}>
                <p>Total: {orders.total}</p>
                <p>In work: {orders.in_work}</p>
                <p>Agree: {orders.agree}</p>
                <p>Disagree: {orders.disagree}</p>
                <p>Dubbing:{orders.dubbing}</p>
            </div>
            <div className={css.buttons_div}>
                {
                    !user.is_active ?
                        <button onClick={sendEmailForActivate}>ACTIVATE</button>
                        :
                        <button onClick={sendEmailForRecoveryPassword}>RECOVERY PASSWORD</button>
                }
                {(user.is_banned && user.role !== UserRoleEnum.ADMIN) && <button onClick={unbanUser}>UNBAN</button>}
                {(!user.is_banned && user.role !== UserRoleEnum.ADMIN)  &&<button onClick={banUser}>BAN</button>}
            </div>
        </div>
    );
};

export {Manager};