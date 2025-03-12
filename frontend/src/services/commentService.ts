import {urls} from "../constants/urls.ts";
import {apiService} from "./apiService.ts";
import {IRes} from "../types/responeType.ts";

const commentService = {
    postComment: (dto: {body: string}, id: string):IRes<void> => apiService.post(urls.comment.postComment(id), dto),
}

export {
    commentService
}