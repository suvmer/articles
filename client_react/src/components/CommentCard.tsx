import { FC } from 'react'
import { Comment } from '../types/comment'
interface CommentProps {
    comment: Comment
}
export const CommentCard: FC<CommentProps> = ({comment}:CommentProps) => {
    return <div className='card'>
        <p className='card__body'>{comment.body}</p>
    </div>
}