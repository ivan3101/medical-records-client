import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { Component, ComponentProps, Fragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { object, string } from "yup";
import Button from "../../../../components/button/button";
import Container from "../../../../components/container/container";
import { StudentService } from "../../../../services/student/student.service";
import { IApiErrorResponse } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import { TypeCedula } from "../../../login/loginStudent/components/loginForm/loginFormContainer";
import StudentForm from "../../components/studentForm/studentForm";

export interface IStudentFormMapStateToProps {
  token: string;
}

export interface IStudentForm {
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
}

export type StudentFormType = IStudentFormMapStateToProps &
  RouteComponentProps &
  ComponentProps<any>;

export const studentFormInitialValues: IStudentForm = {
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
  }
};

export const studentFormValidationSchema = object().shape({
  nombre: string()
    .trim()
    .required("Debe ingresar el nombre del estudiante")
    .matches(/^[a-zA-Z\s]+$/, {
      excludeEmptyString: true,
      message: "Solo puede ingresar letras y espacios"
    }),
  apellido: string()
    .trim()
    .required("Debe ingresar el apellido del estudiante")
    .matches(/^[a-zA-Z\s]+$/, {
      excludeEmptyString: true,
      message: "Solo puede ingresar letras y espacios"
    }),
  email: string()
    .required("Debe ingresar el correo electronico del estudiante")
    .email("Debe ingresar un correo electronico valido"),
  cedula: object().shape({
    number: string()
      .trim()
      .required("Debe ingresar el numero de cedula del estudiante")
      .matches(/^([0-9]{7,10})$/, {
        excludeEmptyString: true,
        message: "El numero de cedula es invalido"
      }),
    type: string()
      .trim()
      .required("Debe seleccionar el tipo de cedula del estudiante")
      .matches(/^([VEJPG])$/, {
        excludeEmptyString: true,
        message: "El tipo de cedula seleccionado es invalido"
      })
  }),
  telefono: object().shape({
    prefix: string()
      .trim()
      .required(
        "Debe ingresar el prefijo del numero de telefono del estudiante"
      )
      .min(4, "El prefijo debe contener 4 digitos")
      .max(4, "El prefijo debe contener 4 digitos")
      .matches(/^([0-9]{4})$/, {
        excludeEmptyString: true,
        message: "El prefijo ingresado no es valido"
      }),
    number: string()
      .trim()
      .required("Debe ingresar el numero de telefono del estudiante")
      .min(7, "El numero debe contener 7 digitos")
      .max(7, "El numero debe contener 7 digitos")
      .matches(/^([0-9]{7}$)/, {
        excludeEmptyString: true,
        message: "El numero de telefono ingresado no es valido"
      })
  })
});

class AddStudent extends Component<StudentFormType> {
  studentService = new StudentService(this.props.token);

  onClickReturn = () => {
    const { history } = this.props;

    history.push("/dashboard/estudiantes");
  };

  render() {
    return (
      <Fragment>
        <Button onClick={this.onClickReturn}>Regresar</Button>

        <Container>
          <h2>Agregar Estudiante</h2>
          <Formik
            initialValues={studentFormInitialValues}
            validationSchema={studentFormValidationSchema}
            onSubmit={async (values, formikActions) => {
              window.scrollTo(0, 0);

              formikActions.setSubmitting(true);
              formikActions.setStatus({});

              try {
                const cedula = `${values.cedula.type}-${values.cedula.number}`;
                const telefono = `${values.telefono.prefix}-${
                  values.telefono.number
                }`;

                const response = await this.studentService.addStudent({
                  estudiante: {
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
            component={StudentForm}
          />
        </Container>
      </Fragment>
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
)(AddStudent);
