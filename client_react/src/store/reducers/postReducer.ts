interface PostState {

}
interface PostAction {
    type: string,
    payload?: any;
}

const initialState: PostState = {

}

export const postReducer = (state = initialState, action : PostAction) : PostState => {
    return state;
}