import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../types/reduxType.tsx";

const useAppSelector:TypedUseSelectorHook<RootState> = useSelector

export {useAppSelector}