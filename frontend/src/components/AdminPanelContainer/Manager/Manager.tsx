import {FC} from 'react';
import {IManagerWithStatistic} from "../../../interfaces/user.interface.ts";
import css from "./Manager.module.css"

interface IProps {
    manager: IManagerWithStatistic
}

const Manager: FC<IProps> = ({manager}) => {
    return (
        <div className={css.manager_main_div}>
            <div className={css.user_info_div}>
                <p>Id: {manager.user.id}</p>
                <p>Name: {manager.user.name}</p>
                <p>Surname: {manager.user.surname}</p>
                <p>Email: {manager.user.email}</p>
                <p>Last login: {manager.user.last_login}</p>
                <p>Banned: {!manager.user.is_banned ? "false" : "true"}</p>
                <p>Is active: {!manager.user.is_active ? "false" : "true"}</p>
            </div>
            <div className={css.statistic_div}>
                <p>Total: {manager.orders.total}</p>
                <p>In work: {manager.orders.in_work}</p>
                <p>Agree: {manager.orders.agree}</p>
                <p>Disagree: {manager.orders.disagree}</p>
                <p>Dubbing:{manager.orders.dubbing}</p>
            </div>
            <div className={css.buttons_div}>
                {
                    !manager.user.is_active ?
                        <button>ACTIVATE</button>
                        :
                        <button>RECOVERY PASSWORD</button>
                }
                <button>BAN</button>
                <button>UNBAN</button>
            </div>
        </div>
    );
};

export {Manager};