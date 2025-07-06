import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {RouterProvider} from "react-router-dom";
import {routes} from "./routers/router.tsx";
import {LoaderContext} from "./hoc/LoaderContext.tsx";


function App() {


  return (
    <>
        <LoaderContext>
            <Provider store={store}>
                <RouterProvider router={routes}/>
            </Provider>
        </LoaderContext>
    </>
  )
}

export default App
