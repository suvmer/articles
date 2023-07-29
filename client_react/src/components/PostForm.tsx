import { FC, ChangeEvent, useState, useEffect, useRef, FormEvent } from 'react';
import { PostFormValue } from '../types/post';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addPost } from '../store/action-creators/post';
import { Icon } from '@mdi/react';
import { mdiPostOutline } from '@mdi/js';

interface PostFormProps {
    onClose?: (arg0:PostFormValue) => void,
    defaultValue?: PostFormValue,
    editing?: boolean
}

export const PostForm:FC<PostFormProps> = ({onClose, defaultValue = {title: "", body: ""}, editing = false}:PostFormProps) => {
    const [value, setValue] = useState<PostFormValue>(defaultValue);
    const valueRef = useRef(value);
    const error = useTypedSelector(state => state.posts.error);
    const dispatch = useAppDispatch();
    const handleChange : (arg0: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void = (event) => {
        setValue((prevValue) => {
            const newValue = ({...prevValue, [event.target.name]: event.target.value});
            valueRef.current = newValue;
            return newValue;
        });
    }
    useEffect(() => () => onClose && onClose(valueRef.current), []);
    
    const submitForm = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!editing) {
            dispatch(addPost(value));
            setValue({title: "", body: ""});
        }
    }
    
    return <form className={`${!editing ? 'card ' : ''}addForm`} onSubmit={submitForm}>
        {!editing && <p className="card__title">Добавить статью</p>}
        {!editing && error ? <div className='addForm__error my-2'>{error}</div> : ""}
        <div className='card__icon-input'>
            {editing && <Icon className='pr-4' path={mdiPostOutline} size={1.3}/>}
            <input className='my-2' value={value.title} onChange={handleChange} name='title' placeholder='Название статьи'/>
        </div>
        <textarea value={value.body} onChange={handleChange} name='body' placeholder='Текст статьи'/>
        {!editing && <button className='addForm__addButton' type="submit">Добавить статью</button>}
    </form>
}