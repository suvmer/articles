import { FC, useState, useEffect } from 'react';
import { useParams, useSearchParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector"
import { fetchPost } from "../store/action-creators/post";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { Post, PostPageParams } from "../types/post";
import { PostCard } from '../components/PostCard';
import { fetchComments } from '../store/action-creators/comment';
import { AnalyticPageParams, Comment } from '../types/comment';
import { CommentCard } from '../components/CommentCard';
import { PostList } from '../components/PostList';

export const CommentAnalytic: FC = () => {
    const {loading, comments} = useTypedSelector(state => state.comments);
    
    const [searchParams, setSearchParams] = useSearchParams();
    const [commentGroups, setGroups] = useState<Post[]>([]);
    const [dates, setDates] = useState<AnalyticPageParams>({dateFrom: searchParams.get('dateFrom') ?? (Date.now()-30*24*60*60*1000).toString(), dateTo: searchParams.get('dateTo') ?? Date.now().valueOf().toString()})
    useEffect( () => {
        setSearchParams({...dates});
    }, [])
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchComments(dates));
    }, []);
    useEffect(() => {
        const grouppedComments = comments.reduce((acc:Comment[][], cur:Comment) => {
            if(acc.length == 0 || acc[acc.length-1][0].post_id != cur.post_id)
                return [...acc, [cur]];
            return acc.map((group, index) => index == acc.length - 1 ? [...group, cur] : group);
        }, []);
        setGroups(grouppedComments.map(group => ({...group[0].Post, comments: group})));
    }, [comments])
    return ((loading && !commentGroups) ? <p>"Загрузка"</p> : commentGroups ? <PostList expanded posts={commentGroups}/> : <p>Нет комментариев</p>);
}