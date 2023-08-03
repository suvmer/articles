import { Action } from "redux"
import { Post } from "./post"
import { PayloadAction } from "./UI"

export interface Comment {
    id: number,
    post_id: number,
    Post: Post,
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
export interface FETCH_DATA extends Action<string> {}
export interface FETCH_ERROR extends PayloadAction<string, string> {}
export interface FetchCommentsResolveAction extends PayloadAction<string, Comment[]> {}
export interface CommentFetchResolveAction extends PayloadAction<string, Comment> {}
export interface AddCommentAction extends PayloadAction<string, Comment> {}
export interface EditCommentAction extends PayloadAction<string, Comment> {}
export interface DeleteCommentAction extends PayloadAction<string, Comment> {}

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
export type AnalyticPageParams = {
    dateFrom: string,
    dateTo: string
}
export interface CommentListProps {
    comments: Comment[],
    showTitle?: boolean,
    groupped?: boolean,
    className?: string
}
export interface CommentFormProps {
    onClose?: (arg0:CommentFormValue) => void,
    defaultValue?: CommentFormValue,
    editing?: boolean,
    post_id?: number,
    className?: string
}

export interface CommentProps {
    comment: Comment,
    className?: string
}