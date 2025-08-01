import {FC, PropsWithChildren} from 'react';

import {Navigate} from "react-router-dom";
import {useAppSelector} from "../hooks/useAppSelector.ts";
import {UserRoleEnum} from "../enums/user-role.enum.ts";

interface IProps extends PropsWithChildren {}

const AdminAccess:FC<IProps> = ({children}) => {

    const {currentUser} = useAppSelector(state => state.auth)

    if (currentUser) {
        if (currentUser.role !== UserRoleEnum.ADMIN) {
            return <Navigate to={"/orders"}/>
        }
    }

    return (
        <>
            {children}
        </>
    );
};

export {AdminAccess};