import { AxiosError, AxiosResponse } from "axios";
import React, { Component, ComponentProps } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import profileIcon from "../../../assets/icons/user.png";
import Button from "../../../components/button/button";
import Action from "../../../components/card/action/action";
import CardActions from "../../../components/card/cardActions/cardActions";
import CardContent from "../../../components/card/cardContent/cardContent";
import CardImg from "../../../components/card/cardImg/cardImg";
import CardGrid from "../../../components/cardGrid/cardGrid";
import Loader from "../../../components/loader/loader";
import Modal from "../../../components/modal/modal";
import ModalBody from "../../../components/modal/modalBody/modalBody";
import ModalHeader from "../../../components/modal/modalHeader/modalHeader";
import Pagination from "../../../components/pagination/pagination";
import { PatientService } from "../../../services/patient/patient.service";
import { IGetAllPatientsResponse } from "../../../services/patient/types";
import {
  IApiErrorResponse,
  IApiResponse,
  IPatient
} from "../../../services/types";
import { IApplicationState } from "../../../store";
import CardItem from "../components/cardItem/cardItem";

export interface IPatientsMapStateToProps {
  token: string;
}

export interface IPatientsState {
  loading: boolean;
  patients: IPatient[];
  page: number;
  startIndex: string | undefined;
  currentPatients: IPatient[];
  showModal: boolean;
  modalLoading: boolean;
  modalType: string;
  modalMessage: string;
}

export type IPatientPropsType = IPatientsMapStateToProps &
  RouteComponentProps &
  ComponentProps<any>;

class Patients extends Component<IPatientPropsType, IPatientsState> {
  state: IPatientsState = {
    loading: false,
    page: 1,
    patients: [],
    startIndex: undefined,
    currentPatients: [],
    showModal: false,
    modalLoading: false,
    modalType: "",
    modalMessage: ""
  };

  patientService = new PatientService(this.props.token);

  async componentDidMount(): Promise<any> {
    try {
      this.setState(() => ({
        loading: true
      }));

      const { patients, startIndex } = await this.fetchPatients();

      const currentPatients = patients.slice(0, 9);

      this.setState(() => ({
        loading: false,
        patients,
        startIndex,
        currentPatients
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
      modalMessage
    }));
  };

  fetchPatients = async (
    startIndex?: string
  ): Promise<IGetAllPatientsResponse> => {
    const response: AxiosResponse<
      IApiResponse<IGetAllPatientsResponse>
    > = await this.patientService.getAllPatients(startIndex);

    return response.data.data;
  };

  onChangePage = async (pageNumber: number): Promise<any> => {
    window.scrollTo(0, 0);

    this.setState(() => ({
      page: pageNumber,
      loading: true
    }));

    this.setCurrentPatients(pageNumber);

    const {
      patients: currentPatients,
      startIndex: currentStartIndex
    } = this.state;

    const totalPages = Math.ceil(currentPatients.length / 9);

    if (pageNumber >= totalPages - 2 && currentStartIndex) {
      const { patients, startIndex } = await this.fetchPatients();

      this.setState(prevState => ({
        startIndex,
        patients: [...prevState.patients, ...patients]
      }));
    }

    this.setState(() => ({ loading: false }));
  };

  setCurrentPatients = (page: number): void => {
    this.setState(() => ({
      loading: true
    }));

    const { patients } = this.state;

    let currentPatients: IPatient[];

    currentPatients = patients.slice(9 * (page - 1), 9 * page);

    this.setState(() => ({
      loading: false,
      currentPatients
    }));
  };

  removePatientFromArray = (
    patientId: string,
    patients: IPatient[]
  ): IPatient[] => {
    const patientIndex = patients.findIndex(
      patient => patient._id === patientId
    );

    if (patientIndex > -1) {
      return patients
        .slice(0, patientIndex)
        .concat(patients.slice(patientIndex + 1));
    } else {
      return patients;
    }
  };

  onDeletePatient = (patientId: string = "") => async () => {
    try {
      if (!patientId) return;

      this.setState(() => ({
        showModal: true,
        modalLoading: true
      }));

      await this.patientService.removePatient(patientId);

      this.setState(prevState => {
        const patients = this.removePatientFromArray(
          patientId,
          prevState.patients
        );

        const currentPatients = patients.slice(
          9 * (prevState.page - 1),
          9 * prevState.page
        );

        return {
          page: 1,
          patients,
          currentPatients,
          modalLoading: false,
          modalType: "Paciente eliminado con exito",
          modalMessage: "El paciente ha sido eliminado del sistema con exito"
        };
      });
    } catch (error) {
      this.fetchError(error);
    }
  };

  onCloseModal = (): void => {
    this.setState(() => ({
      showModal: false,
      modalType: "",
      modalMessage: ""
    }));
  };

  onClickAddPatient = (): void => {
    const { history } = this.props;

    history.push("/dashboard/pacientes/agregar");
  };

  onClickModifyPatient = (patientId: string = "") => () => {
    const { history } = this.props;

    history.push(`/dashboard/pacientes/${patientId}`);
  };

  render() {
    const {
      loading,
      currentPatients,
      showModal,
      modalLoading,
      modalType,
      modalMessage
    } = this.state;

    return (
      <React.Fragment>
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

        <h2>
          Pacientes{" "}
          <Button onClick={this.onClickAddPatient}>Agregar Paciente</Button>
        </h2>

        {loading && <Loader />}

        <CardGrid>
          {!!currentPatients.length &&
            currentPatients.map(patient => (
              <CardItem key={patient._id}>
                <CardContent>
                  <CardImg
                    src={profileIcon}
                    alt="Imagen de perfil del usuario"
                  />
                  {patient.nombre + " " + patient.apellido}
                </CardContent>
                <CardActions>
                  <Action onClick={this.onClickModifyPatient(patient._id)}>
                    Modificar
                  </Action>
                  <Action onClick={this.onDeletePatient(patient._id)}>
                    Eliminar
                  </Action>
                </CardActions>
              </CardItem>
            ))}
        </CardGrid>
        {!loading && (
          <Pagination
            activePage={this.state.page}
            onChange={this.onChangePage}
            totalItemsCount={this.state.patients.length}
            itemsCountPerPage={9}
            pageRangeDisplayed={5}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IPatientsMapStateToProps,
  {},
  IApplicationState
> = state => ({
  token: state.auth.token
});

export default connect<IPatientsMapStateToProps, {}, {}, IApplicationState>(
  mapStateToProps
)(Patients);
