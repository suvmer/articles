import { FC } from 'react';
import { NavigationButton } from './UI/NavigationButton';

export const SideBar:FC = () => {
    return <aside className='sideBar'>
        <NavigationButton to="/">Список статей</NavigationButton>
        <NavigationButton to="/comments">Комментарии</NavigationButton>
    </aside>;
}