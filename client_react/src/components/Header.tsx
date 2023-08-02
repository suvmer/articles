import { FC } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { UIActionTypes } from '../types/UI';
import { SwitchButton } from './UI/SwitchButton'
import { mdiMenu } from '@mdi/js';
export const Header:FC = () => {
    const dispatch = useAppDispatch();
    return <header className='header'>
        <SwitchButton
            onClick = {
                (value:boolean) => dispatch({type: UIActionTypes.SET_SIDEBAR_OPEN, payload: !value})
            }
            iconPath={mdiMenu}
            rotate
            className='menuIcon'
        />
        <p>{document.title}</p>
    </header>;
}