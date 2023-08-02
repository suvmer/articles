import { FC, useState, useMemo } from 'react';
import { Post, PostFormValue } from '../../types/post';
import { useNavigate } from 'react-router';
import { CommentList } from '../Lists/CommentList';
import Icon from '@mdi/react';
import { mdiCheck, mdiComment, mdiCommentMultipleOutline, mdiPencil, mdiPostOutline } from '@mdi/js';
import { IconButton } from '../UI/IconButton';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { deletePost, editPost } from '../../store/action-creators/post';
import { PostForm } from '../Forms/PostForm';
import { CommentForm } from '../Forms/CommentForm';
import { toDMY } from '../../utils';
import styles from "./Card.module.css";

interface PostProps {
    post: Post,
    expanded?: boolean,
    showCommentsForm?: boolean,
    showTitle?: boolean,
    className?: string
}
export const PostCard:FC<PostProps> = ({post, expanded = false, showCommentsForm = true, showTitle = true, className = ''} : PostProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isEditing, setEditing] = useState<boolean>(false);
    const [editedPost, setEditedPost] = useState<Post>(post);

    const showComments = (expanded && showCommentsForm);
    const disableLink = isEditing || showComments;

    const updatePost = (value:PostFormValue) => {
        const newPost = {...editedPost, ...value};
        setEditedPost(newPost);
        dispatch(editPost(newPost));
    }
    const MemoCommentForm = useMemo(() => <CommentForm className='mt-4' post_id={post.id}/>, []);

    const getTimeCreated = () => toDMY(post.createdAt);
    const getTimeEdited = () => post.createdAt != post.updatedAt ? ` (Изменён: ${toDMY(post.updatedAt)})` : ``;

    return <div className={styles.cardWrapper + ' ' +className}>
        <div onClick={() => !disableLink && navigate(`/post/${editedPost.id}`)} className={styles.card + ' ' + (!disableLink ? styles.card_link : '')}>
            <div className={styles.card__row}>
                {!isEditing && <Icon className='pr-4' path={mdiPostOutline} size={1.3}/>}
                {!isEditing && <p className={expanded ? styles.card_expanded : ''}>{editedPost.title}</p>}
                {isEditing && <PostForm defaultValue={editedPost} onClose={updatePost} editing/>}
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
                        onClick={() => {
                            dispatch(deletePost(editedPost))
                            if(expanded && showCommentsForm)
                                navigate(-1);
                        }}
                    />
                </div>
            </div>
            <p className={styles.card__body}>{editedPost.body}</p>
            <div className={styles.card__row + ' ' + styles.card__row_gap}>
                <div className={styles.card__subrow}>
                    <Icon
                        path={mdiCommentMultipleOutline}
                        size={1.0}
                    />
                    <p className={'text ' + styles.card_thin}>{post.comments.length}</p>
                </div>
                <div className={styles.card__subrow}>
                    <p className='text text_secondary text_small'>{getTimeCreated()}</p>
                    <p className='text text_secondary text_small'>{getTimeEdited()}</p>
                </div>
            </div>
        </div>
        {showComments ? MemoCommentForm : ""}
        {expanded ? <CommentList className='mt-4' showTitle={expanded && showTitle} comments={post.comments} /> : ""}
    </div>
}