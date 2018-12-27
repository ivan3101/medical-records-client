import { Form, FormikProps } from "formik";
import { isEmpty } from "lodash";
import React, { Component, MouseEventHandler } from "react";
import { oc } from "ts-optchain";
import FormGroup from "../../../../../components/form/formGroup/formGroup";
import InlineInputs from "../../../../../components/form/inlineInputs/inlineInputs";
import Input from "../../../../../components/form/input/input";
import InputError from "../../../../../components/form/inputError/inputError";
import Label from "../../../../../components/form/label/label";
import ShowPassword from "../../../../../components/form/showPassword/showPassword";
import SubmitButton from "../../../../../components/form/submitButton/submitButton";
import SubmitError from "../../../../../components/form/submitMessage/submitError/submitError";
import SubmitWarning from "../../../../../components/form/submitMessage/submitWarning/submitWarning";
import RouterLink from "../../../../../components/link/routerLink/routerLink";
import Loader from "../../../../../components/loader/loader";
import CedulaType from "../cedulaType/cedulaType";
import { ILoginStudent } from "./loginFormContainer";

export interface ILoginFormState {
  showPassword: boolean;
}

export interface ILoginFormStatus {
  error?: string;
  warning?: string;
}

class LoginForm extends Component<FormikProps<ILoginStudent>, ILoginFormState> {
  state: ILoginFormState = {
    showPassword: false
  };

  onShowPassword: MouseEventHandler<HTMLInputElement> = () => {
    this.setState(prevState => {
      if (prevState.showPassword) {
        return {
          showPassword: false
        };
      } else {
        return {
          showPassword: true
        };
      }
    });
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
          <Label htmlFor={"cedula.number"}>Cedula del Estudiante</Label>
          <InlineInputs>
            <CedulaType
              name={"cedula.type"}
              id={"cedula.type"}
              isinvalid={
                safeErrors.cedula.type() && safeTouched.cedula.type() ? 1 : 0
              }
              component={"select"}
            >
              <option value="V">V</option>
              <option value="J">J</option>
              <option value="P">P</option>
              <option value="E">E</option>
              <option value="G">G</option>
            </CedulaType>

            <Input
              name={"cedula.number"}
              id={"cedula.number"}
              isinvalid={
                safeErrors.cedula.number() && safeTouched.cedula.number()
                  ? 1
                  : 0
              }
            />
          </InlineInputs>

          <InputError name={"cedula.type"} />
          <InputError name={"cedula.number"} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor={"contraseña"}>
            Clave de Acceso
            <ShowPassword onClick={this.onShowPassword} />
          </Label>
          <Input
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

        <RouterLink to={"/login/personal"}>
          ¿No es un estudiante? Haga click aquí
        </RouterLink>
      </Form>
    );
  }
}
export default LoginForm;
