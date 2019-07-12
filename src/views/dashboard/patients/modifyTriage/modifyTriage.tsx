import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { Component, Fragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import Button from "../../../../components/button/button";
import Container from "../../../../components/container/container";
import Loader from "../../../../components/loader/loader";
import Modal from "../../../../components/modal/modal";
import ModalBody from "../../../../components/modal/modalBody/modalBody";
import ModalHeader from "../../../../components/modal/modalHeader/modalHeader";
import { PatientService } from "../../../../services/patient/patient.service";
import { TriageService } from "../../../../services/triage/triage.service";
import { IApiErrorResponse } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import TriageForm from "../../components/triageForm/triageForm";
import {
  IAddTriage,
  triageInitialValues,
  triageValidationSchema
} from "../addTriage/addTriage";

export interface IModifyTriageMapStateToProps {
  token: string;
}

export interface IModifyTriageRouteParams {
  id: string;
}

export type ModifyTriageProps = IModifyTriageMapStateToProps &
  RouteComponentProps<IModifyTriageRouteParams>;

export interface IModifyTriageState {
  showModal: boolean;
  modalType: string;
  modalMessage: string;
  loading: boolean;
}

export type ModifyTriageState = IModifyTriageState & IAddTriage;

class ModifyTriage extends Component<ModifyTriageProps, ModifyTriageState> {
  state: ModifyTriageState = {
    ...triageInitialValues,
    showModal: false,
    modalType: "",
    modalMessage: "",
    loading: false
  };

  triageService = new TriageService(this.props.token);
  patientService = new PatientService(this.props.token);

  async componentDidMount(): Promise<void> {
    try {
      this.setState(() => ({
        loading: true
      }));

      const { id: patientId } = this.props.match.params;

      if (patientId) {
        const response = await this.patientService.getTriageByPatient(
          patientId
        );

        const { documento } = response.data.data.triaje;

        const documentMap = new Map(Object.entries(documento));

        if (documentMap.has("odontodiagrama")) {
          documentMap.delete("odontodiagrama");
        }

        const triaje = Object.create(null);

        for (const [key, value] of documentMap) {
          triaje[key] = value;
        }

        this.setState(() => ({
          triaje,
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
    const { history, match } = this.props;

    this.setState(() => ({
      showModal: false,
      modalType: "",
      modalMessage: ""
    }));

    history.replace(`/dashboard/pacientes/${match.params.id}/historiaclinica`);
  };

  onClickReturn = (): void => {
    this.props.history.push(
      `/dashboard/pacientes/${this.props.match.params.id}/historiaclinica`
    );
  };

  render() {
    const { showModal, modalType, modalMessage, loading } = this.state;

    return (
      <Fragment>
        <Modal show={showModal} closeCb={this.onCloseModal}>
          <ModalHeader>
            <h2>{modalType}</h2>
          </ModalHeader>
          <ModalBody>
            <p>{modalMessage}</p>
          </ModalBody>
        </Modal>

        <Button onClick={this.onClickReturn}>Regresar</Button>

        <Container>
          <h1>Modificar Triaje</h1>

          {loading ? (
            <Loader />
          ) : (
            <Formik
              enableReinitialize={true}
              initialValues={this.state}
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

                  await this.triageService.modifyTriage({
                    triaje: formData,
                    patientId: this.props.match.params.id
                  });

                  this.setState(() => ({
                    triaje: {
                      ...values.triaje,
                      odontodiagrama: null
                    }
                  }));

                  formikActions.resetForm();
                  formikActions.setStatus({
                    success: "Triaje modificado con exito"
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
          )}
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IModifyTriageMapStateToProps,
  RouteComponentProps<IModifyTriageRouteParams>,
  IApplicationState
> = state => ({
  token: state.auth.token
});

export default connect<
  IModifyTriageMapStateToProps,
  {},
  RouteComponentProps<IModifyTriageRouteParams>,
  IApplicationState
>(mapStateToProps)(ModifyTriage);
