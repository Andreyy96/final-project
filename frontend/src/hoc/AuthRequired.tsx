import {FC, PropsWithChildren} from 'react';

import {Navigate} from "react-router-dom";
import {authService} from "../services/authService.ts";

interface IProps extends PropsWithChildren {}

const AuthRequired:FC<IProps> = ({children}) => {

    const accessToken = authService.getAccessToken()

    if (!accessToken) {
        return <Navigate to={"/login"}/>
    }

    return (
        <>
            {children}
        </>
    );
};

export {AuthRequired};