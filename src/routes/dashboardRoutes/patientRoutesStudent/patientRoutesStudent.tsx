import React, { FunctionComponent } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import StudentAddMedicalRecord from "../../../views/dashboard/patients/studentAddMedicalRecord/studentAddMedicalRecord";
import StudentAddTriage from "../../../views/dashboard/patients/studentAddTriage/studentAddTriage";
import StudentMedicalRecordContainer from "../../../views/dashboard/patients/studentMedicalRecordContainer/studentMedicalRecordContainer";
import StudentModifyMedicalRecord from "../../../views/dashboard/patients/studentModifyMedicalRecord/studentModifyMedicalRecord";
import StudentModifyTriage from "../../../views/dashboard/patients/studentModifyTriage/studentModifyTriage";

const PatientRoutesStudent: FunctionComponent<RouteComponentProps> = ({
  match
}) => {
  return (
    <Switch>
      <Route
        path={`${match.path}`}
        exact
        component={StudentMedicalRecordContainer}
      />
      <Route
        path={`${match.path}/:id/historiaclinica/agregar`}
        component={StudentAddMedicalRecord}
      />
      <Route
        path={`${match.path}/:id/historiaclinica/modificar`}
        component={StudentModifyMedicalRecord}
      />
      <Route
        path={`${match.path}/:id/triaje/agregar`}
        component={StudentAddTriage}
      />
      <Route
        path={`${match.path}/:id/triaje/modificar`}
        component={StudentModifyTriage}
      />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default PatientRoutesStudent;
