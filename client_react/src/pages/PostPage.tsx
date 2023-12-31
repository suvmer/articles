import { FC, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector"
import { fetchPost } from "../store/action-creators/post";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { PostPageParams } from "../types/post";
import { PostCard } from '../components/Cards/PostCard';
import { SimpleCard } from '../components/Cards/SimpleCard';

export const PostPage : FC = () => {
    const {loading, postToShow} = useTypedSelector(state => state.posts);    
    const {id} = useParams<PostPageParams>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPost(Number(id)));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const nothingToShow = loading && !postToShow;
    return (nothingToShow ?
                <SimpleCard className='mt-4'>Загрузка</SimpleCard> :
                postToShow ?
                    <PostCard key={postToShow.id} expanded post={postToShow}/> :
                    <SimpleCard className='mt-4'>Пост не найден</SimpleCard>);
}