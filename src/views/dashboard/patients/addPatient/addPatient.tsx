import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React, { ComponentProps, Fragment, FunctionComponent } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { date, mixed, number, object, string } from "yup";
import Button from "../../../../components/button/button";
import Container from "../../../../components/container/container";
import { PatientService } from "../../../../services/patient/patient.service";
import { IApiErrorResponse } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import { TypeCedula } from "../../../login/loginStudent/components/loginForm/loginFormContainer";
import PatientForm from "../../components/patientForm/patientForm";

export enum Gender {
  MALE = "Masculino",
  FEMALE = "Femenino"
}

export interface IPatientForm {
  nombre: string;
  apellido: string;
  email: string;
  cedula: {
    type: TypeCedula;
    number: string;
  };
  direccion: string;
  edad: number;
  fechaDeNacimiento: Date;
  genero: Gender;
  lugarDeNacimiento: string;
  telefono: {
    prefix: string;
    number: string;
  };
}

export interface IPatientFormMapStateToProps {
  token: string;
}

export type IPatientFormTypes = IPatientFormMapStateToProps &
  RouteComponentProps &
  ComponentProps<any>;

export const initialValues: IPatientForm = {
  apellido: "",
  cedula: {
    number: "",
    type: TypeCedula.V
  },
  direccion: "",
  email: "",
  edad: 0,
  fechaDeNacimiento: new Date(),
  genero: Gender.MALE,
  lugarDeNacimiento: "",
  nombre: "",
  telefono: {
    number: "",
    prefix: ""
  }
};

export const validationSchema = object().shape({
  nombre: string()
    .trim()
    .required("Debe ingresar el nombre del paciente")
    .matches(/^[a-zA-Z\s]+$/, {
      excludeEmptyString: true,
      message: "Solo puede ingresar letras y espacios"
    }),
  apellido: string()
    .trim()
    .required("Debe ingresar el apellido del paciente")
    .matches(/^[a-zA-Z\s]+$/, {
      excludeEmptyString: true,
      message: "Solo puede ingresar letras y espacios"
    }),
  email: string()
    .required("Debe ingresar el correo electronico del paciente")
    .email("Debe ingresar un correo electronico valido"),
  genero: mixed()
    .required("Debe seleccionar su genero")
    .oneOf([Gender.MALE, Gender.FEMALE], "Debe seleccionar un genero valido"),
  cedula: object().shape({
    number: string()
      .trim()
      .required("Debe ingresar el numero de cedula del paciente")
      .matches(/^([0-9]{7,10})$/, {
        excludeEmptyString: true,
        message: "El numero de cedula es invalido"
      }),
    type: string()
      .trim()
      .required("Debe seleccionar el tipo de cedula del paciente")
      .matches(/^([VEJPG])$/, {
        excludeEmptyString: true,
        message: "El tipo de cedula seleccionado es invalido"
      })
  }),
  lugarDeNacimiento: string()
    .trim()
    .required("Debe ingresar el lugar de nacimiento del paciente")
    .matches(/^[a-zA-Z\s]+$/, {
      excludeEmptyString: true,
      message: "Solo puede ingresar letras y espacios"
    }),
  edad: number()
    .required()
    .moreThan(1),
  direccion: string()
    .trim()
    .required("Debe ingresar la dirección de vivienda del paciente")
    .matches(/[a-zA-Z0-9.\s]/, {
      excludeEmptyString: true,
      message: "Solo puede ingresar letras, numeros, puntos y espacios"
    }),
  telefono: object().shape({
    prefix: string()
      .trim()
      .required("Debe ingresar el prefijo del numero de telefono del paciente")
      .min(4, "El prefijo debe contener 4 digitos")
      .max(4, "El prefijo debe contener 4 digitos")
      .matches(/^([0-9]{4})$/, {
        excludeEmptyString: true,
        message: "El prefijo ingresado no es valido"
      }),
    number: string()
      .trim()
      .required("Debe ingresar el numero de telefono paciente")
      .min(7, "El numero debe contener 7 digitos")
      .max(7, "El numero debe contener 7 digitos")
      .matches(/^([0-9]{7}$)/, {
        excludeEmptyString: true,
        message: "El numero de telefono ingresado no es valido"
      })
  }),
  fechaDeNacimiento: date()
    .required("Debe ingresar la fecha de nacimiento del paciente")
    .max(new Date(), "No puede ingresar una fecha mayor a la actual")
});

const AddPatient: FunctionComponent<IPatientFormTypes> = ({
  token,
  history
}) => {
  const patientService = new PatientService(token);

  const onClickReturn = () => {
    history.push("/dashboard/pacientes");
  };

  return (
    <Fragment>
      <Button onClick={onClickReturn}>Regresar</Button>

      <Container>
        <h2>Agregar Paciente</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, formikActions) => {
            window.scrollTo(0, 0);

            formikActions.setSubmitting(true);
            formikActions.setStatus({});

            try {
              const cedula = `${values.cedula.type}-${values.cedula.number}`;
              const telefono = `${values.telefono.prefix}-${
                values.telefono.number
              }`;

              const response = await patientService.addPatient({
                paciente: {
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
          component={PatientForm}
        />
      </Container>
    </Fragment>
  );
};

const mapStateToProps: MapStateToProps<
  IPatientFormMapStateToProps,
  {},
  IApplicationState
> = state => ({
  token: state.auth.token
});

export default connect<IPatientFormMapStateToProps, {}, {}, IApplicationState>(
  mapStateToProps
)(AddPatient);
