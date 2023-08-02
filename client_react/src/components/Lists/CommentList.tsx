import { FC } from 'react';
import { Comment } from '../../types/comment';
import { CommentCard } from '../Cards/CommentCard';
import styles from "./List.module.css";

interface CommentListProps {
    comments: Comment[],
    showTitle?: boolean,
    groupped?: boolean,
    className?: string
}
export const CommentList:FC<CommentListProps> = ({comments, showTitle = false, groupped = false, className=''}: CommentListProps) => {
    return <div className={styles.list+' '+className}>
        {showTitle ? <div className={styles.list__title}>Комментарии</div>: ''}
        {comments.map(comment => <CommentCard key={comment.id} comment={comment}/>)}
    </div>
}