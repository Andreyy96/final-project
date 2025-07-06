import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/authSlice.ts";
import {orderReducer} from "./slices/orderSlice.ts";
import {commentReducer} from "./slices/commentSlice.ts";
import {groupReducer} from "./slices/groupSlice.ts";
import {userReducer} from "./slices/userSlice.ts";
import {loadingReducer} from "./slices/loadingSlice.ts";

const store = configureStore({
    reducer: {
        auth: authReducer,
        order: orderReducer,
        comment: commentReducer,
        group: groupReducer,
        user: userReducer,
        loading: loadingReducer,
    }
})
export {
    store
}