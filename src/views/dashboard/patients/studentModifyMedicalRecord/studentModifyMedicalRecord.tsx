import { AxiosResponse } from "axios";
import { Formik } from "formik";
import { cloneDeep } from "lodash";
import React, { Component, Fragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import Button from "../../../../components/button/button";
import Container from "../../../../components/container/container";
import { OnholdService } from "../../../../services/onhold/onhold.service";
import { IApiErrorResponse, IMedicalRecord } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import MedicalRecordForm from "../../components/medicalRecordForm/medicalRecordForm";
import {
  IAddMedicalRecord,
  medicalRecordInitialValues,
  medicalRecordValidationSchema
} from "../addMedicalRecord/addMedicalRecord";
import { IAddTriageRouteParams } from "../addTriage/addTriage";
import {
  IStudentAddTriageMapStateToProps,
  StudentAddTriageProps
} from "../studentAddTriage/studentAddTriage";

export interface IStudentModifyMedicalRecordMapStateToProps {
  medicalRecord: IMedicalRecord;
}

class StudentModifyMedicalRecord extends Component<
  StudentAddTriageProps & IStudentModifyMedicalRecordMapStateToProps
> {
  onholdService = new OnholdService(this.props.token);

  onClickReturn = (): void => {
    this.props.history.push(`/dashboard/pacientes`);
  };

  render() {
    const mdDoc = cloneDeep(this.props.medicalRecord.documento) as any;

    delete mdDoc.periodontodiagrama;
    delete mdDoc.registroDeControlDePlaca;

    return (
      <Fragment>
        <Button onClick={this.onClickReturn}>Regresar</Button>

        <Container>
          <Formik
            enableReinitialize={true}
            initialValues={{
              historiaClinica: mdDoc
            }}
            validationSchema={medicalRecordValidationSchema}
            onSubmit={async (values: IAddMedicalRecord, formikActions) => {
              window.scrollTo(0, 0);

              formikActions.setSubmitting(true);
              formikActions.setStatus({});

              try {
                const document = cloneDeep(values.historiaClinica);

                delete document.periodontodiagrama;
                delete document.registroDeControlDePlaca;

                const documentStringify = JSON.stringify(document);

                const formData = new FormData();

                formData.append("documento", documentStringify);
                formData.append(
                  "periodontodiagrama",
                  values.historiaClinica.periodontodiagrama!
                );
                formData.append(
                  "registroDeControlDePlaca",
                  values.historiaClinica.registroDeControlDePlaca!
                );

                formData.set("modificacion", "true");
                formData.set("paciente", this.props.match.params.id);
                formData.set("profesor", this.props.profesorId);
                formData.set("tipo", "historia principal");

                const response = await this.onholdService.addOnhold({
                  enespera: formData,
                  studentId: this.props.studentId
                });

                this.props.history.push(
                  `/dashboard/pacientes/${
                    this.props.match.params.id
                  }/historiaclinica/modificar/paso-1`
                );

                formikActions.setStatus({
                  success: response.data.message
                });
              } catch (error) {
                if (error.response) {
                  const response: AxiosResponse<IApiErrorResponse> =
                    error.response;

                  formikActions.setStatus({
                    error: response.data.message
                  });
                } else if (error.request) {
                  formikActions.setStatus({
                    error:
                      "No se pudo establecer una conexión con el servidor. Por favor, vuelva a intentarlo mas tarde"
                  });
                } else {
                  formikActions.setStatus({
                    error:
                      "Ha ocurrido un error. Por favor, vuelva a intentarlo mas tarde"
                  });
                }
              }

              formikActions.setSubmitting(false);
            }}
            component={MedicalRecordForm}
          />
        </Container>
      </Fragment>
    );
  }
}
const mapStateToProps: MapStateToProps<
  IStudentAddTriageMapStateToProps & IStudentModifyMedicalRecordMapStateToProps,
  RouteComponentProps<IAddTriageRouteParams>,
  IApplicationState
> = state => ({
  token: state.auth.token,
  studentId: state.auth.user!.id,
  profesorId: state.auth.professor!._id!,
  medicalRecord: state.auth.medicalRecord!
});

export default connect<
  IStudentAddTriageMapStateToProps,
  {},
  RouteComponentProps<IAddTriageRouteParams>,
  IApplicationState
>(mapStateToProps)(StudentModifyMedicalRecord);
