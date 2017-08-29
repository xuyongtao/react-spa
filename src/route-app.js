import * as React from "react";
import { Route, Link, Switch } from "react-router-dom";

import HomePage from "./pages/home";

export const routes = [
    {
        path: '/',
        component: HomePage,
        name: "home",
        exact: true
    }
];

const routeApp = (
    <div>
        <Switch>
            {routes.map(route => <Route key={route.name} {...route} />)}
        </Switch>
    </div>
);

export default routeApp;