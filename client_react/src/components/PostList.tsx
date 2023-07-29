import { FC } from 'react';
import { Post } from '../types/post';
import { PostCard } from './PostCard';
interface PostListProps {
    posts: Post[]
}
export const PostList:FC<PostListProps> = ({posts}: PostListProps) => {
    return <div>{posts.map(post => <PostCard key={post.id} post={post} className='mt-2'/>)}</div>;
}