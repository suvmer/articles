import { Comment } from "./comment";

export interface Post {
    id: number,
    title: string,
    body: string,
    comments: Comment[],
    updatedAt: number,
    createdAt: number
}
export interface PostFormValue {
    title: string,
    body: string
}
export interface PostState {
    posts: Post[],
    postToShow: Post | null,
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
export interface FetchPostsResolveAction {
    type: string,
    payload: Post[];
}
export interface PostFetchResolveAction {
    type: string,
    payload: Post;
}
export interface AddPostAction {
    type: string,
    payload: Post;
}
export interface EditPostAction {
    type: string,
    payload: Post;
}
export interface DeletePostAction {
    type: string,
    payload: Post;
}
export interface AppendCommentAction {
    type: string,
    payload: Comment;
}
export interface RemoveCommentAction {
    type: string,
    payload: Comment;
}

export type PostAction = FETCH_DATA|FETCH_ERROR|FetchPostsResolveAction|PostFetchResolveAction|AddPostAction|EditPostAction|DeletePostAction|AppendCommentAction|RemoveCommentAction;

export enum PostActionTypes {
    FETCH_DATA = 'FETCH_DATA',
    FETCH_ERROR = 'FETCH_ERROR',
    FETCH_POSTS_RESOLVE = 'FETCH_POSTS_RESOLVE',
    FETCH_POST_RESOLVE = 'FETCH_POST_RESOLVE',
    ADD_POST = 'ADD_POST',
    EDIT_POST = 'EDIT_POST',
    DELETE_POST = 'DELETE_POST',
    APPEND_COMMENT = 'APPEND_COMMENT',
    REMOVE_COMMENT = 'REMOVE_COMMENT'
}

export type PostPageParams = {
    id: string
}