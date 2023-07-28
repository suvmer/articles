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

export interface FetchPostsAction {
    type: string
}
export interface FetchPostsResolveAction {
    type: string,
    payload: Post[];
}
export type PostAction = FetchPostsResolveAction|FetchPostsAction;

export enum PostActionTypes {
    FETCH_POSTS = 'FETCH_POSTS',
    FETCH_POSTS_RESOLVE = 'FETCH_POSTS_RESOLVE',
}