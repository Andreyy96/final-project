import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {IManagerRes, IManagerWithStatistic} from "../../interfaces/user.interface.ts";
import {userService} from "../../services/userService.ts";

interface IState {
    managers: IManagerWithStatistic[]
}

const initialState: IState = {
    managers: []
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


const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAllManagers.fulfilled, (state, action) => {
            state.managers = action.payload.data
        })
})

const {reducer: userReducer, actions} = userSlice

const userActions = {
    ...actions,
    getAllManagers,

}

export {
    userReducer,
    userActions
}