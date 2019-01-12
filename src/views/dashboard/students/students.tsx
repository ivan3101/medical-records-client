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
import { StudentService } from "../../../services/student/student.service";
import {
  IGetAllStudentsResponse,
  IStudent
} from "../../../services/student/types";
import { IApiErrorResponse, IApiResponse } from "../../../services/types";
import { IApplicationState } from "../../../store";
import CardItem from "../components/cardItem/cardItem";

export interface IStudentsMapStateToProps {
  token: string;
}

export interface IStudentsState {
  loading: boolean;
  students: IStudent[];
  page: number;
  startIndex: string | undefined;
  currentStudents: IStudent[];
  showModal: boolean;
  modalLoading: boolean;
  modalType: string;
  modalMessage: string;
}

export type IStudentPropsType = IStudentsMapStateToProps &
  RouteComponentProps &
  ComponentProps<any>;

class Students extends Component<IStudentPropsType, IStudentsState> {
  state: IStudentsState = {
    loading: false,
    page: 1,
    students: [],
    startIndex: undefined,
    currentStudents: [],
    showModal: false,
    modalLoading: false,
    modalType: "",
    modalMessage: ""
  };

  studentService = new StudentService(this.props.token);

  async componentDidMount(): Promise<any> {
    try {
      this.setState(() => ({
        loading: true
      }));

      const { students, startIndex } = await this.fetchStudents();

      const currentStudents = students.slice(0, 9);

      this.setState(() => ({
        loading: false,
        students,
        startIndex,
        currentStudents
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

  fetchStudents = async (
    startIndex?: string
  ): Promise<IGetAllStudentsResponse> => {
    const response: AxiosResponse<
      IApiResponse<IGetAllStudentsResponse>
    > = await this.studentService.getAllStudents(startIndex);

    return response.data.data;
  };

  onChangePage = async (pageNumber: number): Promise<any> => {
    window.scrollTo(0, 0);

    this.setState(() => ({
      page: pageNumber
    }));

    this.setCurrentPatients(pageNumber);

    const {
      students: currentStudents,
      startIndex: currentStartIndex
    } = this.state;

    const totalPages = Math.ceil(currentStudents.length / 9);

    if (pageNumber >= totalPages - 2 && currentStartIndex) {
      const { students, startIndex } = await this.fetchStudents();

      this.setState(prevState => ({
        startIndex,
        students: [...prevState.students, ...students]
      }));
    }

    this.setState(() => ({ loading: false }));
  };

  setCurrentPatients = (page: number): void => {
    this.setState(() => ({
      loading: true
    }));

    const { students } = this.state;

    let currentStudents: IStudent[];

    if (page === 1) {
      currentStudents = students.slice(0, 9);
    } else {
      currentStudents = students.slice(9 * (page - 1), 9 * page);
    }

    this.setState(() => ({
      loading: false,
      currentStudents
    }));
  };

  removeStudentFromArray = (
    studentId: string,
    students: IStudent[]
  ): IStudent[] => {
    const studentIndex = students.findIndex(
      student => student._id === studentId
    );

    if (studentIndex > -1) {
      return students
        .slice(0, studentIndex)
        .concat(students.slice(studentIndex + 1));
    } else {
      return students;
    }
  };

  onDeleteStudent = (studentId: string = "") => async () => {
    try {
      if (!studentId) return;

      this.setState(() => ({
        showModal: true,
        modalLoading: true
      }));

      await this.studentService.removeStudent(studentId);

      this.setState(prevState => {
        const students = this.removeStudentFromArray(
          studentId,
          prevState.students
        );

        const currentStudents = students.slice(
          9 * (prevState.page - 1),
          9 * prevState.page
        );

        return {
          page: 1,
          students,
          currentStudents,
          modalLoading: false,
          modalType: "Estudiante eliminado con exito",
          modalMessage: "El estudiante ha sido eliminado del sistema con exito"
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

  onClickAddStudent = (): void => {
    const { history } = this.props;

    history.push("/dashboard/estudiantes/agregar");
  };

  onClickModifyStudent = (studentId: string = "") => () => {
    const { history } = this.props;

    history.push(`/dashboard/estudiantes/${studentId}`);
  };

  render() {
    const {
      loading,
      currentStudents,
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
          Estudiantes{" "}
          <Button onClick={this.onClickAddStudent}>Agregar Estudiante</Button>
        </h2>

        {loading && <Loader />}

        <CardGrid>
          {!!currentStudents.length &&
            currentStudents.map(student => (
              <CardItem key={student._id}>
                <CardContent>
                  <CardImg
                    src={profileIcon}
                    alt={"Imagen de perfil del usuario"}
                  />
                  {student.nombre + " " + student.apellido}
                </CardContent>
                <CardActions>
                  <Action onClick={this.onClickModifyStudent(student._id)}>
                    Modificar
                  </Action>
                  <Action onClick={this.onDeleteStudent(student._id)}>
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
            totalItemsCount={this.state.students.length}
            itemsCountPerPage={9}
            pageRangeDisplayed={5}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IStudentsMapStateToProps,
  {},
  IApplicationState
> = state => ({
  token: state.auth.token
});

export default connect<IStudentsMapStateToProps, {}, {}, IApplicationState>(
  mapStateToProps
)(Students);
