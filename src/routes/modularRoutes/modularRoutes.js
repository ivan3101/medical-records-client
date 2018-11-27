import React from 'react';
import {Route} from "react-router-dom";

function ModularRoutes({ path, component}) {
    return (
        <Route
            path={path}
            component={component}
        />
    );
}
export default ModularRoutes;
