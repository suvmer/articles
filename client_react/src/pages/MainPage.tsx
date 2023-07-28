import { useEffect } from 'react'
import { useTypedSelector } from "../hooks/useTypedSelector"
import { fetchPosts } from "../store/action-creators/post"
import { useAppDispatch } from '../hooks/useAppDispatch';

export const MainPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => { dispatch(fetchPosts()) }, []);
    const {loading, posts} = useTypedSelector(state => state.posts);
    const postList = loading ? "Загрузка" : posts.map(post => <div style={{padding: "10px", margin: '10px', border: "1px solid black"}}><p>{post.title}</p><p>{post.body}</p><br/></div>);
    return <div>Main page<div>{postList}</div></div>
}