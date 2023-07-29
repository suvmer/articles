import { FC, useEffect } from 'react'
import { useTypedSelector } from "../hooks/useTypedSelector"
import { fetchPosts } from "../store/action-creators/post"
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router';
import '../style.css';

export const MainPage : FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => { dispatch(fetchPosts()) }, []);
    const {loading, posts} = useTypedSelector(state => state.posts);
    const postList = loading ?
        "Загрузка" :
        posts.map(post => <div key={post.id} onClick={() => navigate(`post/${post.id}`)} className='card card_link'>
            <p className='card__title'>{post.title}</p>
            <p className='card__body'>{post.body}</p>
        </div>);
    return <div>Main page<div>{postList}</div></div>
}