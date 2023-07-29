import { FC, ChangeEvent, useState } from 'react';
import { PostFormValue } from '../types/post';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addPost } from '../store/action-creators/post';

export const PostForm:FC = () => {
    const [value, setValue] = useState<PostFormValue>({title: "", body: ""});
    const error = useTypedSelector(state => state.posts.error);
    const dispatch = useAppDispatch();
    const handleChange : (arg0: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void = (event) =>
        setValue((prevValue) => ({...prevValue, [event.target.name]: event.target.value}));
    
    const createPost = () => {
        console.log(value)
        dispatch(addPost(value));
        setValue({title: "", body: ""});
    }
    
    return <form className='postForm' onSubmit={(e) => { e.preventDefault(); createPost(); } }>
        {error ? <div className='postForm__error'>{error}</div> : ""}
        <input value={value.title} onChange={handleChange} name='title' placeholder='Название статьи'></input>
        <textarea className='mt-2' value={value.body} onChange={handleChange} name='body' placeholder='Текст статьи'></textarea>
        <button type="submit">Добавить статью</button>
    </form>
}
/*
import { FC, ChangeEvent } from 'react';
interface PostFormValue {
    title: string,
    body: string
}
interface PostFormProps {
    //sendValue: (arg0: string, arg1: string) => void;
    value: PostFormValue,
    setValue: (arg0: PostFormValue) => void
}
export const PostForm:FC<PostFormProps> = ({value, setValue}: PostFormProps) => {
    const handleChange : (arg0: ChangeEvent<HTMLInputElement>) => void = (event) => {
        setValue({...value, [event.target.name]: event.target.value});
    }
    console.log("rerender")
    return <div>
        <input onChange={handleChange} name='title' placeholder='Название поста'></input>
        <input onChange={handleChange} name='body' placeholder='Имя поста'></input>
    </div>
}
*/