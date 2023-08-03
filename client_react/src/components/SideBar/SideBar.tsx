import { FC, MouseEventHandler, useEffect, useState } from 'react';
import { NavigationButton } from '../UI/NavigationButton/NavigationButton';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Icon from '@mdi/react';
import { mdiGithub } from '@mdi/js';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { sideBarVisible } from '../../store/action-creators/ui';
import styles from "./SideBar.module.css";

export const SideBar:FC = () => {
    const [isHidden, setHidden] = useState<boolean>(false);
    const hidden = useTypedSelector(state => state.ui.sideBarOpen);
    const dispatch = useAppDispatch();
    useEffect(() => {
        setHidden(hidden);
    }, [hidden])
    const closeSideBar:MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        dispatch(sideBarVisible(false));
    }
    return <>
        <div onClick={!isHidden ? () => {} : closeSideBar} className={styles.sideBarOverlay + ' ' + (isHidden ? styles.sideBarOverlay_visible : '')}/>
        <aside className={styles.sideBar + ' ' + (isHidden ? styles.sideBar_show : '')}>
            <NavigationButton to="/">Список статей</NavigationButton>
            <NavigationButton to="/comments">Комментарии</NavigationButton>
            <a className={styles.button + ' ma-4'} href='https://github.com/suvmer/articles' target='_BLANK' rel="noreferrer">
                <Icon path={mdiGithub} size={1.3}/>
                GITHUB
            </a>
        </aside>
    </>;
}