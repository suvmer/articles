import { FC } from 'react';
import { Comment } from '../types/comment';
import { CommentCard } from './CommentCard';
interface CommentListProps {
    comments: Comment[],
    showTitle?: boolean,
    groupped?: boolean,
    className?: string
}
export const CommentList:FC<CommentListProps> = ({comments, showTitle = false, groupped = false, className=''}: CommentListProps) => {
    return <div className={'list '+className}>
        {showTitle ? <div className='list__title'>Комментарии</div>: ''}
        {comments.map(comment => <CommentCard key={comment.id} comment={comment}/>)}
    </div>
}