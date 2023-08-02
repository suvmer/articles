import { FC, ReactChild, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { UIActionTypes } from '../../types/UI';
import { sideBarVisible } from '../../store/action-creators/ui';
interface NavigationButtonProps {
    to?: string,
    children: ReactChild | ReactNode
}
export const NavigationButton:FC<NavigationButtonProps> = ({to="", children=<></>}:NavigationButtonProps) => {
    const dispatch = useAppDispatch();
    return (
        <NavLink
            to={to}
            onClick={() => {
                dispatch(sideBarVisible(false));
            }}
            className={({isActive}) => ("navigationButton " + (isActive ? "active" : ""))}>
                {children}
        </NavLink>);
}