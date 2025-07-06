import {FC, PropsWithChildren} from 'react';

import {Navigate} from "react-router-dom";
import {authService} from "../services/authService.ts";
import {useAppSelector} from "../hooks/useAppSelector.ts";

interface IProps extends PropsWithChildren {}

const AuthRequired:FC<IProps> = ({children}) => {

    const accessToken = authService.getAccessToken()
    const {currentUser} = useAppSelector(state => state.auth)

    if (!accessToken && !currentUser) {
        return <Navigate to={"/login?sessionExpiration=true"}/>
    }

    if (currentUser && currentUser.is_banned) {
        authService.deleteTokens()
        return <Navigate to={"/login"}/>
    }

    return (
        <>
            {children}
        </>
    );
};

export {AuthRequired};