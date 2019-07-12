import { AxiosResponse } from "axios";
import { Formik } from "formik";
import { cloneDeep } from "lodash";
import React, { Component, Fragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import Button from "../../../../components/button/button";
import Container from "../../../../components/container/container";
import Loader from "../../../../components/loader/loader";
import Modal from "../../../../components/modal/modal";
import ModalBody from "../../../../components/modal/modalBody/modalBody";
import ModalHeader from "../../../../components/modal/modalHeader/modalHeader";
import { MedicalRecordService } from "../../../../services/medicalRecord/medicalRecord.service";
import { PatientService } from "../../../../services/patient/patient.service";
import { IApiErrorResponse } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import MedicalRecordForm from "../../components/medicalRecordForm/medicalRecordForm";
import {
  IAddMedicalRecord,
  medicalRecordInitialValues,
  medicalRecordValidationSchema
} from "../addMedicalRecord/addMedicalRecord";

export interface IModifyMedicalRecordMapStateToProps {
  token: string;
}

export interface IModifyMedicalRecordRouteParams {
  id: string;
}

export type ModifyMedicalRecordProps = IModifyMedicalRecordMapStateToProps &
  RouteComponentProps<IModifyMedicalRecordRouteParams>;

export interface IModifyMedicalRecordState {
  showModal: boolean;
  modalType: string;
  modalMessage: string;
  loading: boolean;
}

export type ModifyMedicalRecordState = IModifyMedicalRecordState &
  IAddMedicalRecord;

class ModifyMedicalRecord extends Component<
  ModifyMedicalRecordProps,
  ModifyMedicalRecordState
> {
  state: ModifyMedicalRecordState = {
    ...medicalRecordInitialValues,
    showModal: false,
    modalType: "",
    modalMessage: "",
    loading: false
  };

  medicalRecordService = new MedicalRecordService(this.props.token);
  patientService = new PatientService(this.props.token);

  async componentDidMount(): Promise<void> {
    try {
      this.setState(() => ({
        loading: true
      }));

      const { id: patientId } = this.props.match.params;

      if (patientId) {
        const response = await this.patientService.getMedicalRecordByPatient(
          patientId
        );

        const { documento } = response.data.data.historiaMedica;

        const documentMap = new Map(Object.entries(documento));

        if (documentMap.has("periodontodiagrama")) {
          documentMap.delete("periodontodiagrama");
        }

        if (documentMap.has("registroDeControlDePlaca")) {
          documentMap.delete("registroDeControlDePlaca");
        }

        const historiaClinica = Object.create(null);

        for (const [key, value] of documentMap) {
          historiaClinica[key] = value;
        }

        this.setState(() => ({
          historiaClinica,
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
          <h1>Modificar Historia Medica</h1>

          {loading ? (
            <Loader />
          ) : (
            <Formik
              enableReinitialize={true}
              initialValues={this.state}
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

                  formData.append("historiaClinica", documentStringify);
                  formData.append(
                    "periodontodiagrama",
                    values.historiaClinica.periodontodiagrama!
                  );
                  formData.append(
                    "registroDeControlDePlaca",
                    values.historiaClinica.registroDeControlDePlaca!
                  );

                  await this.medicalRecordService.modifyMedicalRecord({
                    historiaMedica: formData,
                    patientId: this.props.match.params.id
                  });

                  formikActions.resetForm();

                  this.setState(() => ({
                    historiaClinica: {
                      ...values.historiaClinica,
                      periodontodiagrama: null,
                      registroDeControlDePlaca: null
                    }
                  }));

                  this.props.history.push(
                    `/dashboard/pacientes/${
                      this.props.match.params.id
                    }/historiaclinica/modificar/paso-1`
                  );

                  formikActions.setStatus({
                    success: "La Historia Clinica ha sido modificada con exito"
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
          )}
        </Container>
      </Fragment>
    );
  }
}

const mapStatetoProps: MapStateToProps<
  IModifyMedicalRecordMapStateToProps,
  RouteComponentProps<IModifyMedicalRecordRouteParams>,
  IApplicationState
> = state => ({
  token: state.auth.token
});

export default connect<
  IModifyMedicalRecordMapStateToProps,
  {},
  RouteComponentProps<IModifyMedicalRecordRouteParams>,
  IApplicationState
>(mapStatetoProps)(ModifyMedicalRecord);
