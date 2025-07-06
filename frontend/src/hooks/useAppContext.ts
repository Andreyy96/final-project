import {useContext} from "react";
import {Context} from "../hoc/LoaderContext.tsx";


const useAppContext = () => useContext(Context)

export {
    useAppContext
}