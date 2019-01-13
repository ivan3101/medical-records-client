import React, { FunctionComponent } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import AddPersonal from "../../../views/dashboard/personal/addPersonal/addPersonal";
import ModifyPersonal from "../../../views/dashboard/personal/modifyPersonal/modifyPersonal";
import Personal from "../../../views/dashboard/personal/personal";

const PersonalRoutes: FunctionComponent<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}`} component={Personal} exact />
      <Route path={`${match.path}/agregar`} component={AddPersonal} />
      <Route path={`${match.path}/:id`} component={ModifyPersonal} />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default PersonalRoutes;
