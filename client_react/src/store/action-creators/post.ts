import { Dispatch } from "redux"
import { PostAction, PostActionTypes } from "../../types/post"
import axios from "axios";

export const fetchPosts = () => {
    return async (dispatch: Dispatch<PostAction>) => {
        try {
            dispatch({type: PostActionTypes.FETCH_POSTS});
            const response = await axios.get(process.env.REACT_APP_SERVER_URL+"/articles");
            dispatch({type: PostActionTypes.FETCH_POSTS_RESOLVE, payload: response.data.posts});
        } catch {
            dispatch({type: PostActionTypes.FETCH_POSTS_RESOLVE});
        }
    }
}