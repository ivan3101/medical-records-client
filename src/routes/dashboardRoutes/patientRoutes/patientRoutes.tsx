import React, { FunctionComponent } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import AddPatient from "../../../views/dashboard/patients/addPatient/addPatient";
import ModifyPatient from "../../../views/dashboard/patients/modifyPatient/modifyPatient";
import Patients from "../../../views/dashboard/patients/patients";

const PatientRoutes: FunctionComponent<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={Patients} />
      <Route path={`${match.path}/agregar`} component={AddPatient} />
      <Route path={`${match.path}/:id`} component={ModifyPatient} />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default PatientRoutes;
