import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {ICreateManager, IUser} from "../../interfaces/user.interface.ts";
import {authService} from "../../services/authService.ts";
import {IPassword} from "../../interfaces/password.interface.ts";

interface IState {
    loginError: string
    passwordError: string
    currentUser: IUser
    createUserTrigger: boolean
}

const initialState: IState = {
    loginError: null,
    passwordError: null,
    currentUser: null,
    createUserTrigger: null
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

const signUpManager = createAsyncThunk<void, { body: ICreateManager }>(
    "authSlice/signUpManager",
    async ({body}, thunkAPI) => {
        try {
             await authService.signUpManager(body)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const sendEmailForActivate = createAsyncThunk<void, { userId: string }>(
    "authSlice/sendEmailForActivate",
    async ({userId}, thunkAPI) => {
        try {
            await authService.sendEmailForActivate(userId)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const activateAccount = createAsyncThunk<void, { actionToken: string, body: IPassword }>(
    "authSlice/activateAccount",
    async ({actionToken, body}, thunkAPI) => {
        try {
            await authService.activateAccount(actionToken, body)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const sendEmailForRecoveryPassword = createAsyncThunk<void, { email: string }>(
    "authSlice/sendEmailForRecoveryPassword",
    async ({email}, thunkAPI) => {
        try {
            console.log(email)
            await authService.sendEmailForRecoveryPassword(email)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const recoveryPassword = createAsyncThunk<void, { actionToken: string, body: IPassword }>(
    "authSlice/recoveryPassword",
    async ({actionToken, body}, thunkAPI) => {
        try {
            await authService.recoveryPassword(actionToken, body)
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
        .addCase(login.rejected, (state, action) => {
            state.loginError = action.payload as string
        })
        .addCase(activateAccount.rejected, (state, action) => {
            state.passwordError = action.payload as string
        })
        .addCase(recoveryPassword.rejected, (state, action) => {
            state.passwordError = action.payload as string
        })
        .addCase(me.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
        .addMatcher(isFulfilled(login), state => {
            state.loginError = null
        })
        .addMatcher(isFulfilled(signUpManager), state => {
            state.createUserTrigger = !state.createUserTrigger
        })
        .addMatcher(isFulfilled(activateAccount, recoveryPassword), state => {
            state.passwordError = null
        })
})

const {reducer: authReducer, actions} = authSlice

const authActions = {
    ...actions,
    login,
    signUpManager,
    sendEmailForActivate,
    activateAccount,
    sendEmailForRecoveryPassword,
    recoveryPassword,
    me
}

export {
    authReducer,
    authActions
}