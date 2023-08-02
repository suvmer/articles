import { FC } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { UIActionTypes } from '../../types/UI';
import { SwitchButton } from '../UI/SwitchButton'
import { mdiMenu } from '@mdi/js';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { sideBarVisible } from '../../store/action-creators/ui';
export const Header:FC = () => {
    const dispatch = useAppDispatch();
    const hidden = useTypedSelector(state => state.ui.sideBarOpen);
    return <header className='header'>
        <SwitchButton
            onClick = {
                (value:boolean) => dispatch(sideBarVisible(!value))
            }
            value={hidden}
            iconPath={mdiMenu}
            rotate
            className='menuIcon'
        />
        <p>{document.title}</p>
    </header>;
}