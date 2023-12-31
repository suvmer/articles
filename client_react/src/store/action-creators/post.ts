import { Dispatch } from "redux"
import { Post, PostAction, PostActionTypes, PostFormValue } from "../../types/post"
import axios from "axios";

export const fetchPosts = () => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_DATA});
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+"/articles");
            dispatch({type: PostActionTypes.FETCH_POSTS_RESOLVE, payload: response.data.posts});
        } catch(e:any) {
            if(e.response?.data?.message)
                dispatch({type: PostActionTypes.FETCH_ERROR, payload: e.response.data.message});
        }
    }
}
export const fetchPost = (id:number) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_DATA});
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+`/article/${id}`);
            dispatch({type: PostActionTypes.FETCH_POST_RESOLVE, payload: response.data.post});
        } catch(e:any) {
            if(e.response?.data?.message)
                dispatch({type: PostActionTypes.FETCH_ERROR, payload: e.response.data.message});
        }
    }
}
export const addPost = (post:PostFormValue) => {
    return async (dispatch: any) => {
        try {
            dispatch({type: PostActionTypes.FETCH_DATA});
            const response = await axios.post(process.env.REACT_APP_SERVER_URL+`/article`, {...post});
            dispatch({type: PostActionTypes.ADD_POST, payload: response.data.post});
            dispatch(fetchPosts());
        } catch(e:any) {
            if(e.response?.data?.message)
                dispatch({type: PostActionTypes.FETCH_ERROR, payload: e.response.data.message});
        }
    }
}
export const editPost = (post:Post) => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_DATA});
            await axios.patch(process.env.REACT_APP_SERVER_URL+`/article/${post.id}`, {...post});
            dispatch({type: PostActionTypes.EDIT_POST, payload: post});
        } catch(e:any) {
            if(e.response?.data?.message)
                dispatch({type: PostActionTypes.FETCH_ERROR, payload: e.response.data.message});
        }
    }
}
export const deletePost = (post:Post) => {
    return async (dispatch:any) => {
        try {
            dispatch({type: PostActionTypes.FETCH_DATA});
            await axios.delete(process.env.REACT_APP_SERVER_URL+`/article/${post.id}`);
            dispatch({type: PostActionTypes.DELETE_POST, payload: post});
            dispatch(fetchPosts());
        } catch(e:any) {
            if(e.response?.data?.message)
                dispatch({type: PostActionTypes.FETCH_ERROR, payload: e.response.data.message});
        }
    }
}