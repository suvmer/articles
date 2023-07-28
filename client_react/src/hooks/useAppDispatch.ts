import { useDispatch } from "react-redux";
import { RootState } from "../store";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from "redux";

type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useAppDispatch = () => useDispatch<TypedDispatch>();