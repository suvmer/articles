import { Action } from "redux";
import { Comment } from "./comment";
import { PayloadAction } from "./UI";


export interface PostFormValue {
    title: string,
    body: string
}
export interface Post extends PostFormValue {
    id: number,
    comments: Comment[],
    updatedAt: number,
    createdAt: number
}
export interface PostState {
    posts: Post[],
    postToShow: Post | null,
    loading: boolean,
    error: string
}
export interface FETCH_DATA extends Action<string> {}
export interface FETCH_ERROR extends PayloadAction<string, string> {}
export interface FetchPostsResolveAction extends PayloadAction<string, Post[]>{}
export interface FetchPostCommentsResolveAction extends PayloadAction<string, {
    post_id: number,
    comments: Comment[]
}> {}
export interface PostFetchResolveAction extends PayloadAction<string, Post> {}
export interface AddPostAction extends PayloadAction<string, Post> {}
export interface EditPostAction extends PayloadAction<string, Post> {}
export interface DeletePostAction extends PayloadAction<string, Post>{}
export interface AppendCommentAction extends PayloadAction<string, Comment> {}
export interface RemoveCommentAction extends PayloadAction<string, Comment> {}

export type PostAction = FETCH_DATA|FETCH_ERROR|FetchPostsResolveAction|FetchPostCommentsResolveAction|PostFetchResolveAction|AddPostAction|EditPostAction|DeletePostAction|AppendCommentAction|RemoveCommentAction;

export enum PostActionTypes {
    FETCH_DATA = 'FETCH_DATA',
    FETCH_ERROR = 'FETCH_ERROR',
    FETCH_POSTS_RESOLVE = 'FETCH_POSTS_RESOLVE',
    FETCH_POST_COMMENTS_RESOLVE = 'FETCH_POST_COMMENTS_RESOLVE',
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
export interface PostListProps {
    posts: Post[],
    expanded?: boolean,
    className?: string
}
export interface PostFormProps {
    onClose?: (arg0:PostFormValue) => void,
    defaultValue?: PostFormValue,
    editing?: boolean
}
export interface PostProps {
    post: Post,
    expanded?: boolean,
    showCommentsForm?: boolean,
    showTitle?: boolean,
    className?: string
}