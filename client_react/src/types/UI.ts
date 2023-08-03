import { PropsWithChildren } from 'react';
import { Action } from 'redux';
export interface PayloadAction<T1 = any, T2 = any> extends Action<T1> {
    payload: T2
} 
export interface UIState {
    sideBarOpen: boolean;
}
export interface OpenSideBar extends PayloadAction<string, boolean> {}
export type UIAction = OpenSideBar;
export enum UIActionTypes {
    SET_SIDEBAR_OPEN = 'SET_SIDEBAR_OPEN'
}
export interface SimpleCardProps extends PropsWithChildren {
    className?: string
}
export interface IconButtonProps {
    onClick: () => void,
    toDelete?: boolean,
    iconPath?: string,
    className?: string
}
export interface SwitchButtonProps {
    onClick: (arg0: boolean) => void,
    iconPath?: string,
    className?: string,
    rotate?: boolean
    value?: boolean | null
}

export interface NavigationButtonProps extends PropsWithChildren {
    to?: string,
}