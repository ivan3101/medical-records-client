import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { Component, ComponentProps } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import Button from "../../../../components/button/button";
import Container from "../../../../components/container/container";
import Modal from "../../../../components/modal/modal";
import { PatientService } from "../../../../services/patient/patient.service";
import { IApiErrorResponse } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import { TypeCedula } from "../../../login/loginStudent/components/loginForm/loginFormContainer";
import PatientForm from "../../components/patientForm/patientForm";
import {
  Gender,
  initialValues,
  IPatientForm,
  IPatientFormMapStateToProps,
  IPatientFormTypes,
  validationSchema
} from "../addPatient/addPatient";
import Loader from "../patients";

export interface IModifyPatientRouteParams {
  id: string;
}

export interface IModifyPatientState {
  showModal: boolean;
  modalType: string;
  modalMessage: string;
  loading: boolean;
}

export type ModifyPatientPropsTypes = IPatientFormTypes &
  RouteComponentProps<IModifyPatientRouteParams> &
  ComponentProps<any>;

export type ModifyPatientStateTypes = IPatientForm & IModifyPatientState;

class ModifyPatient extends Component<
  ModifyPatientPropsTypes,
  ModifyPatientStateTypes
> {
  state: ModifyPatientStateTypes = {
    ...initialValues,
    showModal: false,
    modalType: "",
    modalMessage: "",
    loading: false
  };

  patientService = new PatientService(this.props.token);

  async componentDidMount(): Promise<any> {
    this.setState(() => ({
      loading: true
    }));

    try {
      const { id: patientId } = this.props.match.params;

      if (patientId) {
        const response = await this.patientService.getPatientById(patientId);

        const {
          cedula,
          genero,
          telefono,
          fechaDeNacimiento
        } = response.data.data.paciente;

        this.setState(() => ({
          ...response.data.data.paciente,
          cedula: {
            type: cedula.split("-")[0] as TypeCedula,
            number: cedula.split("-")[1]
          },
          genero: genero as Gender,
          telefono: {
            prefix: telefono.split("-")[0],
            number: telefono.split("-")[1]
          },
          fechaDeNacimiento: new Date(fechaDeNacimiento),
          showModal: false,
          modalType: "",
          modalMessage: "",
          loading: false
        }));
      }
    } catch (error) {
      let modalMessage: string;

      if (error.response) {
        const response: AxiosResponse<IApiErrorResponse> = error.response;

        modalMessage = response.data.message;
      } else if (error.request) {
        modalMessage =
          "No se pudo establecer una conexión con el servidor. Por favor, vuelva a intentarlo mas" +
          " tarde";
      } else {
        modalMessage =
          "Ha ocurrido un error. Por favor, vuelva a intentarlo mas tarde";
      }

      this.setState(() => ({
        showModal: true,
        modalType: "Error",
        modalMessage
      }));
    }
  }

  onCloseModal = () => {
    const { history } = this.props;

    this.setState(() => ({
      showModal: false,
      modalType: "",
      modalMessage: ""
    }));

    history.replace("/dashboard/pacientes");
  };

  onClickReturn = () => {
    const { history } = this.props;

    history.push("/dashboard/pacientes");
  };

  render() {
    const { showModal, modalType, modalMessage, loading } = this.state;

    return (
      <React.Fragment>
        <Modal show={showModal} closeCb={this.onCloseModal}>
          <h2>{modalType}</h2>
          <p>{modalMessage}</p>
        </Modal>

        <Button onClick={this.onClickReturn}>Regresar</Button>

        <Container>
          <h2>Modificar Paciente</h2>

          {loading ? (
            <Loader />
          ) : (
            <Formik
              enableReinitialize={true}
              initialValues={this.state}
              validationSchema={validationSchema}
              onSubmit={async (values, formikActions) => {
                window.scrollTo(0, 0);

                formikActions.setSubmitting(true);
                formikActions.setStatus({});

                try {
                  const { id: patientId } = this.props.match.params;

                  const cedula = `${values.cedula.type}-${
                    values.cedula.number
                  }`;
                  const telefono = `${values.telefono.prefix}-${
                    values.telefono.number
                  }`;

                  await this.patientService.modifyPatient({
                    patientId,
                    paciente: {
                      ...values,
                      cedula,
                      telefono
                    }
                  });

                  this.setState(() => ({
                    ...values
                  }));

                  formikActions.resetForm();

                  formikActions.setStatus({
                    success: "El paciente ha sido modificado con exito"
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
              component={PatientForm}
            />
          )}
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IPatientFormMapStateToProps,
  {},
  IApplicationState
> = state => ({
  token: state.auth.token
});

export default connect<IPatientFormMapStateToProps, {}, {}, IApplicationState>(
  mapStateToProps
)(ModifyPatient);
