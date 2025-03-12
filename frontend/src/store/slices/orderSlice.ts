import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {IGeneralInfoOrder, IOrder, IOrderPagination, IUpdateDtoOrder} from "../../interfaces/order.interface.ts";
import {orderService} from "../../services/orderService.ts";

interface IState {
    orderTrigger: boolean
    orders: IOrder[]
    total: number
    limit: number
    page: number
    result: IGeneralInfoOrder[]
}

const initialState: IState = {
    orderTrigger: false,
    orders: [],
    total: null,
    limit: null,
    page: null,
    result: []
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

const updateById = createAsyncThunk<void, {id: string, dto: IUpdateDtoOrder}>(
    "orderSlice/updateById",
    async ({id, dto}, thunkAPI) => {
        try {
            await orderService.updateById(id, dto)
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
            state.result = action.payload.result
        })
        .addMatcher(isFulfilled(updateById), state =>{
            state.orderTrigger = !state.orderTrigger
        })
})

const {reducer: orderReducer, actions} = orderSlice

const orderActions = {
    ...actions,
    getAll,
    updateById
}

export {
    orderReducer,
    orderActions
}