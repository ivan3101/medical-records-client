import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { Component, Fragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { array, object, string } from "yup";
import Button from "../../../../components/button/button";
import Container from "../../../../components/container/container";
import { TriageService } from "../../../../services/triage/triage.service";
import { IApiErrorResponse } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import TriageForm from "../../components/triageForm/triageForm";

export interface IAddTriageMapStateToProps {
  token: string;
}

export interface IAddTriageRouteParams {
  id: string;
}

export interface IAddTriage {
  triaje: {
    odontodiagrama: null | File;
    observaciones: string;
    requerimientosClinicosDelPaciente: string[];
  };
}

export const triageInitialValues: IAddTriage = {
  triaje: {
    odontodiagrama: null,
    observaciones: "",
    requerimientosClinicosDelPaciente: []
  }
};

export const triageValidationSchema = object().shape({
  triaje: object().shape({
    observaciones: string()
      .trim()
      .required("Debe ingresar sus observaciones"),
    requerimientosClinicosDelPaciente: array().required(
      "Debe seleccionar al menos 1 requerimiento"
    )
  })
});

export type AddTriageProps = IAddTriageMapStateToProps &
  RouteComponentProps<IAddTriageRouteParams>;

class AddTriage extends Component<AddTriageProps> {
  triageService = new TriageService(this.props.token);

  onClickReturn = (): void => {
    this.props.history.push(
      `/dashboard/pacientes/${this.props.match.params.id}/historiaclinica`
    );
  };

  render() {
    return (
      <Fragment>
        <Button onClick={this.onClickReturn}>Regresar</Button>

        <Container>
          <h1>Agregar Triaje</h1>
          <Formik
            initialValues={triageInitialValues}
            validationSchema={triageValidationSchema}
            onSubmit={async (values: IAddTriage, formikActions) => {
              window.scrollTo(0, 0);

              formikActions.setSubmitting(true);
              formikActions.setStatus({});

              try {
                const formData = new FormData();

                for (const entries of Object.entries(values.triaje)) {
                  formData.append(entries[0], entries[1] as File | string);
                }

                const response = await this.triageService.addTriage({
                  triaje: formData,
                  patientId: this.props.match.params.id
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
  IAddTriageMapStateToProps,
  RouteComponentProps<IAddTriageRouteParams>,
  IApplicationState
> = state => ({
  token: state.auth.token
});

export default connect<
  IAddTriageMapStateToProps,
  {},
  RouteComponentProps<IAddTriageRouteParams>,
  IApplicationState
>(mapStateToProps)(AddTriage);
