import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LoginRoutes from "./loginRoutes/loginRoutes";

const TopLevelRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={'/login'} component={LoginRoutes}/>
        <Redirect to={'/login'}/>
      </Switch>
    </BrowserRouter>
  );
};

export default TopLevelRoutes;
