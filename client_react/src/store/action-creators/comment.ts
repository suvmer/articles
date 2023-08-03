import { Dispatch } from "redux"
import { AnalyticPageParams, Comment, CommentAction, CommentActionTypes, CommentFormValue } from "../../types/comment"
import axios from "axios";
import { PostActionTypes } from "../../types/post";

export const fetchComments = (dates: AnalyticPageParams) => {
    return async (dispatch: Dispatch<CommentAction>) => {
        try {
            dispatch({type: CommentActionTypes.FETCH_DATA});
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+"/analytic/comments", {params: {...dates}});
            dispatch({type: CommentActionTypes.FETCH_COMMENTS_RESOLVE, payload: response.data.comments});
        } catch(e:any) {
            if(e.response?.data?.message)
                dispatch({type: CommentActionTypes.FETCH_ERROR, payload: e.response.data.message});
        }
    }
}
export const fetchPostComments = (post_id:number) => {
    return async (dispatch: Dispatch<CommentAction>) => {
        try {
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+`/article/${post_id}/comments`);
            dispatch({type: PostActionTypes.FETCH_POST_COMMENTS_RESOLVE, payload: {post_id, comments: response.data.comments}});
        } catch(e:any) {
            if(e.response?.data?.message)
                dispatch({type: CommentActionTypes.FETCH_ERROR, payload: e.response.data.message});
        }
    }
}
export const addComment = (comment:CommentFormValue) => {
    return async (dispatch:any) => {
        try {
            dispatch({type: CommentActionTypes.FETCH_DATA});
            const response = await axios.post(process.env.REACT_APP_SERVER_URL+`/article/${comment.post_id}/comment`, {...comment});
            dispatch({type: CommentActionTypes.ADD_COMMENT, payload: response.data.comment});
            dispatch({type: PostActionTypes.APPEND_COMMENT, payload: response.data.comment}); //instally update comments
            dispatch(fetchPostComments(comment.post_id)); //update list later(new comments from other users may be added)
        } catch(e:any) {
            if(e.response?.data?.message)
                dispatch({type: CommentActionTypes.FETCH_ERROR, payload: e.response.data.message});
        }
    }
}
export const editComment = (comment:Comment) => {
    return async (dispatch: Dispatch<CommentAction>) => {
        try {
            dispatch({type: CommentActionTypes.FETCH_DATA});
            await axios.patch(process.env.REACT_APP_SERVER_URL+`/article/${comment.post_id}/comment/${comment.id}`, {...comment});
            dispatch({type: CommentActionTypes.EDIT_COMMENT, payload: comment});
        } catch(e:any) {
            if(e.response?.data?.message)
                dispatch({type: CommentActionTypes.FETCH_ERROR, payload: e.response.data.message});
        }
    }
}
export const deleteComment = (comment:Comment) => {
    return async (dispatch:any) => {
        try {
            dispatch({type: CommentActionTypes.FETCH_DATA});
            await axios.delete(process.env.REACT_APP_SERVER_URL+`/article/${comment.post_id}/comment/${comment.id}`);
            dispatch({type: CommentActionTypes.DELETE_COMMENT, payload: comment});
            dispatch({type: PostActionTypes.REMOVE_COMMENT, payload: comment});
            dispatch(fetchPostComments(comment.post_id)); //update list later(new comments from other users may be added)
        } catch(e:any) {
            if(e.response?.data?.message)
                dispatch({type: CommentActionTypes.FETCH_ERROR, payload: e.response.data.message});
        }
    }
}