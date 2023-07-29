import { FC, useEffect } from 'react'
import { useTypedSelector } from "../hooks/useTypedSelector"
import { fetchPosts } from "../store/action-creators/post"
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router';
import '../style.css';
import { PostCard } from '../components/PostCard';
import { PostList } from '../components/PostList';

export const MainPage : FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => { dispatch(fetchPosts()) }, []);
    const {loading, posts} = useTypedSelector(state => state.posts);
    const postList = (loading && !posts) ?
        "Загрузка" :
        <PostList posts={posts}/>
        //posts.map(post => <PostCard post={post}></PostCard>);
    return <div>Main page<div>{postList}</div></div>
}