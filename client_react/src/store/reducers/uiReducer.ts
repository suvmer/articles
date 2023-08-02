import { UIAction, UIActionTypes, UIState } from "../../types/UI";

const initialState: UIState = {
    sideBarOpen: false
}

export const UIReducer = (state = initialState, action: UIAction) : UIState => {
    switch(action.type) {
        case UIActionTypes.SET_SIDEBAR_OPEN:
            return {...state, sideBarOpen: action.payload};
        default:
            return state;        
    }
}