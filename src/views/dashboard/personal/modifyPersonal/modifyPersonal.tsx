import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { Component, ComponentProps } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { string } from "yup";
import Button from "../../../../components/button/button";
import Container from "../../../../components/container/container";
import Loader from "../../../../components/loader/loader";
import Modal from "../../../../components/modal/modal";
import ModalBody from "../../../../components/modal/modalBody/modalBody";
import ModalHeader from "../../../../components/modal/modalHeader/modalHeader";
import { PersonalService } from "../../../../services/personal/personal.service";
import { IApiErrorResponse } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import { TypeCedula } from "../../../login/loginStudent/components/loginForm/loginFormContainer";
import PersonalForm from "../../components/personalForm/personalForm";
import {
  IPersonalForm,
  IPersonalFormMapStateToProps,
  personalFormInitialValues,
  personalFormValidationSchema,
  PersonaltFormType
} from "../addPersonal/addPersonal";

export interface IModifyPersonalRouteParams {
  id: string;
}

export interface IModifyPersonalState {
  showModal: boolean;
  modalType: string;
  modalMessage: string;
  loading: boolean;
}

export type ModifyPersonalPropsTypes = PersonaltFormType &
  RouteComponentProps<IModifyPersonalRouteParams> &
  ComponentProps<any>;

export type ModifyPersonalStateTypes = IPersonalForm & IModifyPersonalState;

class ModifyPersonal extends Component<
  ModifyPersonalPropsTypes,
  ModifyPersonalStateTypes
> {
  state: ModifyPersonalStateTypes = {
    ...personalFormInitialValues,
    showModal: false,
    modalType: "",
    modalMessage: "",
    loading: false
  };

  personalService = new PersonalService(this.props.token);

  async componentDidMount(): Promise<any> {
    this.setState(() => ({
      loading: true
    }));

    try {
      const { id: personalId } = this.props.match.params;

      if (personalId) {
        const response = await this.personalService.getPersonalById(personalId);

        const { cedula, telefono } = response.data.data.personal;

        this.setState(() => ({
          ...response.data.data.personal,
          cedula: {
            type: cedula.split("-")[0] as TypeCedula,
            number: cedula.split("-")[1]
          },
          telefono: {
            prefix: telefono.split("-")[0],
            number: telefono.split("-")[1]
          },
          contraseña: "",
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

    history.replace("/dashboard/personal");
  };

  onClickReturn = () => {
    const { history } = this.props;

    history.push("/dashboard/personal");
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
          <h2>Modificar Miembro del Personal</h2>

          {loading ? (
            <Loader />
          ) : (
            <Formik
              enableReinitialize={true}
              initialValues={this.state}
              validationSchema={personalFormValidationSchema.clone().shape({
                contraseña: string().matches(
                  /^(?=.{6,}$)(?![0-9!#$.,])[a-zA-Z0-9!#$.,]+$/,
                  {
                    message:
                      "La contraseña debe tener un minimo de 6 caracteres. Puede contener letras, numeros y los siguientes" +
                      " caracteres especiales (, . # $ !)"
                  }
                )
              })}
              onSubmit={async (values, formikActions) => {
                window.scrollTo(0, 0);

                formikActions.setSubmitting(true);
                formikActions.setStatus({});

                try {
                  const { id: personalId } = this.props.match.params;

                  const cedula = `${values.cedula.type}-${
                    values.cedula.number
                  }`;
                  const telefono = `${values.telefono.prefix}-${
                    values.telefono.number
                  }`;

                  await this.personalService.modifyPersonal({
                    personalId,
                    personal: {
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
                    success:
                      "El miembro del personal ha sido modificado con exito"
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
              component={PersonalForm}
            />
          )}
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IPersonalFormMapStateToProps,
  {},
  IApplicationState
> = state => ({
  token: state.auth.token
});

export default connect<IPersonalFormMapStateToProps, {}, {}, IApplicationState>(
  mapStateToProps
)(ModifyPersonal);
