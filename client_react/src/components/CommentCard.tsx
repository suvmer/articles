import { FC, useState, useMemo } from 'react';
import { Comment, CommentFormValue } from '../types/comment';
import Icon from '@mdi/react';
import { mdiCheck, mdiPencil, mdiCommentOutline, mdiAccountCircle } from '@mdi/js';
import { IconButton } from './UI/IconButton';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { deleteComment, editComment } from '../store/action-creators/comment';
import { CommentForm } from './CommentForm';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface CommentProps {
    comment: Comment,
    className?: string
}
export const CommentCard:FC<CommentProps> = ({comment, ...props} : CommentProps) => {
    const dispatch = useAppDispatch();
    const error = useTypedSelector(state => state.comments.error)
    const [isEditing, setEditing] = useState<boolean>(false);
    const [editedComment, setEditedComment] = useState<Comment>(comment);

    const updateComment = (value:CommentFormValue) => {
        const newComment = {...editedComment, ...value};
        setEditedComment(newComment);
        dispatch(editComment(newComment));
    }
    return <div className={`cardWrapper ${props.className ?? ''}`}>
        <div className='card'>
            <div className='card__container'>
                {!isEditing ? <>
                <div className='card__title'>
                    <Icon className='pr-4' path={mdiAccountCircle} size={1.3}/>
                    <p className='card__body card_expanded'>{editedComment.body}</p>
                </div>
                </> : <CommentForm post_id={comment.post_id} defaultValue={editedComment} onClose={updateComment} editing/>}                
            </div>
            <div className='card__append'>
                {isEditing && 
                    <IconButton
                        onClick={() => {
                            setEditing(false)
                        }}
                        iconPath={mdiCheck}
                    />}
                {!isEditing && 
                    <IconButton
                        onClick={() => setEditing(true)}
                        iconPath={mdiPencil}
                    />}
                <IconButton
                    toDelete
                    className="ml-2"
                    onClick={() => {
                        dispatch(deleteComment(editedComment))
                    }}
                />
            </div>
        </div>
    </div>
}