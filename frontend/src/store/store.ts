import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/authSlice.ts";
import {orderReducer} from "./slices/orderSlice.ts";

const store = configureStore({
    reducer: {
        auth: authReducer,
        order: orderReducer,
    }
})
export {
    store
}