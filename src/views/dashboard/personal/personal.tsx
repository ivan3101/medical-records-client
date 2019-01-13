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
import Modal from "../../../components/modal/modal";
import ModalBody from "../../../components/modal/modalBody/modalBody";
import ModalHeader from "../../../components/modal/modalHeader/modalHeader";
import Pagination from "../../../components/pagination/pagination";
import { PersonalService } from "../../../services/personal/personal.service";
import {
  IGetAllPersonalsResponse,
  IPersonal
} from "../../../services/personal/types";
import { IApiErrorResponse } from "../../../services/types";
import { IApplicationState } from "../../../store";
import CardItem from "../components/cardItem/cardItem";
import Loader from "../patients/patients";

export interface IPersonalMapStateToProps {
  token: string;
}

export interface IPersonalState {
  loading: boolean;
  personals: IPersonal[];
  page: number;
  startIndex: string | undefined;
  currentPersonal: IPersonal[];
  showModal: boolean;
  modalLoading: boolean;
  modalType: string;
  modalMessage: string;
}

export type PersonalPropsType = IPersonalMapStateToProps &
  RouteComponentProps &
  ComponentProps<any>;

class Personal extends Component<PersonalPropsType, IPersonalState> {
  state: IPersonalState = {
    currentPersonal: [],
    loading: false,
    page: 1,
    personals: [],
    startIndex: undefined,
    showModal: false,
    modalLoading: false,
    modalType: "",
    modalMessage: ""
  };

  personalService = new PersonalService(this.props.token);

  async componentDidMount(): Promise<any> {
    try {
      this.setState(() => ({
        loading: true
      }));

      const { personals, startIndex } = await this.fetchPersonal();

      const currentPersonal = personals.slice(0, 9);

      this.setState(() => ({
        currentPersonal,
        loading: false,
        startIndex,
        personals
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

  fetchPersonal = async (
    startIndex?: string
  ): Promise<IGetAllPersonalsResponse> => {
    const response = await this.personalService.getAllPersonals(startIndex);

    return response.data.data;
  };

  setCurrentPersonal = (page: number): void => {
    const { personals } = this.state;

    let currentPersonal: IPersonal[];

    if (page === 1) {
      currentPersonal = personals.slice(0, 9);
    } else {
      currentPersonal = personals.slice(9 * (page - 1), 9 * page);
    }

    this.setState(() => ({
      currentPersonal
    }));
  };

  onChangePage = async (pageNumber: number): Promise<any> => {
    window.scrollTo(0, 0);

    this.setState(() => ({
      page: pageNumber,
      loading: true
    }));

    this.setCurrentPersonal(pageNumber);

    const {
      personals: currentPersonal,
      startIndex: currentStartIndex
    } = this.state;

    const totalPages = Math.ceil(currentPersonal.length / 9);

    if (pageNumber >= totalPages - 2 && currentStartIndex) {
      const { personals, startIndex } = await this.fetchPersonal();

      this.setState(prevState => ({
        startIndex,
        personals: [...prevState.personals, ...personals]
      }));
    }

    this.setState(() => ({
      loading: false
    }));
  };

  removeStudentFromArray = (
    personalId: string,
    personals: IPersonal[]
  ): IPersonal[] => {
    const personalIndex = personals.findIndex(
      personal => personal._id === personalId
    );

    if (personalIndex > -1) {
      return personals
        .slice(0, personalIndex)
        .concat(personals.slice(personalIndex + 1));
    } else {
      return personals;
    }
  };

  onDeletePersonal = (personalId: string = "") => async () => {
    try {
      if (!personalId) return;

      this.setState(() => ({
        showModal: true,
        modalLoading: true
      }));

      await this.personalService.removePersonal(personalId);

      this.setState(prevState => {
        const personals = this.removeStudentFromArray(
          personalId,
          prevState.personals
        );

        const currentPersonal = personals.slice(
          9 * (prevState.page - 1),
          9 * prevState.page
        );

        return {
          page: 1,
          personals,
          currentPersonal,
          modalLoading: false,
          modalType: "Miembro del Personal eliminado con exito",
          modalMessage:
            "El Miembro del Personal ha sido eliminado del sistema con exito"
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

  onClickAddPersonal = (): void => {
    const { history } = this.props;

    history.push("/dashboard/personal/agregar");
  };

  onClickModifyPersonal = (personalId: string = "") => () => {
    const { history } = this.props;

    history.push(`/dashboard/personal/${personalId}`);
  };

  render() {
    const {
      loading,
      currentPersonal,
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
          Personal
          <Button onClick={this.onClickAddPersonal}>
            Agregar Miembro del Personal
          </Button>
        </h2>

        {loading && <Loader />}

        {!currentPersonal.length && !loading && (
          <h3>No se encontro ningún mimebro del personal</h3>
        )}

        <CardGrid>
          {!!currentPersonal.length &&
            currentPersonal.map(personal => (
              <CardItem key={personal._id}>
                <CardContent>
                  <CardImg
                    src={profileIcon}
                    alt={"Imagen de perfil del usuario"}
                  />
                  {personal.nombre + " " + personal.apellido}
                </CardContent>
                <CardActions>
                  <Action onClick={this.onClickModifyPersonal(personal._id)}>
                    Modificar
                  </Action>
                  <Action onClick={this.onDeletePersonal(personal._id)}>
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
            totalItemsCount={this.state.personals.length}
            itemsCountPerPage={9}
            pageRangeDisplayed={5}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IPersonalMapStateToProps,
  {},
  IApplicationState
> = state => ({
  token: state.auth.token
});

export default connect<IPersonalMapStateToProps, {}, {}, IApplicationState>(
  mapStateToProps
)(Personal);
