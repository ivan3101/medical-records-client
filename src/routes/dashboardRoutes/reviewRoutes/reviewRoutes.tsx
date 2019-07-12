import React, { FunctionComponent } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import Onhold from "../../../views/dashboard/onhold/onhold";
import ProfessorMedicalRecordContainer from "../../../views/dashboard/patients/professorMedicalRecordContainer/professorMedicalRecordContainer";

const ReviewRoutes: FunctionComponent<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={Onhold} />
      <Route
        path={`${match.path}/:id`}
        component={ProfessorMedicalRecordContainer}
      />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default ReviewRoutes;
