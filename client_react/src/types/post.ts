export interface Post {
    id: number,
    title: string,
    body: string,
    updatedAt: number,
    createdAt: number
}
export interface PostState {
    posts: Post[],
    postToShow: Post | null,
    loading: boolean
}
export interface FETCH_DATA {
    type: string
}
export interface FetchPostsResolveAction {
    type: string,
    payload: Post[];
}
export interface PostFetchResolveAction {
    type: string,
    payload: Post;
}
export type PostAction = FETCH_DATA|FetchPostsResolveAction|PostFetchResolveAction;

export enum PostActionTypes {
    FETCH_DATA = 'FETCH_DATA',
    FETCH_POSTS_RESOLVE = 'FETCH_POSTS_RESOLVE',
    FETCH_POST_RESOLVE = 'FETCH_POST_RESOLVE',
}

export type PostPageParams = {
    id: string
}