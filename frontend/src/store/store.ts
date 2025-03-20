import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/authSlice.ts";
import {orderReducer} from "./slices/orderSlice.ts";
import {commentReducer} from "./slices/commentSlice.ts";
import {groupReducer} from "./slices/groupSlice.ts";
import {userReducer} from "./slices/userSlice.ts";

const store = configureStore({
    reducer: {
        auth: authReducer,
        order: orderReducer,
        comment: commentReducer,
        group: groupReducer,
        user: userReducer,
    }
})
export {
    store
}