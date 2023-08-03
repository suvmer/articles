import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { sideBarVisible } from '../../../store/action-creators/ui';
import styles from "./NavigationButton.module.css";
import { NavigationButtonProps } from '../../../types/UI';

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