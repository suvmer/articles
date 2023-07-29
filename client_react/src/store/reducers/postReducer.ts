import { FetchPostsResolveAction, PostAction, PostActionTypes, PostFetchResolveAction, PostState } from "../../types/post";

const initialState: PostState = {
    posts: [],
    postToShow: null,
    loading: false
}

export const postReducer = (state = initialState, action: PostAction) : PostState => {
    switch(action.type) {
        case PostActionTypes.FETCH_DATA:
            return {...state, loading: true};
        case PostActionTypes.FETCH_POSTS_RESOLVE:
            return {...state, loading: false, posts: (action as FetchPostsResolveAction).payload};
            case PostActionTypes.FETCH_POST_RESOLVE:
                return {...state, loading: false, postToShow: (action as PostFetchResolveAction).payload};
        default:
            return state;        
    }
}