import { FC, useState, useMemo } from 'react';
import { Comment, CommentFormValue } from '../../types/comment';
import Icon from '@mdi/react';
import { mdiCheck, mdiPencil, mdiCommentOutline, mdiAccountCircle } from '@mdi/js';
import { IconButton } from '../UI/IconButton';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteComment, editComment } from '../../store/action-creators/comment';
import { CommentForm } from '../CommentForm/CommentForm';
import { toDMY } from '../../utils';

interface CommentProps {
    comment: Comment,
    className?: string
}
export const CommentCard:FC<CommentProps> = ({comment, className=''} : CommentProps) => {
    const dispatch = useAppDispatch();
    const [isEditing, setEditing] = useState<boolean>(false);
    const [editedComment, setEditedComment] = useState<Comment>(comment);

    const updateComment = (value:CommentFormValue) => {
        const newComment = {...editedComment, ...value};
        setEditedComment(newComment);
        dispatch(editComment(newComment));
    }
    const getTimeCreated = () => toDMY(comment.createdAt);
    const getTimeEdited = () => comment.createdAt != comment.updatedAt ? ` (Изменён: ${toDMY(comment.updatedAt)})` : ``;
    
    return <div className={'cardWrapper'+className}>
        <div className='card'>
            <div className='card__row'>
                {!isEditing && <Icon className='pr-4' path={mdiAccountCircle} size={1.3}/>}
                {!isEditing && <p className='card_expanded card_thin'>{editedComment.body}</p>}
                {isEditing && <CommentForm className='card_thin' post_id={comment.post_id} defaultValue={editedComment} onClose={updateComment} editing/>}      
                <div>
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
            <div className='card__row card__row_gap'>
                <div className='card__subrow'>
                    <p className='text text_secondary text_small'>{getTimeCreated()}</p>
                    <p className='text text_secondary text_small'>{getTimeEdited()}</p>
                </div>
            </div>
        </div>
    </div>
}