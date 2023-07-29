import { FC, ReactChild, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
interface NavigationButtonProps {
    to?: string,
    children: ReactChild | ReactNode
}
export const NavigationButton:FC<NavigationButtonProps> = ({to="", children=<></>}:NavigationButtonProps) => {
    return <NavLink to={to} className={({isActive}) => ("navigationButton " + (isActive ? "active" : ""))}>{children}</NavLink>
}