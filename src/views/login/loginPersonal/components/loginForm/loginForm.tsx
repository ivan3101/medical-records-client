import { Form, FormikProps } from "formik";
import { isEmpty } from "lodash";
import React, { Component, MouseEventHandler } from "react";
import { oc } from "ts-optchain";
import FormGroup from "../../../../../components/form/formGroup/formGroup";
import FastInput from "../../../../../components/form/input/fastInput/fastInput";
import NormalInput from "../../../../../components/form/input/normalInput/normalInput";
import InputError from "../../../../../components/form/inputError/inputError";
import Label from "../../../../../components/form/label/label";
import ShowPassword from "../../../../../components/form/showPassword/showPassword";
import SubmitButton from "../../../../../components/form/submitButton/submitButton";
import SubmitError from "../../../../../components/form/submitMessage/submitError/submitError";
import SubmitWarning from "../../../../../components/form/submitMessage/submitWarning/submitWarning";
import RouterLink from "../../../../../components/link/routerLink/routerLink";
import Loader from "../../../../../components/loader/loader";
import { ILoginPersonal } from "./loginFormContainer";

export interface ILoginFormState {
  showPassword: boolean;
}

export interface ILoginFormStatus {
  error?: string;
  warning?: string;
}

class LoginForm extends Component<
  FormikProps<ILoginPersonal>,
  ILoginFormState
> {
  state: ILoginFormState = {
    showPassword: false
  };

  onShowPassword: MouseEventHandler<HTMLInputElement> = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };

  render() {
    const { showPassword } = this.state;
    const { errors, touched, isSubmitting, dirty, status } = this.props;

    const safeErrors = oc(errors);
    const safeTouched = oc(touched);
    const safeStatus = oc<ILoginFormStatus>(status);

    return (
      <Form>
        {isSubmitting && <Loader />}

        {!!safeStatus.error() && (
          <SubmitError>{safeStatus.error()}</SubmitError>
        )}

        {!!safeStatus.warning() && (
          <SubmitWarning>{safeStatus.warning()}</SubmitWarning>
        )}

        <FormGroup>
          <Label htmlFor={"nombreDeUsuario"}>Nombre de usuario</Label>
          <FastInput
            name={"nombreDeUsuario"}
            id={"nombreDeUsuario"}
            isinvalid={
              safeErrors.contraseña() && safeTouched.contraseña() ? 1 : 0
            }
          />
          <InputError name={"nombreDeUsuario"} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor={"contraseña"}>
            Contraseña
            <ShowPassword onClick={this.onShowPassword} />
          </Label>
          <NormalInput
            name={"contraseña"}
            id={"contraseña"}
            type={showPassword ? "text" : "password"}
            isinvalid={
              safeErrors.contraseña() && safeTouched.contraseña() ? 1 : 0
            }
          />
          <InputError name={"contraseña"} />
        </FormGroup>

        <SubmitButton disabled={isSubmitting || !isEmpty(errors) || !dirty}>
          Iniciar Sesión
        </SubmitButton>

        <RouterLink to={"/login/estudiante"}>
          ¿Eres un Estudiante? Haga click aquí
        </RouterLink>
      </Form>
    );
  }
}

export default LoginForm;
