import { FETCH_ERROR, FetchPostsResolveAction, PostAction, PostActionTypes, PostFetchResolveAction, PostState } from "../../types/post";

const initialState: PostState = {
    posts: [],
    postToShow: null,
    loading: false,
    error: ""
}

export const postReducer = (state = initialState, action: PostAction) : PostState => {
    switch(action.type) {
        case PostActionTypes.FETCH_DATA:
            return {...state, loading: true, error: ""};
        case PostActionTypes.FETCH_ERROR:
            return {...state, loading: false, error: (action as FETCH_ERROR).payload};
        case PostActionTypes.FETCH_POSTS_RESOLVE:
            return {...state, loading: false, posts: (action as FetchPostsResolveAction).payload};
            case PostActionTypes.FETCH_POST_RESOLVE:
                return {...state, loading: false, postToShow: (action as PostFetchResolveAction).payload};
        default:
            return state;        
    }
}