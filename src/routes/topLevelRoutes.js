import React from 'react';
import {Route} from "react-router-dom";
import Login from "../views/login/login";
import EnsureVisitorOnly from "../components/authCheck/ensureVisitorOnly/ensureVisitorOnly";
import Dashboard from "../views/dashboard/dashboard";
import EnsureUserOnly from "../components/authCheck/ensureUserOnly/ensureUserOnly";
import {routesDashboardConfig} from "./routesDashboard.config";

const TopLevelRoutes = () => {
    return (
        <React.Fragment>
            <EnsureVisitorOnly>
                <Route path={'/login'} component={Login}/>
            </EnsureVisitorOnly>
            <EnsureUserOnly>
                <Route path={'/dashboard'} render={props => (
                    <Dashboard {...props} routes={routesDashboardConfig}/>
                )}/>
            </EnsureUserOnly>
        </React.Fragment>
    );
};

export default TopLevelRoutes;
