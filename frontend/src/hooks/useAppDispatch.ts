import {useDispatch} from "react-redux";
import {AppDispatch} from "../types/reduxType.tsx";

const useAppDispatch = () => useDispatch<AppDispatch>()

export {useAppDispatch}