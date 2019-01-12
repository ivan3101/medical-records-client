import React, { FunctionComponent } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import AddStudent from "../../../views/dashboard/students/addStudent/addStudent";
import ModifyStudent from "../../../views/dashboard/students/modifyStudent/modifyStudent";
import Students from "../../../views/dashboard/students/students";

const StudentRoutes: FunctionComponent<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}`} component={Students} exact />
      <Route path={`${match.path}/agregar`} component={AddStudent} />
      <Route path={`${match.path}/:id`} component={ModifyStudent} />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default StudentRoutes;
