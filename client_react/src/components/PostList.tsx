import { FC } from 'react';
import { Post } from '../types/post';
import { PostCard } from './PostCard';
interface PostListProps {
    posts: Post[],
    expanded?: boolean,
    className?: string
}
export const PostList:FC<PostListProps> = ({posts, expanded=false, className=''}: PostListProps) => {
    return <div className={'list ' + (expanded ? 'list_large ':'') + className}>
        {posts.map(post => <PostCard expanded={expanded} showCommentsForm={false} key={post.id} post={post} className='mt-2'/>)}
    </div>;
}