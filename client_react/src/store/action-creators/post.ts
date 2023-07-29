import { Dispatch } from "redux"
import { Post, PostAction, PostActionTypes, PostFormValue } from "../../types/post"
import axios from "axios";

export const fetchPosts = () => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_DATA});
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+"/articles");
            dispatch({type: PostActionTypes.FETCH_POSTS_RESOLVE, payload: response.data.posts});
        } catch {
            dispatch({type: PostActionTypes.FETCH_POSTS_RESOLVE});
        }
    }
}
export const fetchPost = (id:number) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_DATA});
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+`/article/${id}`);
            dispatch({type: PostActionTypes.FETCH_POST_RESOLVE, payload: response.data.post});
        } catch {
            dispatch({type: PostActionTypes.FETCH_POST_RESOLVE});
        }
    }
}
export const addPost = (post:PostFormValue) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_DATA});
            const response = await axios.post(process.env.REACT_APP_SERVER_URL+`/article`, {...post});
            dispatch({type: PostActionTypes.ADD_POST, payload: response.data.post});
        } catch(e:any) {
            console.log(typeof e)
            dispatch({type: PostActionTypes.FETCH_ERROR, error: e.response.data.message});
        }
    }
}
export const editPost = (post:Post) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_DATA});
            const response = await axios.patch(process.env.REACT_APP_SERVER_URL+`/article/${post.id}`, {...post});
            dispatch({type: PostActionTypes.EDIT_POST, payload: response.data.post});
        } catch(e:any) {
            console.log(typeof e)
            dispatch({type: PostActionTypes.FETCH_ERROR, error: e.response.data.message});
        }
    }
}
export const deletePost = (post:Post) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_DATA});
            await axios.delete(process.env.REACT_APP_SERVER_URL+`/article/${post.id}`);
            dispatch({type: PostActionTypes.DELETE_POST, payload: post});
        } catch(e:any) {
            console.log(typeof e)
            dispatch({type: PostActionTypes.FETCH_ERROR, error: e.response.data.message});
        }
    }
}