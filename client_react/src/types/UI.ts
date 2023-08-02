export interface UIState {
    sideBarOpen: boolean;
}
export type OpenSideBar = {
    type: string
    payload: boolean
}
export type UIAction = OpenSideBar;

export enum UIActionTypes {
    SET_SIDEBAR_OPEN = 'SET_SIDEBAR_OPEN'
}