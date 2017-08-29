import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Link } from "react-router-dom";

import routeApp from "./route-app";
import storeApp from "./config-store";

const store = storeApp();

render(
    <Provider store={store}>
        <BrowserRouter>
            {routeApp}
        </BrowserRouter>
    </Provider>,
    document.getElementById("app"),
    null
);
