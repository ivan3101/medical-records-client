import { Form, FormikProps } from "formik";
import isEmpty from "lodash.isempty";
import React, { Component } from "react";
import { oc } from "ts-optchain";
import FieldSet from "../../../../components/form/fieldSet/fieldSet";
import FormGroup from "../../../../components/form/formGroup/formGroup";
import InlineInputs from "../../../../components/form/inlineInputs/inlineInputs";
import FastInput from "../../../../components/form/input/fastInput/fastInput";
import InputError from "../../../../components/form/inputError/inputError";
import Label from "../../../../components/form/label/label";
import Legend from "../../../../components/form/legend/legend";
import SubmitButton from "../../../../components/form/submitButton/submitButton";
import SubmitError from "../../../../components/form/submitMessage/submitError/submitError";
import SubmitSuccess from "../../../../components/form/submitMessage/submitSuccess/submitSuccess";
import SubmitWarning from "../../../../components/form/submitMessage/submitWarning/submitWarning";
import Loader from "../../../../components/loader/loader";
import CedulaType from "../../../login/loginStudent/components/cedulaType/cedulaType";
import { IStudentForm } from "../../students/addStudent/addStudent";

export interface IStudentFormStatus {
  error?: string;
  warning?: string;
  success?: string;
}

class StudentForm extends Component<FormikProps<IStudentForm>> {
  render() {
    const { errors, touched, isSubmitting, dirty, status } = this.props;

    const safeErrors = oc(errors);
    const safeTouched = oc(touched);
    const safeStatus = oc<IStudentFormStatus>(status);

    return (
      <Form>
        {isSubmitting && <Loader />}

        {!!safeStatus.success() && (
          <SubmitSuccess>{safeStatus.success()}</SubmitSuccess>
        )}

        {!!safeStatus.error() && (
          <SubmitError>{safeStatus.error()}</SubmitError>
        )}

        {!!safeStatus.warning() && (
          <SubmitWarning>{safeStatus.warning()}</SubmitWarning>
        )}

        <FieldSet>
          <Legend>Informacióñ Basica</Legend>
          <FormGroup>
            <Label htmlFor={"nombre"}>Nombre</Label>
            <FastInput
              name={"nombre"}
              id={"nombre"}
              isinvalid={safeErrors.nombre() && safeTouched.nombre() ? 1 : 0}
            />
            <InputError name={"nombre"} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="apellido">Apellido</Label>
            <FastInput
              name={"apellido"}
              id={"apellido"}
              isinvalid={
                safeErrors.apellido() && safeTouched.apellido() ? 1 : 0
              }
            />
            <InputError name="apellido" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor={"cedula.type"}>Cedula</Label>
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

              <FastInput
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
        </FieldSet>

        <FieldSet>
          <Legend>Información de Contacto</Legend>

          <FormGroup>
            <Label htmlFor="email">Correo Electronico</Label>
            <FastInput
              name={"email"}
              id={"email"}
              isinvalid={safeErrors.email() && safeTouched.email() ? 1 : 0}
            />
            <InputError name={"email"} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor={"telefono.prefix"}>Telefono</Label>
            <InlineInputs>
              <FastInput
                name={"telefono.prefix"}
                id={"telefono.prefix"}
                isinvalid={
                  safeErrors.telefono.prefix() && safeTouched.telefono.prefix()
                    ? 1
                    : 0
                }
                width={"15%"}
              />
              -
              <FastInput
                name={"telefono.number"}
                id={"telefono.number"}
                isinvalid={
                  safeErrors.telefono.number() && safeTouched.telefono.number()
                    ? 1
                    : 0
                }
                width={"30%"}
              />
            </InlineInputs>

            <InputError name={"telefono.prefix"} />
            <InputError name={"telefono.number"} />
          </FormGroup>
        </FieldSet>

        <SubmitButton disabled={isSubmitting || !isEmpty(errors) || !dirty}>
          Agregar Estudiante
        </SubmitButton>
      </Form>
    );
  }
}

export default StudentForm;
