import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useTypedSelector } from "../hooks/useTypedSelector"
import { fetchPosts } from "../store/action-creators/post"
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useNavigate } from 'react-router';
import '../style.css';
import { PostCard } from '../components/PostCard';
import { PostList } from '../components/PostList';
import { PostForm } from '../components/PostForm';
import { PostFormValue } from '../types/post';

export const MainPage : FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => { console.log("wtf"); dispatch(fetchPosts()) }, []);
    const {loading, posts} = useTypedSelector(state => state.posts);
    const MemoPostForm = useMemo(() => <PostForm/>, []);
    const postList = (loading && !posts) ?
        "Загрузка" :
        <PostList posts={posts}/>
        //posts.map(post => <PostCard post={post}></PostCard>);
    return <div className='content'>
        {MemoPostForm}
        {postList}
    </div>
}