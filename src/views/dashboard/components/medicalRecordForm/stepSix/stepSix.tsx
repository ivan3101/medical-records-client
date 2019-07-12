import { FormikProps } from "formik";
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import { oc } from "ts-optchain";
import FormGroup from "../../../../../components/form/formGroup/formGroup";
import InputError from "../../../../../components/form/inputError/inputError";
import Label from "../../../../../components/form/label/label";
import SubmitButton from "../../../../../components/form/submitButton/submitButton";
import SubmitError from "../../../../../components/form/submitMessage/submitError/submitError";
import SubmitWarning from "../../../../../components/form/submitMessage/submitWarning/submitWarning";
import Textarea from "../../../../../components/form/textarea/textarea";
import Loader from "../../../../../components/loader/loader";
import { IAddMedicalRecord } from "../../../patients/addMedicalRecord/addMedicalRecord";

export interface IMedicalRecordFormStatus {
  error?: string;
  warning?: string;
  success?: string;
}

class StepSix extends Component<
  FormikProps<IAddMedicalRecord> & RouteComponentProps
> {
  isInvalid = (): boolean => {
    const { errors, dirty } = this.props;

    const safeErrors = oc(errors);

    return (
      !!safeErrors.historiaClinica.diagnosticoDiferencial() ||
      !!safeErrors.historiaClinica.diagnosticoDefinitivo() ||
      !!safeErrors.historiaClinica.pronóstico() ||
      !!safeErrors.historiaClinica.planDeTratamiento() ||
      !dirty
    );
  };

  render() {
    const { errors, touched, status, isSubmitting } = this.props;

    const safeErrors = oc(errors);
    const safeTouched = oc(touched);
    const safeStatus = oc<IMedicalRecordFormStatus>(status);

    return (
      <Fragment>
        {isSubmitting && <Loader />}

        {!!safeStatus.error() && (
          <SubmitError>{safeStatus.error()}</SubmitError>
        )}

        {!!safeStatus.warning() && (
          <SubmitWarning>{safeStatus.warning()}</SubmitWarning>
        )}

        <FormGroup>
          <Label>Diagnostico Diferencial</Label>
          <Textarea
            name={"historiaClinica.diagnosticoDiferencial"}
            isinvalid={
              safeErrors.historiaClinica.diagnosticoDiferencial() &&
              safeTouched.historiaClinica.diagnosticoDiferencial()
                ? 1
                : 0
            }
          />
          <InputError name={"historiaClinica.diagnosticoDiferencial"} />
        </FormGroup>

        <FormGroup>
          <Label>Diagnostico Definitivo</Label>
          <Textarea
            name={"historiaClinica.diagnosticoDefinitivo"}
            isinvalid={
              safeErrors.historiaClinica.diagnosticoDefinitivo() &&
              safeTouched.historiaClinica.diagnosticoDefinitivo()
                ? 1
                : 0
            }
          />
          <InputError name={"historiaClinica.diagnosticoDefinitivo"} />
        </FormGroup>

        <FormGroup>
          <Label>Pronóstico</Label>
          <Textarea
            name={"historiaClinica.pronóstico"}
            isinvalid={
              safeErrors.historiaClinica.pronóstico() &&
              safeTouched.historiaClinica.pronóstico()
                ? 1
                : 0
            }
          />
          <InputError name={"historiaClinica.pronóstico"} />
        </FormGroup>

        <FormGroup>
          <Label>Plan de Tratamiento</Label>
          <Textarea
            name={"historiaClinica.planDeTratamiento"}
            isinvalid={
              safeErrors.historiaClinica.planDeTratamiento() &&
              safeTouched.historiaClinica.planDeTratamiento()
                ? 1
                : 0
            }
          />
          <InputError name={"historiaClinica.planDeTratamiento"} />
        </FormGroup>

        <SubmitButton disabled={this.isInvalid()}>Finalizar</SubmitButton>
      </Fragment>
    );
  }
}

export default StepSix;
