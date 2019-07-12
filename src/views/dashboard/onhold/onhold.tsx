import { AxiosError, AxiosResponse } from "axios";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";
import React, { Component, Fragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import Button from "../../../components/button/button";
import CardList from "../../../components/cardList/cardList";
import CardListTitle from "../../../components/cardList/cardListTitle/cardListTitle";
import Loader from "../../../components/loader/loader";
import Modal from "../../../components/modal/modal";
import ModalBody from "../../../components/modal/modalBody/modalBody";
import ModalHeader from "../../../components/modal/modalHeader/modalHeader";
import OnholdElem from "../../../components/onholdElem/onholdElem";
import { OnholdService } from "../../../services/onhold/onhold.service";
import { IOnhold } from "../../../services/onhold/types";
import { IStudent } from "../../../services/student/types";
import {
  IApiErrorResponse,
  IMedicalRecord,
  IPatient,
  ITriage
} from "../../../services/types";
import { IApplicationState } from "../../../store";
import { Buttons } from "../patients/adminMedicalRecordContainer/adminMedicalRecordContainer";

const publicUrl = process.env.REACT_APP_PUBLIC_URL;

export interface IOnholdMapStateToProps {
  token: string;
  professorId: string;
}

export interface IOnholdState {
  onholds: IOnhold[];
  loading: boolean;
  showModal: boolean;
  modalLoading: boolean;
  modalType: string;
  modalMessage: string;
}

class Onhold extends Component<
  IOnholdMapStateToProps & RouteComponentProps,
  IOnholdState
> {
  state: IOnholdState = {
    onholds: [],
    loading: false,
    modalLoading: false,
    modalMessage: "",
    modalType: "",
    showModal: false
  };

  onholdService = new OnholdService(this.props.token);

  async componentDidMount(): Promise<void> {
    try {
      this.setState(() => ({
        loading: true
      }));

      const { professorId } = this.props;

      const response = await this.onholdService.getOnHoldsByProfessor(
        professorId
      );

      const { enEspera } = response.data.data;

      this.setState(() => ({
        loading: false,
        onholds: enEspera
      }));
    } catch (error) {
      this.fetchError(error);
    }
  }

  fetchError = (error: AxiosError): void => {
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
      modalMessage,
      loading: false
    }));
  };

  onCloseModal = (): void => {
    this.setState(() => ({
      showModal: false,
      modalType: "",
      modalMessage: ""
    }));
  };

  onApprove = async (onholdId: string): Promise<void> => {
    const { professorId } = this.props;
    const { onholds } = this.state;

    const response = await this.onholdService.approveOnHold(
      onholdId,
      professorId
    );

    const newOnholds = onholds.filter(onhold => onhold._id !== onholdId);

    this.setState(() => ({
      showModal: true,
      modalType: "Exito",
      modalMessage: "El documento en espera ha sido aprobado con exito",
      onholds: newOnholds
    }));
  };

  onReject = async (onholdId: string): Promise<void> => {
    const { professorId } = this.props;
    const { onholds } = this.state;

    const responpse = await this.onholdService.rejectOnHold(
      onholdId,
      professorId
    );

    const newOnholds = onholds.filter(onhold => onhold._id !== onholdId);

    this.setState(() => ({
      showModal: true,
      modalType: "Exito",
      modalMessage: "El documento en espera ha sido rechazado con exito",
      onholds: newOnholds
    }));
  };

  onClickShowMedicalRecord = (patientId: string) => () => {
    const { history } = this.props;

    history.push(`/dashboard/revision/${patientId}`);
  };

  render() {
    const {
      loading,
      onholds,
      showModal,
      modalLoading,
      modalType,
      modalMessage
    } = this.state;

    return (
      <Fragment>
        <Modal show={showModal} closeCb={this.onCloseModal}>
          {modalLoading ? (
            <Loader />
          ) : (
            <React.Fragment>
              <ModalHeader>
                <h1>{modalType}</h1>
              </ModalHeader>
              <ModalBody>
                <p>{modalMessage}</p>
              </ModalBody>
            </React.Fragment>
          )}
        </Modal>

        <h2>En espera de corrección</h2>

        {loading && <Loader />}

        {!onholds.length && !loading && (
          <h3>No se encontro ningun documento en espera de corrección</h3>
        )}

        {!!onholds.length &&
          onholds.map((onhold: IOnhold) => {
            const patient = onhold.paciente as IPatient;
            const student = onhold.estudiante as IStudent;
            const document = new Map(Object.entries(onhold.documento));

            const odontodiagrama = document.get("odontodiagrama");
            const periodontodiagrama = document.get("periodontodiagrama");
            const placa = document.get("registroDeControlDePlaca");

            if (odontodiagrama) {
              document.delete("odontodiagrama");
            }

            if (periodontodiagrama) {
              document.delete("periodontodiagrama");
            }

            if (placa) {
              document.delete("registroDeControlPlaca");
            }

            const rows = [];

            for (const [key, value] of document.entries()) {
              if (typeof value === "object" && value.length > 0) {
                rows.push(
                  <div style={{ marginBottom: "15px" }}>
                    <CardListTitle>{key}</CardListTitle>
                    {value.join(", ")}
                  </div>
                );
              } else if (typeof value === "string") {
                rows.push(
                  <div style={{ marginBottom: "15px" }}>
                    <CardListTitle>{key}</CardListTitle>
                    {value}
                  </div>
                );
              } else if (typeof value === "object") {
                rows.push(<CardList elements={value} />);
              }
            }

            return (
              <OnholdElem
                title={`Paciente ${patient.nombre} ${
                  patient.apellido
                } / Estudiante ${student.nombre} ${student.apellido} / ${
                  onhold.tipo
                } / ${format(
                  new Date(onhold.fechaDeCreacion),
                  "DD [de] MMMM [de] YYYY",
                  { locale: esLocale }
                )}`}
                key={onhold._id}
              >
                <Buttons>
                  <Button onClick={this.onClickShowMedicalRecord(patient._id!)}>
                    Ver Historia Clinica
                  </Button>
                  <Button onClick={() => this.onApprove(onhold._id!)}>
                    Aprobar
                  </Button>
                  <Button onClick={() => this.onReject(onhold._id!)}>
                    Rechazar
                  </Button>
                </Buttons>
                {rows}
                {!!odontodiagrama && (
                  <div>
                    <p>Odontodiagrama</p>
                    <img
                      src={`${publicUrl}/${odontodiagrama}`}
                      alt="odontodiagrama"
                    />
                  </div>
                )}
                {!!periodontodiagrama && (
                  <div>
                    <p>Periodontodiagrama</p>
                    <img
                      src={`${publicUrl}/${periodontodiagrama}`}
                      alt="periodontodiagrama"
                    />
                  </div>
                )}
                {!!placa && (
                  <div>
                    <p>Registro de control de Placa</p>
                    <img
                      src={`${publicUrl}/${placa}`}
                      alt="Registro De Control De Placa"
                    />
                  </div>
                )}
              </OnholdElem>
            );
          })}
      </Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IOnholdMapStateToProps,
  {},
  IApplicationState
> = state => ({
  token: state.auth.token,
  professorId: state.auth.user!.id
});

export default connect(mapStateToProps)(Onhold);
