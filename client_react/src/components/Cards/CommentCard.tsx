import { FC, useState, useMemo } from 'react';
import { Comment, CommentFormValue } from '../../types/comment';
import Icon from '@mdi/react';
import { mdiCheck, mdiPencil, mdiCommentOutline, mdiAccountCircle } from '@mdi/js';
import { IconButton } from '../UI/IconButtons/IconButton';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deleteComment, editComment } from '../../store/action-creators/comment';
import { CommentForm } from '../Forms/CommentForm';
import { toDMY } from '../../utils';
import styles from "./Card.module.css";


interface CommentProps {
    comment: Comment,
    className?: string
}
export const CommentCard:FC<CommentProps> = ({comment, className=''} : CommentProps) => {
    const dispatch = useAppDispatch();
    const [isEditing, setEditing] = useState<boolean>(false);
    const [editedComment, setEditedComment] = useState<Comment>(comment);

    const updateComment = (value:CommentFormValue) => {
        const newComment:Comment = {...editedComment, ...value, updatedAt: Date.now()};
        setEditedComment(newComment);
        dispatch(editComment(newComment));
    }
    const getTimeCreated = () => toDMY(editedComment.createdAt);
    const getTimeEdited = () => editedComment.createdAt != editedComment.updatedAt ? ` (Изменён: ${toDMY(editedComment.updatedAt)})` : ``;
    
    return <div className={styles.cardWrapper +' '+className}>
        <div className={styles.card}>
            <div className={styles.card__row}>
                {!isEditing && <Icon className='pr-4' path={mdiAccountCircle} size={1.3}/>}
                {!isEditing && <p className={styles.card_expanded + ' ' + styles.card_thin}>{editedComment.body}</p>}
                {isEditing && <CommentForm className={styles.card_thin} post_id={comment.post_id} defaultValue={editedComment} onClose={updateComment} editing/>}      
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
            <div className={styles.card__row + ' ' + styles.card__row_gap}>
                <div className={styles.card__subrow}>
                    <p className='text text_secondary text_small'>{getTimeCreated()}</p>
                    <p className='text text_secondary text_small'>{getTimeEdited()}</p>
                </div>
            </div>
        </div>
    </div>
}