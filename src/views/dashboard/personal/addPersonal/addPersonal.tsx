import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { Component, ComponentProps, Fragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { object, string } from "yup";
import Button from "../../../../components/button/button";
import Container from "../../../../components/container/container";
import { PersonalService } from "../../../../services/personal/personal.service";
import { IApiErrorResponse } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import { UserRole } from "../../../../store/auth/types";
import { TypeCedula } from "../../../login/loginStudent/components/loginForm/loginFormContainer";
import PersonalForm from "../../components/personalForm/personalForm";

export interface IPersonalFormMapStateToProps {
  token: string;
}

export interface IPersonalForm {
  nombre: string;
  apellido: string;
  email: string;
  cedula: {
    type: TypeCedula;
    number: string;
  };
  telefono: {
    prefix: string;
    number: string;
  };
  nombreDeUsuario: string;
  contraseña: string;
  rol: UserRole.PROFESSOR | UserRole.ARCHIVE;
}

export type PersonaltFormType = IPersonalFormMapStateToProps &
  RouteComponentProps &
  ComponentProps<any>;

export const personalFormInitialValues: IPersonalForm = {
  nombre: "",
  apellido: "",
  cedula: {
    number: "",
    type: TypeCedula.V
  },
  email: "",
  telefono: {
    number: "",
    prefix: ""
  },
  contraseña: "",
  nombreDeUsuario: "",
  rol: UserRole.PROFESSOR
};

export const personalFormValidationSchema = object().shape({
  nombre: string()
    .trim()
    .required("Debe ingresar el nombre del miembro del personal")
    .matches(/^[a-zA-Z\s]+$/, {
      excludeEmptyString: true,
      message: "Solo puede ingresar letras y espacios"
    }),
  apellido: string()
    .trim()
    .required("Debe ingresar el apellido del miembro del personal")
    .matches(/^[a-zA-Z\s]+$/, {
      excludeEmptyString: true,
      message: "Solo puede ingresar letras y espacios"
    }),
  email: string()
    .required("Debe ingresar el correo electronico del miembro del personal")
    .email("Debe ingresar un correo electronico valido"),
  cedula: object().shape({
    number: string()
      .trim()
      .required("Debe ingresar el numero de cedula del miembro del personal")
      .matches(/^([0-9]{7,10})$/, {
        excludeEmptyString: true,
        message: "El numero de cedula es invalido"
      }),
    type: string()
      .trim()
      .required("Debe seleccionar el tipo de cedula del miembro del personal")
      .matches(/^([VEJPG])$/, {
        excludeEmptyString: true,
        message: "El tipo de cedula seleccionado es invalido"
      })
  }),
  telefono: object().shape({
    prefix: string()
      .trim()
      .required(
        "Debe ingresar el prefijo del numero de telefono del miembro del personal"
      )
      .min(4, "El prefijo debe contener 4 digitos")
      .max(4, "El prefijo debe contener 4 digitos")
      .matches(/^([0-9]{4})$/, {
        excludeEmptyString: true,
        message: "El prefijo ingresado no es valido"
      }),
    number: string()
      .trim()
      .required("Debe ingresar el numero de telefono del miembro del personal")
      .min(7, "El numero debe contener 7 digitos")
      .max(7, "El numero debe contener 7 digitos")
      .matches(/^([0-9]{7}$)/, {
        excludeEmptyString: true,
        message: "El numero de telefono ingresado no es valido"
      })
  }),
  nombreDeUsuario: string()
    .trim()
    .required("Debe ingresar el nombre de usuario del miembro del personal")
    .matches(/^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,}[a-zA-Z0-9]$/, {
      message:
        "El nombre de usuario debe tener un minimo de 9 caracteres. Puede contener letras, puntos (.) y" +
        " guiones bajos (_), ademas debe comenzar por una letra"
    }),
  contraseña: string()
    .trim()
    .required("Debe ingresar la contraseña del miembro del personal")
    .matches(/^(?=.{6,}$)(?![0-9!#$.,])[a-zA-Z0-9!#$.,]+$/, {
      message:
        "La contraseña debe tener un minimo de 6 caracteres. Puede contener letras, numeros y los siguientes" +
        " caracteres especiales (, . # $ !)"
    }),
  rol: string()
    .trim()
    .required("Debe ingresar el tipo de usuario")
    .oneOf([UserRole.PROFESSOR, UserRole.ARCHIVE])
});

class AddPersonal extends Component<PersonaltFormType> {
  personalService = new PersonalService(this.props.token);

  onClickReturn = () => {
    const { history } = this.props;

    history.push("/dashboard/personal");
  };

  render() {
    return (
      <Fragment>
        <Button onClick={this.onClickReturn}>Regresar</Button>

        <Container>
          <h2>Agregar Miembro del Personal</h2>
          <Formik
            initialValues={personalFormInitialValues}
            validationSchema={personalFormValidationSchema}
            onSubmit={async (values, formikActions) => {
              window.scrollTo(0, 0);

              formikActions.setSubmitting(true);
              formikActions.setStatus({});

              try {
                const cedula = `${values.cedula.type}-${values.cedula.number}`;
                const telefono = `${values.telefono.prefix}-${
                  values.telefono.number
                }`;

                const response = await this.personalService.addPersonal({
                  personal: {
                    ...values,
                    cedula,
                    telefono
                  }
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
            component={PersonalForm}
          />
        </Container>
      </Fragment>
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
)(AddPersonal);
