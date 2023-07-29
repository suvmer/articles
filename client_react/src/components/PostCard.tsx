import { FC, useState } from 'react';
import { Post } from '../types/post';
import { useNavigate } from 'react-router';
import { CommentList } from './CommentList';
interface PostProps {
    post: Post,
    expanded?: boolean,
    showCommentsForm?: boolean,
    showTitle?: boolean,
    className?: string
}
export const PostCard:FC<PostProps> = ({post, expanded = false, showCommentsForm = true, showTitle = true, ...props} : PostProps) => {
    const navigate = useNavigate();
    const [isEditing, setEditing] = useState<boolean>(false);
    const showComments = (expanded && showCommentsForm);
    const disableLink = isEditing || showComments;
    return <div className={`card__wrapper ${props.className ?? ''}`}>
        <div onClick={() => !disableLink && navigate(`/post/${post.id}`)} className={`card ${!disableLink ? 'card_link' : ''}`}>
            <p className='card__title'>{post.title}</p>
            <p className='card__body'>{post.body}</p>
        </div>
        {expanded ? <CommentList showTitle={expanded && showTitle} comments={post.comments} /> : ""}
    </div>
}