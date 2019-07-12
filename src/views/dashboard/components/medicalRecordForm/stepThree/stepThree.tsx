import { FormikProps } from "formik";
import { isEmpty } from "lodash";
import React, { Component, Fragment } from "react";
import { RouteComponentProps } from "react-router";
import { oc } from "ts-optchain";
import Button from "../../../../../components/button/button";
import FieldSet from "../../../../../components/form/fieldSet/fieldSet";
import FormGroup from "../../../../../components/form/formGroup/formGroup";
import InputError from "../../../../../components/form/inputError/inputError";
import Label from "../../../../../components/form/label/label";
import Legend from "../../../../../components/form/legend/legend";
import Textarea from "../../../../../components/form/textarea/textarea";
import { IAddMedicalRecord } from "../../../patients/addMedicalRecord/addMedicalRecord";

class StepThree extends Component<
  FormikProps<IAddMedicalRecord> & RouteComponentProps
> {
  isInvalid = (): boolean => {
    const { errors, dirty } = this.props;

    const safeErrors = oc(errors);

    return (
      !isEmpty(safeErrors.historiaClinica.examenClinicoIntrabucal()) || !dirty
    );
  };

  onNextStep = () => {
    const { history, match } = this.props;

    window.scrollTo(0, 0);

    history.push(`${match.url}/paso-4`);
  };

  render() {
    const { errors, touched } = this.props;

    const safeErrors = oc(errors);
    const safeTouched = oc(touched);

    return (
      <Fragment>
        <FieldSet>
          <Legend>Examen Clinico Intrabucal</Legend>

          <FormGroup>
            <Label>
              Labios y Comisura Labial (Patología o aspecto general)
            </Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoIntrabucal.labiosYComisuraLabia (Patología o aspecto" +
                " general)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoIntrabucal[
                  "labiosYComisuraLabia (Patología o aspecto general)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoIntrabucal[
                  "labiosYComisuraLabia (Patología o aspecto general)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoIntrabucal.labiosYComisuraLabia (Patología o aspecto" +
                " general)"
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>Carrillos (Patología o aspecto general)</Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoIntrabucal.carrillos (Patología o aspecto" +
                " general)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoIntrabucal[
                  "carrillos (Patología o aspecto general)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoIntrabucal[
                  "carrillos (Patología o aspecto general)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoIntrabucal.carrillos (Patología o aspecto" +
                " general)"
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>
              Paladar Duro y Paladar Blando (Patología o aspecto general de la
              mucosa)
            </Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoIntrabucal.paladarDuroYPaladarBlando (Patología o aspecto" +
                " general de la mucosa)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoIntrabucal[
                  "paladarDuroYPaladarBlando (Patología o aspecto general de la mucosa)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoIntrabucal[
                  "paladarDuroYPaladarBlando (Patología o aspecto general de la mucosa)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoIntrabucal.paladarDuroYPaladarBlando (Patología o aspecto" +
                " general de la mucosa)"
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>
              Región Amigdalina (Patología o aspecto general de la mucosa)
            </Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoIntrabucal.regiónAmigdalina (Patología o aspecto" +
                " general de la mucosa)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoIntrabucal[
                  "regiónAmigdalina (Patología o aspecto general de la mucosa)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoIntrabucal[
                  "regiónAmigdalina (Patología o aspecto general de la mucosa)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoIntrabucal.regiónAmigdalina (Patología o aspecto" +
                " general de la mucosa)"
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>
              Lengua y Piso de Boca (Patología o aspecto general de la mucosa)
            </Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoIntrabucal.lenguaYPisoDeBoca (Patología o aspecto" +
                " general mucosa)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoIntrabucal[
                  "lenguaYPisoDeBoca (Patología o aspecto general mucosa)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoIntrabucal[
                  "lenguaYPisoDeBoca (Patología o aspecto general mucosa)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoIntrabucal.lenguaYPisoDeBoca (Patología o aspecto" +
                " general mucosa)"
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>Maxilares (Tipo y forma)</Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoIntrabucal.maxilares (Tipo y forma)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoIntrabucal[
                  "maxilares (Tipo y forma)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoIntrabucal[
                  "maxilares (Tipo y forma)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoIntrabucal.maxilares (Tipo y forma)"
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>Saliva (Presencia, viscosidad, color)</Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoIntrabucal.saliva (Presencia, viscosidad, color)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoIntrabucal[
                  "saliva (Presencia, viscosidad, color)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoIntrabucal[
                  "saliva (Presencia, viscosidad, color)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoIntrabucal.saliva (Presencia, viscosidad, color)"
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>Oclusión (Relación molar, proyección, perfil)</Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoIntrabucal.oclusión (Relación molar, proyección, perfil)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoIntrabucal[
                  "oclusión (Relación molar, proyección, perfil)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoIntrabucal[
                  "oclusión (Relación molar, proyección, perfil)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoIntrabucal.oclusión (Relación molar, proyección, perfil)"
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

export default StepThree;
