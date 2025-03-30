import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {IManagerRes, IManagerWithStatistic} from "../../interfaces/user.interface.ts";
import {userService} from "../../services/userService.ts";

interface IState {
    managers: IManagerWithStatistic[]
    userTrigger: boolean
    createError: string
}

const initialState: IState = {
    managers: [],
    userTrigger: false,
    createError: null
}

const getAllManagers = createAsyncThunk<IManagerRes>(
    "userSlice/getAllManagers",
    async (_, thunkAPI) => {
        try {
            const {data} = await userService.getAllManagers()
            return data
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const bannedById = createAsyncThunk<void, {userId: string}>(
    "userSlice/bannedById",
    async ({userId}, thunkAPI) => {
        try {
            await userService.bannedById(userId)

        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


const unbannedById = createAsyncThunk<void, {userId: string}>(
    "userSlice/unbannedById",
    async ({userId}, thunkAPI) => {
        try {
            await userService.unbannedById(userId)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAllManagers.fulfilled, (state, action) => {
            state.managers = action.payload.data
        })
        .addMatcher(isFulfilled(bannedById, unbannedById), state =>{
            state.userTrigger = !state.userTrigger
        })
})

const {reducer: userReducer, actions} = userSlice

const userActions = {
    ...actions,
    getAllManagers,
    bannedById,
    unbannedById
}

export {
    userReducer,
    userActions
}