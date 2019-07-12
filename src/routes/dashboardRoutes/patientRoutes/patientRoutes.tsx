import React, { FunctionComponent } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import AddMedicalRecord from "../../../views/dashboard/patients/addMedicalRecord/addMedicalRecord";
import AddPatient from "../../../views/dashboard/patients/addPatient/addPatient";
import AdminMedicalRecordContainer from "../../../views/dashboard/patients/adminMedicalRecordContainer/adminMedicalRecordContainer";
import ModifyPatient from "../../../views/dashboard/patients/modifyPatient/modifyPatient";
import Patients from "../../../views/dashboard/patients/patients";
import AddTriage from "../../../views/dashboard/patients/addTriage/addTriage";
import ModifyTriage from "../../../views/dashboard/patients/modifyTriage/modifyTriage";
import ModifyMedicalRecord from "../../../views/dashboard/patients/modifyMedicalRecord/modifyMedicalRecord";

const PatientRoutes: FunctionComponent<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={Patients} />
      <Route path={`${match.path}/agregar`} component={AddPatient} />
      <Route path={`${match.path}/:id`} component={ModifyPatient} exact />
      <Route
        path={`${match.path}/:id/historiaclinica`}
        component={AdminMedicalRecordContainer}
        exact
      />
      <Route
        path={`${match.path}/:id/historiaclinica/agregar`}
        component={AddMedicalRecord}
      />
      <Route
        path={`${match.path}/:id/historiaclinica/modificar`}
        component={ModifyMedicalRecord}
      />
      <Route path={`${match.path}/:id/triaje/agregar`} component={AddTriage} />
      <Route
        path={`${match.path}/:id/triaje/modificar`}
        component={ModifyTriage}
      />
      <Redirect to={`${match.url}`} />
    </Switch>
  );
};

export default PatientRoutes;
