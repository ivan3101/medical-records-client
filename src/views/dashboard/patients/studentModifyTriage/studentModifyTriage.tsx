import { AxiosResponse } from "axios";
import { Formik } from "formik";
import { cloneDeep } from "lodash";
import React, { Component, Fragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import Button from "../../../../components/button/button";
import Container from "../../../../components/container/container";
import { OnholdService } from "../../../../services/onhold/onhold.service";
import { IApiErrorResponse, ITriage } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import TriageForm from "../../components/triageForm/triageForm";
import {
  AddTriageProps,
  IAddTriage,
  IAddTriageRouteParams,
  triageInitialValues,
  triageValidationSchema
} from "../addTriage/addTriage";
import {
  IStudentAddTriageMapStateToProps,
  StudentAddTriageProps
} from "../studentAddTriage/studentAddTriage";

export interface IStudentModifyTriageMapStateToProps {
  triage: ITriage;
}

class StudentModifyTriage extends Component<
  StudentAddTriageProps & IStudentModifyTriageMapStateToProps
> {
  onholdService = new OnholdService(this.props.token);

  onClickReturn = (): void => {
    this.props.history.push(`/dashboard/pacientes`);
  };

  render() {
    const { triage } = this.props;

    const triageDoc = cloneDeep(triage.documento) as any;

    delete triageDoc.odontodiagrama;

    return (
      <Fragment>
        <Button onClick={this.onClickReturn}>Regresar</Button>

        <Container>
          <h1>Modificar Triaje</h1>
          <Formik
            enableReinitialize={true}
            initialValues={{
              triaje: triageDoc
            }}
            validationSchema={triageValidationSchema}
            onSubmit={async (values: IAddTriage, formikActions) => {
              window.scrollTo(0, 0);

              formikActions.setSubmitting(true);
              formikActions.setStatus({});

              try {
                const formData = new FormData();

                const document = cloneDeep(values.triaje);

                delete document.odontodiagrama;

                formData.set("documento", JSON.stringify(document));

                formData.set("odontodiagrama", values.triaje
                  .odontodiagrama as File);

                formData.set("modificacion", "true");
                formData.set("paciente", this.props.match.params.id);
                formData.set("profesor", this.props.profesorId);
                formData.set("tipo", "triaje");

                const response = await this.onholdService.addOnhold({
                  enespera: formData,
                  studentId: this.props.studentId
                });

                formikActions.resetForm();
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
            component={TriageForm}
          />
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IStudentAddTriageMapStateToProps & IStudentModifyTriageMapStateToProps,
  RouteComponentProps<IAddTriageRouteParams>,
  IApplicationState
> = state => ({
  token: state.auth.token,
  studentId: state.auth.user!.id,
  profesorId: state.auth.professor!._id!,
  triage: state.auth.triage!
});

export default connect<
  IStudentAddTriageMapStateToProps,
  {},
  RouteComponentProps<IAddTriageRouteParams>,
  IApplicationState
>(mapStateToProps)(StudentModifyTriage);
