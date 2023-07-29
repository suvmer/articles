import { FC, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector"
import { fetchPost } from "../store/action-creators/post";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { PostPageParams } from "../types/post";
import { PostCard } from '../components/PostCard';

export const PostPage : FC = () => {
    const {loading, postToShow} = useTypedSelector(state => state.posts);
    const {id} = useParams<PostPageParams>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPost(Number(id)));
    }, []);
    const post = loading ? "Загрузка" : postToShow ? <PostCard expanded post={postToShow}/> : "Пост не найден";
    return <div>{post}</div>
}