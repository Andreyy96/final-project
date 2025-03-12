import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {groupService} from "../../services/groupService.ts";
import {IGroup} from "../../interfaces/group.interface.ts";

interface IState {
    groups: IGroup[]
    groupTrigger: boolean
}

const initialState: IState = {
    groups: [],
    groupTrigger: false
}

const getAll = createAsyncThunk<IGroup[], void>(
    "groupSlice/getAll",
    async (_, thunkAPI) => {
        try {
            const {data} = await groupService.getAll()
            return data
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const createGroup = createAsyncThunk<void, {name: string}>(
    "groupSlice/createGroup",
    async ({name}, thunkAPI) => {
        try {
            await groupService.createGroup({name})
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const groupSlice = createSlice({
    name: "groupSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.groups = action.payload
        })
        .addMatcher(isFulfilled(createGroup), state =>{
            state.groupTrigger = !state.groupTrigger
        })

})

const {reducer: groupReducer, actions} = groupSlice

const groupActions = {
    ...actions,
    getAll,
    createGroup
}

export {
    groupReducer,
    groupActions
}