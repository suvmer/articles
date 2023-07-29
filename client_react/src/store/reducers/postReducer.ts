import { AddPostAction, AppendCommentAction, DeletePostAction, EditPostAction, FETCH_ERROR, FetchPostsResolveAction, PostAction, PostActionTypes, PostFetchResolveAction, PostState } from "../../types/post";

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
            console.log((action as PostFetchResolveAction).payload);
            return {...state, loading: false, postToShow: (action as PostFetchResolveAction).payload};
        case PostActionTypes.ADD_POST:
            return {...state, loading: false, posts: [(action as AddPostAction).payload, ...state.posts]};
        case PostActionTypes.EDIT_POST:
            const newPost = (action as EditPostAction).payload;
            return {...state, loading: false, posts: state.posts.map(post => {
                if(post.id === newPost.id)
                    return newPost;
                return post;
            })};
        case PostActionTypes.DELETE_POST:
            return {...state, loading: false, posts: state.posts.filter(post => post.id !== (action as DeletePostAction).payload.id)};
        case PostActionTypes.APPEND_COMMENT:
            const newComment = (action as AppendCommentAction).payload;
            if(!state.postToShow)
                return {...state};
            return {...state, loading: false, postToShow: {...state.postToShow, comments: [newComment, ...state.postToShow.comments]}};
        case PostActionTypes.REMOVE_COMMENT:
            const deleteComment = (action as AppendCommentAction).payload;
            if(!state.postToShow)
                return {...state};
            return {...state, loading: false, postToShow: {...state.postToShow, comments: state.postToShow.comments.filter(comment => comment.id != deleteComment.id)}};
        default:
            return state;        
    }
}