import { FC } from 'react';
import { PostListProps } from '../../types/post';
import { PostCard } from '../Cards/PostCard';
import styles from "./List.module.css";

export const PostList:FC<PostListProps> = ({posts, expanded=false, className=''}: PostListProps) => {
    return <div className={['list', expanded ? styles.list_large:'', className].join(' ')}>
        {posts.map(post => <PostCard expanded={expanded} showCommentsForm={false} key={post.id} post={post} className='mt-2'/>)}
    </div>;
}