import { FC, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector"
import { fetchPost } from "../store/action-creators/post";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { PostPageParams } from "../types/post";

export const PostPage : FC = () => {
    const {loading, postToShow} = useTypedSelector(state => state.posts);
    const {id} = useParams<PostPageParams>();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPost(Number(id)));
    }, []);
    const post = loading ? "Загрузка" : postToShow ? <div style={{padding: "10px", margin: '10px', border: "1px solid black"}}>
        <p>{postToShow.title}</p>
            <p>{postToShow.body}</p>
            <br/>
        </div> : "Пост не найден";
    return <div>{post}</div>
}