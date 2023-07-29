import { FC } from 'react';
import { Comment } from '../types/comment';
import { CommentCard } from './CommentCard';
interface CommentListProps {
    comments: Comment[],
    showTitle?: boolean,
    groupped?: boolean
}
export const CommentList:FC<CommentListProps> = ({comments, showTitle = false, groupped = false}: CommentListProps) => {
    return <div className='list'>
        {showTitle ? <div className='list__title'>Комментарии</div>: ''}
        {comments.map(comment => <CommentCard key={comment.id} comment={comment}/>)}
    </div>
}