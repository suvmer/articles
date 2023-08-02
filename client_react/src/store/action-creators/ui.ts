import { UIActionTypes } from "../../types/UI";

export const sideBarVisible = (value:boolean) => ({type: UIActionTypes.SET_SIDEBAR_OPEN, payload: value});