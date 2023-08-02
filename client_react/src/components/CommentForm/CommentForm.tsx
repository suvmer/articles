import { FC, ChangeEvent, useState, useEffect, useRef, FormEvent } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Icon } from '@mdi/react';
import { mdiPostOutline } from '@mdi/js';
import { CommentFormValue } from '../../types/comment';
import { addComment } from '../../store/action-creators/comment';

interface CommentFormProps {
    onClose?: (arg0:CommentFormValue) => void,
    defaultValue?: CommentFormValue,
    editing?: boolean,
    post_id?: number,
    className?: string
}

export const CommentForm:FC<CommentFormProps> = ({onClose, defaultValue = {body: "", post_id: 0}, editing = false, post_id = 0, className=''}:CommentFormProps) => {
    const [value, setValue] = useState<CommentFormValue>({...defaultValue, post_id});
    const valueRef = useRef(value);
    const error = useTypedSelector(state => state.comments.error);
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
            dispatch(addComment(value));
            setValue({...value, body: ""});
        }
    }
    
    return <form className={`${!editing ? 'card ' : ''}addForm `+className} onSubmit={submitForm}>
        {!editing && <p className="card__title">Оставить комментарий</p>}
        {!editing && error ? <div className='addForm__error my-2'>{error}</div> : ""}
        <div className='card__icon-input'>
            {editing && <Icon className='pr-4' path={mdiPostOutline} size={1.3}/>}
            <textarea className='my-2' value={value.body} onChange={handleChange} name='body' placeholder='Текст комментария'/>
        </div>
        {!editing && <button className='addForm__addButton' type="submit">Прокомментировать</button>}
    </form>
}