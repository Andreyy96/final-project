import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {IOrder, IOrderPagination} from "../../interfaces/order.interface.ts";
import {orderService} from "../../services/orderService.ts";

interface IState {
    orders: IOrder[]
    total: number
    limit: number
    page: number
}

const initialState: IState = {
    orders: [],
    total: null,
    limit: null,
    page: null
}

const getAll = createAsyncThunk<IOrderPagination, {query: string}>(
    "orderSlice/getAll",
    async ({query}, thunkAPI) => {
        try {
            const {data} = await orderService.getAll(query)
            return data
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


const orderSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.orders = action.payload.data
            state.page = action.payload.page
            state.limit = action.payload.limit
            state.total = action.payload.total
        })
})

const {reducer: orderReducer, actions} = orderSlice

const orderActions = {
    ...actions,
    getAll
}

export {
    orderReducer,
    orderActions
}