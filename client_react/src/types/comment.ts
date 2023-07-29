export interface Comment {
    id: number,
    post_id: number,
    body: string,
    updatedAt: number,
    createdAt: number
}
export interface CommentFormValue {
    body: string,
    post_id: number
}
export interface CommentState {
    comments: Comment[],
    loading: boolean,
    error: string
}
export interface FETCH_DATA {
    type: string
}
export interface FETCH_ERROR {
    type: string,
    payload: string
}
export interface FetchCommentsResolveAction {
    type: string,
    payload: Comment[];
}
export interface CommentFetchResolveAction {
    type: string,
    payload: Comment;
}
export interface AddCommentAction {
    type: string,
    payload: Comment;
}
export interface EditCommentAction {
    type: string,
    payload: Comment;
}
export interface DeleteCommentAction {
    type: string,
    payload: Comment;
}

export type CommentAction = FETCH_DATA|FETCH_ERROR|FetchCommentsResolveAction|CommentFetchResolveAction|AddCommentAction|EditCommentAction|DeleteCommentAction;

export enum CommentActionTypes {
    FETCH_DATA = 'FETCH_COMMENTS_DATA',
    FETCH_ERROR = 'FETCH_COMMENTS_ERROR',
    FETCH_COMMENTS_RESOLVE = 'FETCH_COMMENTS_RESOLVE',
    ADD_COMMENT = 'ADD_COMMENT',
    EDIT_COMMENT = 'EDIT_COMMENT',
    DELETE_COMMENT = 'DELETE_COMMENT'
}

export type CommentPageParams = {
    id: string
}