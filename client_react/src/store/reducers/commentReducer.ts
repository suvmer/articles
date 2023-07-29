import { AddCommentAction, CommentAction, CommentActionTypes, CommentState, DeleteCommentAction, EditCommentAction, FETCH_ERROR, FetchCommentsResolveAction } from "../../types/comment";

const initialState: CommentState = {
    comments: [],
    loading: false,
    error: ""
}

export const commentReducer = (state = initialState, action: CommentAction) : CommentState => {
    switch(action.type) {
        case CommentActionTypes.FETCH_DATA:
            return {...state, loading: true, error: ""};
        case CommentActionTypes.FETCH_ERROR:
            console.log((action as FETCH_ERROR).payload)
            return {...state, loading: false, error: (action as FETCH_ERROR).payload};
        case CommentActionTypes.FETCH_COMMENTS_RESOLVE:
            return {...state, loading: false, comments: (action as FetchCommentsResolveAction).payload};
        case CommentActionTypes.ADD_COMMENT:
            return {...state, loading: false, comments: [(action as AddCommentAction).payload, ...state.comments]};
        case CommentActionTypes.EDIT_COMMENT:
            const newComment = (action as EditCommentAction).payload;
            return {...state, loading: false, comments: state.comments.map(comment => {
                if(comment.id === newComment.id)
                    return newComment;
                return comment;
            })};
        case CommentActionTypes.DELETE_COMMENT:
            return {...state, loading: false, comments: state.comments.filter(comment => comment.id !== (action as DeleteCommentAction).payload.id)};
        default:
            return state;        
    }
}