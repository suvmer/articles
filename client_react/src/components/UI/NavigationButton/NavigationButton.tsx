import { FC, PropsWithChildren, ReactChild, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { sideBarVisible } from '../../../store/action-creators/ui';
import styles from "./NavigationButton.module.css";

interface NavigationButtonProps extends PropsWithChildren {
    to?: string,
}
export const NavigationButton:FC<NavigationButtonProps> = ({to="", children=<></>}:NavigationButtonProps) => {
    const dispatch = useAppDispatch();
    return (
        <NavLink
            to={to}
            onClick={() => {
                dispatch(sideBarVisible(false));
            }}
            className={({isActive}) => (styles.navigationButton + ' ' + (isActive ? styles.active : ""))}>
                {children}
        </NavLink>);
}