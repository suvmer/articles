import { FC, useState } from 'react';
import { Post } from '../types/post';
import { useNavigate } from 'react-router';
import { CommentList } from './CommentList';
import Icon from '@mdi/react';
import { mdiPencil } from '@mdi/js';
import { DeleteButton } from './UI/DeleteButton';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { deletePost } from '../store/action-creators/post';

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
    const showComments = (expanded && showCommentsForm);
    const disableLink = isEditing || showComments;
    return <div className={`card__wrapper ${props.className ?? ''}`}>
        <div onClick={() => !disableLink && navigate(`/post/${post.id}`)} className={`card${!disableLink ? ' card_link' : ''}`}>
            <div className='card__container'>
                <p className='card__title'>{post.title}</p>
                <p className='card__body mt-4'>{post.body}</p>
            </div>
            <div className='card__append'>
                <Icon path={mdiPencil} size={1}/>
                <DeleteButton
                    onClick={() => {
                        dispatch(deletePost(post))
                        if(expanded && showCommentsForm)
                            navigate(-1);
                    }}
                />
            </div>
        </div>
        {expanded ? <CommentList showTitle={expanded && showTitle} comments={post.comments} /> : ""}
    </div>
}