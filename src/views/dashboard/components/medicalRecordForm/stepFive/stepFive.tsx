import { FormikProps } from "formik";
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import Button from "../../../../../components/button/button";
import FileInput from "../../../../../components/form/fileInput/fileInput";
import FormGroup from "../../../../../components/form/formGroup/formGroup";
import InputError from "../../../../../components/form/inputError/inputError";
import Label from "../../../../../components/form/label/label";
import { IAddMedicalRecord } from "../../../patients/addMedicalRecord/addMedicalRecord";

class StepFive extends Component<
  FormikProps<IAddMedicalRecord> & RouteComponentProps
> {
  onNextStep = () => {
    const { history, match } = this.props;

    window.scrollTo(0, 0);

    history.push(`${match.url}/paso-6`);
  };

  render() {
    return (
      <Fragment>
        <FormGroup>
          <Label>Periodontodiagrama</Label>
          <FileInput name={"historiaClinica.periodontodiagrama"} />
          <InputError name={"historiaClinica.periodontodiagrama"} />
        </FormGroup>

        <FormGroup>
          <Label>Registro de Control de Placa</Label>
          <FileInput name={"historiaClinica.registroDeControlDePlaca"} />
          <InputError name={"historiaClinica.registroDeControlDePlaca"} />
        </FormGroup>

        <Button onClick={this.onNextStep}>Siguiente</Button>
      </Fragment>
    );
  }
}

export default StepFive;
