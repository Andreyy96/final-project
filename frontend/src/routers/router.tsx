import {MainLayout} from "../layouts/MainLayout.tsx";
import {createBrowserRouter, Navigate} from "react-router-dom";
import {PublicLayout} from "../layouts/PublicLayout.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {AuthLayout} from "../layouts/AuthLayout.tsx";
import {AuthRequired} from "../hoc/AuthRequired.tsx";
import {OrderPage} from "../pages/OrderPage.tsx";



export const routes = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, children:[
            {index:true, element:<Navigate to={"/login"}/>},
            {element: <PublicLayout/>, children: [
                    {path: "login", element: <LoginPage/>}
                ]},
            {element: <AuthRequired><AuthLayout/></AuthRequired>, children: [
                    {path: "orders", element: <OrderPage/>}
                ]}

        ]
    }
])