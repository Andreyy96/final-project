import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {RouterProvider} from "react-router-dom";
import {routes} from "./routers/router.tsx";

function App() {


  return (
    <>
        <Provider store={store}>
            <RouterProvider router={routes}/>
        </Provider>
    </>
  )
}

export default App
