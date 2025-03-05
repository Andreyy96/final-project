import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {IUser} from "../../interfaces/user.interface.ts";
import {authService} from "../../services/authService.ts";

interface IState {
    loginError: string
    currentUser: IUser
}

const initialState: IState = {
    loginError: null,
    currentUser: null
}

const login = createAsyncThunk<IUser, { user : { email: string, password: string } }>(
    "authSlice/login",
    async ({user}, thunkAPI) => {
        try {
            return await authService.login(user)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const me = createAsyncThunk<IUser, void>(
    "authSlice/me",
    async (_, thunkAPI) => {
        try {
            const {data} = await authService.me()
            return data
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }

    }
)

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(login.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        .addCase(login.rejected, state => {
            state.loginError = "Wrong email or password"
        })
        .addCase(me.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        .addMatcher(isFulfilled(login), state => {
            state.loginError = null
        })
})

const {reducer: authReducer, actions} = authSlice

const authActions = {
    ...actions,
    login,
    me
}

export {
    authReducer,
    authActions
}