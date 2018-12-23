import React, { Fragment, FunctionComponent } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import LoginStudent from "../../views/login/loginStudent/loginStudent";

const LoginRoutes: FunctionComponent<RouteComponentProps> = ({match}) => {
  return (
    <Fragment>
      <Switch>
        <Route path={`${match.path}/estudiante`} component={LoginStudent}/>
        <Route path={`${match.path}/personal`}/>
        <Redirect to={`${match.url}/estudiante`}/>
      </Switch>
    </Fragment>
  );
};

export default LoginRoutes;
