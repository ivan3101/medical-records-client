import { Form, FormikProps } from "formik";
import { isEmpty } from "lodash";
import React, { Component } from "react";
import { oc } from "ts-optchain";
import CheckboxInput from "../../../../components/form/checkboxInput/checkboxInput";
import FileInput from "../../../../components/form/fileInput/fileInput";
import FormGroup from "../../../../components/form/formGroup/formGroup";
import InputError from "../../../../components/form/inputError/inputError";
import Label from "../../../../components/form/label/label";
import SubmitButton from "../../../../components/form/submitButton/submitButton";
import SubmitError from "../../../../components/form/submitMessage/submitError/submitError";
import SubmitSuccess from "../../../../components/form/submitMessage/submitSuccess/submitSuccess";
import SubmitWarning from "../../../../components/form/submitMessage/submitWarning/submitWarning";
import Textarea from "../../../../components/form/textarea/textarea";
import Loader from "../../../../components/loader/loader";
import { IAddTriage } from "../../patients/addTriage/addTriage";

export interface ITriageFormStatus {
  error?: string;
  warning?: string;
  success?: string;
}

class TriageForm extends Component<FormikProps<IAddTriage>> {
  render() {
    const { errors, touched, isSubmitting, dirty, status } = this.props;

    const safeErrors = oc(errors);
    const safeTouched = oc(touched);
    const safeStatus = oc<ITriageFormStatus>(status);

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

        <FormGroup>
          <Label>Odontodiagrama</Label>
          <FileInput name={"triaje.odontodiagrama"} />
          <InputError name={"triaje.odontodiagrama"} />
        </FormGroup>

        <FormGroup>
          <Label>Observaciones</Label>
          <Textarea
            name={"triaje.observaciones"}
            isinvalid={
              safeErrors.triaje.observaciones() &&
              safeTouched.triaje.observaciones()
                ? 1
                : 0
            }
          />
          <InputError name={"triaje.observaciones"} />
        </FormGroup>

        <FormGroup>
          <Label>Requerimientos clinicos del paciente</Label>
          <InputError name={"triaje.requerimientosClinicosDelPaciente"} />
          <CheckboxInput
            name={"triaje.requerimientosClinicosDelPaciente"}
            value={"Cirugía"}
          />
          <CheckboxInput
            name={"triaje.requerimientosClinicosDelPaciente"}
            value={"Prótesis"}
          />
          <CheckboxInput
            name={"triaje.requerimientosClinicosDelPaciente"}
            value={"Endodoncia"}
          />
          <CheckboxInput
            name={"triaje.requerimientosClinicosDelPaciente"}
            value={"Operatoria"}
          />
          <CheckboxInput
            name={"triaje.requerimientosClinicosDelPaciente"}
            value={"Patología"}
          />
          <CheckboxInput
            name={"triaje.requerimientosClinicosDelPaciente"}
            value={"Oclusión"}
          />
          <CheckboxInput
            name={"triaje.requerimientosClinicosDelPaciente"}
            value={"Periodoncia simple"}
          />

          <CheckboxInput
            name={"triaje.requerimientosClinicosDelPaciente"}
            value={"Periodoncia compleja"}
          />
        </FormGroup>

        <SubmitButton disabled={isSubmitting || !isEmpty(errors) || !dirty}>
          Agregar Triaje
        </SubmitButton>
      </Form>
    );
  }
}

export default TriageForm;
