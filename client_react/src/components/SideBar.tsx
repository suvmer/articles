import { FC, useEffect, useState } from 'react';
import { NavigationButton } from './UI/NavigationButton';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';

export const SideBar:FC = () => {
    const [isHidden, setHidden] = useState<boolean>(false);
    const hidden = useTypedSelector(state => state.ui.sideBarOpen);
    useEffect(() => {
        setHidden(hidden);
    }, [hidden])
    return <aside className={'sideBar' + (isHidden ? ' sideBar_show' : '')}>
        <NavigationButton to="/">Список статей</NavigationButton>
        <NavigationButton to="/comments">Комментарии</NavigationButton>
        <a className='button ma-4' href='https://github.com/suvmer/articles' target='_BLANK'>
            <Icon path={mdiGithub} size={1.3}/>
            GITHUB
        </a>
    </aside>;
}