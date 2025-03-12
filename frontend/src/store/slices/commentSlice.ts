import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {commentService} from "../../services/commentService.ts";

interface IState {
    trigger: boolean
}

const initialState: IState = {
    trigger: false
}

const postComment = createAsyncThunk<void, { dto : { body: string }, id: string  }>(
    "commentSlice/postComment",
    async ({dto, id}, thunkAPI) => {
        try {
            await commentService.postComment(dto, id)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const commentSlice = createSlice({
    name: "commentSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addMatcher(isFulfilled(postComment), state =>{
            state.trigger = !state.trigger
        })

})

const {reducer: commentReducer, actions} = commentSlice

const commentActions = {
    ...actions,
    postComment
}

export {
    commentReducer,
    commentActions
}