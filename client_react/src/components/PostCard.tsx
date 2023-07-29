import { FC, useState, useMemo } from 'react';
import { Post, PostFormValue } from '../types/post';
import { useNavigate } from 'react-router';
import { CommentList } from './CommentList';
import Icon from '@mdi/react';
import { mdiCheck, mdiPencil, mdiPostOutline } from '@mdi/js';
import { IconButton } from './UI/IconButton';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { deletePost, editPost } from '../store/action-creators/post';
import { PostForm } from './PostForm';
import { CommentForm } from './CommentForm';

interface PostProps {
    post: Post,
    expanded?: boolean,
    showCommentsForm?: boolean,
    showTitle?: boolean,
    className?: string
}
export const PostCard:FC<PostProps> = ({post, expanded = false, showCommentsForm = true, showTitle = true, ...props} : PostProps) => {
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
    const MemoCommentForm = useMemo(() => <CommentForm post_id={post.id}/>, []);
    return <div className={`cardWrapper ${props.className ?? ''}`}>
        <div onClick={() => !disableLink && navigate(`/post/${editedPost.id}`)} className={`card${!disableLink ? ' card_link' : ''}`}>
            <div className='card__container'>
                {!isEditing ? <>
                <div className='card__title'>
                    <Icon className='pr-4' path={mdiPostOutline} size={1.3}/>
                    <p>{editedPost.title}</p>
                </div>
                <p className='card__body mt-4'>{editedPost.body}</p>
                </> : <PostForm defaultValue={editedPost} onClose={updatePost} editing/>}                
            </div>
            <div className='card__append'>
                {isEditing && 
                    <IconButton
                        onClick={() => {
                            setEditing(false)
                            //dispatch(editPost(post))
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
        {showCommentsForm ? MemoCommentForm : ""}
        {expanded ? <CommentList showTitle={expanded && showTitle} comments={post.comments} /> : ""}
    </div>
}