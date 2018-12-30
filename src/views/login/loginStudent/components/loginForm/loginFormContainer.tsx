import { Formik, FormikActions } from "formik";
import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";
import { object, string } from "yup";
import { fetchLoginUserStudent } from "../../../../../store/auth/actions";
import LoginForm from "./loginForm";

export enum TypeCedula {
  V = "V",
  E = "E",
  J = "J",
  P = "P",
  G = "G"
}

export interface ILoginStudent {
  cedula: {
    number: string;
    type: TypeCedula;
  };
  contraseña: string;
}

class LoginFormContainer extends Component<DispatchProp> {
  initialValues: ILoginStudent = {
    cedula: {
      number: "",
      type: TypeCedula.V
    },
    contraseña: ""
  };

  validationSchema = object().shape({
    cedula: object().shape({
      number: string()
        .trim()
        .required("Debe ingresar su numero de cedula")
        .matches(/^([0-9]{7,10})$/, {
          excludeEmptyString: true,
          message: "El numero de cedula es invalido"
        }),
      type: string()
        .trim()
        .required("Debe seleccionar su tipo de cedula")
        .matches(/^([VEJPG])$/, {
          excludeEmptyString: true,
          message: "El tipo de cedula seleccionado es invalido"
        })
    }),
    contraseña: string()
      .trim()
      .required("Debe ingresar su clave de acceso")
  });

  render() {
    return (
      <Formik
        validationSchema={this.validationSchema}
        initialValues={this.initialValues}
        onSubmit={(
          values: ILoginStudent,
          actions: FormikActions<ILoginStudent>
        ) => {
          actions.setSubmitting(true);
          actions.setStatus({});

          const cedula = `${values.cedula.type}-${values.cedula.number}`;

          this.props.dispatch(
            fetchLoginUserStudent({
              formikActions: actions,
              tempPassword: {
                cedula,
                contraseña: values.contraseña
              }
            })
          );
        }}
        component={LoginForm}
      />
    );
  }
}

export default connect()(LoginFormContainer);
