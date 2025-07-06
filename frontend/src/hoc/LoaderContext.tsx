import {createContext, useState} from "react";

const Context = createContext(null)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const LoaderContext = ({children}) => {
    const state = useState<boolean>(false);

    return (
        <Context.Provider value={state}>
            {children}
        </Context.Provider>
    );
};

export {
    LoaderContext,
    Context
};