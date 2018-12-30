import { Formik, FormikActions } from "formik";
import React, { Component } from "react";
import { connect, DispatchProp } from "react-redux";
import { object, string } from "yup";
import { fetchLoginUserPersonal } from "../../../../../store/auth/actions";
import LoginForm from "./loginForm";

export interface ILoginPersonal {
  nombreDeUsuario: string;
  contraseña: string;
}

class LoginFormContainer extends Component<DispatchProp> {
  initialValues: ILoginPersonal = {
    nombreDeUsuario: "",
    contraseña: ""
  };

  validationSchema = object().shape({
    nombreDeUsuario: string()
      .trim()
      .required("Debe ingresar su nombre de usuario"),
    contraseña: string()
      .trim()
      .required("Debe ingresar su contraseña")
  });

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={this.validationSchema}
        onSubmit={(
          values: ILoginPersonal,
          actions: FormikActions<ILoginPersonal>
        ) => {
          actions.setSubmitting(true);
          actions.setStatus({});

          this.props.dispatch(
            fetchLoginUserPersonal({
              formikActions: actions,
              personal: {
                ...values
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
