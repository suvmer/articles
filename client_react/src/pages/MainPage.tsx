import { FC, useEffect, useMemo } from 'react'
import { useTypedSelector } from "../hooks/useTypedSelector"
import { fetchPosts } from "../store/action-creators/post"
import { useAppDispatch } from '../hooks/useAppDispatch';
import '../style.css';
import { PostList } from '../components/Lists/PostList';
import { PostForm } from '../components/Forms/PostForm';

export const MainPage : FC = (props) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPosts())
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const {loading, posts} = useTypedSelector(state => state.posts);
    const MemoPostForm = useMemo(() => <PostForm/>, []);
    const postList = (loading && !posts) ?
        "Загрузка" :
        <PostList posts={posts}/>
    return <>
        {MemoPostForm}
        {postList}
    </>
}