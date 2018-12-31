import React, { FunctionComponent } from "react";
import { Redirect, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import AuthCheck from "../components/authCheck/authCheck";
import EnsureUsersOnly from "../components/authCheck/ensureUsersOnly/ensureUsersOnly";
import EnsureVisitorsOnly from "../components/authCheck/ensureVisitorsOnly/ensureVisitorsOnly";
import Dashboard from "../views/dashboard/dashboard";
import LoginRoutes from "./loginRoutes/loginRoutes";

const TopLevelRoutes: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <AuthCheck>
        <EnsureVisitorsOnly>
          <Route path={"/login"} component={LoginRoutes} />
        </EnsureVisitorsOnly>

        <EnsureUsersOnly>
          <Route path={"/dashboard"} component={Dashboard} />
        </EnsureUsersOnly>

        <Redirect to={"/login"} />
      </AuthCheck>
    </BrowserRouter>
  );
};

export default TopLevelRoutes;
