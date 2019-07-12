import { Field, FormikProps } from "formik";
import isEmpty from "lodash.isempty";
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import { oc } from "ts-optchain";
import Button from "../../../../../components/button/button";
import FieldSet from "../../../../../components/form/fieldSet/fieldSet";
import FormGroup from "../../../../../components/form/formGroup/formGroup";
import FastInput from "../../../../../components/form/input/fastInput/fastInput";
import InputError from "../../../../../components/form/inputError/inputError";
import Label from "../../../../../components/form/label/label";
import Legend from "../../../../../components/form/legend/legend";
import RadioInput from "../../../../../components/form/radioInput/radioInput";
import Textarea from "../../../../../components/form/textarea/textarea";
import { IAddMedicalRecord } from "../../../patients/addMedicalRecord/addMedicalRecord";
import ConditionalField from "../../conditionalField/conditionalField";

class StepFour extends Component<
  FormikProps<IAddMedicalRecord> & RouteComponentProps
> {
  isInvalid = (): boolean => {
    const { errors, dirty } = this.props;

    const safeErrors = oc(errors);

    return (
      !isEmpty(safeErrors.historiaClinica.signosVitales()) ||
      !isEmpty(safeErrors.historiaClinica.examenClinicoExtrabucal()) ||
      !dirty
    );
  };

  onNextStep = () => {
    const { history, match } = this.props;

    window.scrollTo(0, 0);

    history.push(`${match.url}/paso-5`);
  };

  render() {
    const { errors, touched } = this.props;

    const safeErrors = oc(errors);
    const safeTouched = oc(touched);

    return (
      <Fragment>
        <FieldSet>
          <Legend>
            Examen Periodontal (Describir alteraciones de la encia)
          </Legend>

          <FormGroup>
            <Label>Color</Label>
            <Textarea
              name={"historiaClinica.examenPeriodontal.color"}
              isinvalid={
                safeErrors.historiaClinica.examenPeriodontal.color() &&
                safeTouched.historiaClinica.examenPeriodontal.color()
                  ? 1
                  : 0
              }
            />
            <InputError name={"historiaClinica.examenPeriodontal.color"} />
          </FormGroup>

          <FormGroup>
            <Label>Consistencia</Label>
            <Textarea
              name={"historiaClinica.examenPeriodontal.consistencia"}
              isinvalid={
                safeErrors.historiaClinica.examenPeriodontal.consistencia() &&
                safeTouched.historiaClinica.examenPeriodontal.consistencia()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={"historiaClinica.examenPeriodontal.consistencia"}
            />
          </FormGroup>

          <FormGroup>
            <Label>Contorno</Label>
            <Textarea
              name={"historiaClinica.examenPeriodontal.contorno"}
              isinvalid={
                safeErrors.historiaClinica.examenPeriodontal.contorno() &&
                safeTouched.historiaClinica.examenPeriodontal.contorno()
                  ? 1
                  : 0
              }
            />
            <InputError name={"historiaClinica.examenPeriodontal.contorno"} />
          </FormGroup>

          <FormGroup>
            <Label>Tamaño</Label>
            <Textarea
              name={"historiaClinica.examenPeriodontal.tamaño"}
              isinvalid={
                safeErrors.historiaClinica.examenPeriodontal.tamaño() &&
                safeTouched.historiaClinica.examenPeriodontal.tamaño()
                  ? 1
                  : 0
              }
            />
            <InputError name={"historiaClinica.examenPeriodontal.tamaño"} />
          </FormGroup>

          <FormGroup>
            <Label>Textura</Label>
            <Textarea
              name={"historiaClinica.examenPeriodontal.textura"}
              isinvalid={
                safeErrors.historiaClinica.examenPeriodontal.textura() &&
                safeTouched.historiaClinica.examenPeriodontal.textura()
                  ? 1
                  : 0
              }
            />
            <InputError name={"historiaClinica.examenPeriodontal.textura"} />
          </FormGroup>

          <FormGroup>
            <Label>Posición</Label>
            <Textarea
              name={"historiaClinica.examenPeriodontal.posición"}
              isinvalid={
                safeErrors.historiaClinica.examenPeriodontal.posición() &&
                safeTouched.historiaClinica.examenPeriodontal.posición()
                  ? 1
                  : 0
              }
            />
            <InputError name={"historiaClinica.examenPeriodontal.posición"} />
          </FormGroup>

          <FormGroup>
            <Label>Tendencia al Sangrado</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.examenPeriodontal.tendenciaAlSangrado.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.examenPeriodontal.tendenciaAlSangrado.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.examenPeriodontal.tendenciaAlSangrado.respuesta"
              }
            >
              <Label>Porcentaje %</Label>
              <FastInput
                name={
                  "historiaClinica.examenPeriodontal.tendenciaAlSangrado.porcentaje"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>Presencia de Placa Bacteriana</Label>

            <FastInput
              name={
                "historiaClinica.examenPeriodontal.presenciaDePlacaBacteriana"
              }
              isinvalid={
                safeErrors.historiaClinica.examenPeriodontal.presenciaDePlacaBacteriana() &&
                safeTouched.historiaClinica.examenPeriodontal.presenciaDePlacaBacteriana()
                  ? 1
                  : 0
              }
            />
          </FormGroup>
        </FieldSet>

        <Button disabled={this.isInvalid()} onClick={this.onNextStep}>
          Siguiente
        </Button>
      </Fragment>
    );
  }
}

export default StepFour;
