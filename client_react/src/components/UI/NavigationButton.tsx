import { FC, ReactChild, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { UIActionTypes } from '../../types/UI';
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
                dispatch({type: UIActionTypes.SET_SIDEBAR_OPEN, payload: false});
            }}
            className={({isActive}) => ("navigationButton " + (isActive ? "active" : ""))}>
                {children}
        </NavLink>);
}