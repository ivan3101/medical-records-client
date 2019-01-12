import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { Component, ComponentProps } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import Button from "../../../../components/button/button";
import Container from "../../../../components/container/container";
import Loader from "../../../../components/loader/loader";
import Modal from "../../../../components/modal/modal";
import ModalBody from "../../../../components/modal/modalBody/modalBody";
import ModalHeader from "../../../../components/modal/modalHeader/modalHeader";
import { StudentService } from "../../../../services/student/student.service";
import { IApiErrorResponse } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import { TypeCedula } from "../../../login/loginStudent/components/loginForm/loginFormContainer";
import StudentForm from "../../components/studentForm/studentForm";
import {
  IStudentForm,
  IStudentFormMapStateToProps,
  studentFormInitialValues,
  StudentFormType,
  studentFormValidationSchema
} from "../addStudent/addStudent";

export interface IModifyStudentRouteParams {
  id: string;
}

export interface IModifyStudentState {
  showModal: boolean;
  modalType: string;
  modalMessage: string;
  loading: boolean;
}

export type ModifyStudentPropsTypes = StudentFormType &
  RouteComponentProps<IModifyStudentRouteParams> &
  ComponentProps<any>;

export type ModifyStudentStateTypes = IStudentForm & IModifyStudentState;

class ModifyStudent extends Component<
  ModifyStudentPropsTypes,
  ModifyStudentStateTypes
> {
  state: ModifyStudentStateTypes = {
    ...studentFormInitialValues,
    showModal: false,
    modalType: "",
    modalMessage: "",
    loading: false
  };

  studentService = new StudentService(this.props.token);

  async componentDidMount(): Promise<any> {
    this.setState(() => ({
      loading: true
    }));

    try {
      const { id: studentId } = this.props.match.params;

      if (studentId) {
        const response = await this.studentService.getStudentById(studentId);

        const { cedula, telefono } = response.data.data.estudiante;

        this.setState(() => ({
          ...response.data.data.estudiante,
          cedula: {
            type: cedula.split("-")[0] as TypeCedula,
            number: cedula.split("-")[1]
          },
          telefono: {
            prefix: telefono.split("-")[0],
            number: telefono.split("-")[1]
          },
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

    history.replace("/dashboard/estudiantes");
  };

  onClickReturn = () => {
    const { history } = this.props;

    history.push("/dashboard/estudiantes");
  };

  render() {
    const { showModal, modalType, modalMessage, loading } = this.state;

    return (
      <React.Fragment>
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
          <h2>Modificar Estudiante</h2>

          {loading ? (
            <Loader />
          ) : (
            <Formik
              enableReinitialize={true}
              initialValues={this.state}
              validationSchema={studentFormValidationSchema}
              onSubmit={async (values, formikActions) => {
                window.scrollTo(0, 0);

                formikActions.setSubmitting(true);
                formikActions.setStatus({});

                try {
                  const { id: studentId } = this.props.match.params;

                  const cedula = `${values.cedula.type}-${
                    values.cedula.number
                  }`;
                  const telefono = `${values.telefono.prefix}-${
                    values.telefono.number
                  }`;

                  await this.studentService.modifyStudent({
                    studentId,
                    estudiante: {
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
                    success: "El estudiante ha sido modificado con exito"
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
              component={StudentForm}
            />
          )}
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IStudentFormMapStateToProps,
  {},
  IApplicationState
> = state => ({
  token: state.auth.token
});

export default connect<IStudentFormMapStateToProps, {}, {}, IApplicationState>(
  mapStateToProps
)(ModifyStudent);
