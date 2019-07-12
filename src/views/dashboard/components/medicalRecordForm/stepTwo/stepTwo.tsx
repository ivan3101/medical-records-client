import { FormikProps } from "formik";
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
import Textarea from "../../../../../components/form/textarea/textarea";
import { IAddMedicalRecord } from "../../../patients/addMedicalRecord/addMedicalRecord";

class StepTwo extends Component<
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

    history.push(`${match.url}/paso-3`);
  };

  render() {
    const { errors, touched } = this.props;

    const safeErrors = oc(errors);
    const safeTouched = oc(touched);

    return (
      <Fragment>
        <FieldSet>
          <Legend>Signos vitales</Legend>

          <FormGroup>
            <Label>Frecuencia Respiratoria</Label>
            <FastInput
              name={"historiaClinica.signosVitales.frecuenciaRespiratoria"}
              isinvalid={
                safeErrors.historiaClinica.signosVitales.frecuenciaRespiratoria() &&
                safeTouched.historiaClinica.signosVitales.frecuenciaRespiratoria()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={"historiaClinica.signosVitales.frecuenciaRespiratoria"}
            />
          </FormGroup>

          <FormGroup>
            <Label>Pulso</Label>
            <FastInput
              name={"historiaClinica.signosVitales.pulso"}
              isinvalid={
                safeErrors.historiaClinica.signosVitales.pulso() &&
                safeTouched.historiaClinica.signosVitales.pulso()
                  ? 1
                  : 0
              }
            />
            <InputError name={"historiaClinica.signosVitales.pulso"} />
          </FormGroup>

          <FormGroup>
            <Label>Temperatura</Label>
            <FastInput
              name={"historiaClinica.signosVitales.temperatura"}
              isinvalid={
                safeErrors.historiaClinica.signosVitales.temperatura() &&
                safeTouched.historiaClinica.signosVitales.temperatura()
                  ? 1
                  : 0
              }
            />
            <InputError name={"historiaClinica.signosVitales.temperatura"} />
          </FormGroup>

          <FormGroup>
            <Label>Tensión Arterial</Label>
            <FastInput
              name={"historiaClinica.signosVitales.tensiónArterial"}
              isinvalid={
                safeErrors.historiaClinica.signosVitales.tensiónArterial() &&
                safeTouched.historiaClinica.signosVitales.tensiónArterial()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={"historiaClinica.signosVitales.tensiónArterial"}
            />
          </FormGroup>
        </FieldSet>

        <FieldSet>
          <Legend>Examen Clinico Extrabucal (Cabeza y Cuello)</Legend>

          <FormGroup>
            <Label>Aspecto del paciente (Raza, talla, peso, biotipo)</Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoExtrabucal.aspectoDelPaciente (Raza, talla, peso," +
                " biotipo)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoExtrabucal[
                  "aspectoDelPaciente (Raza, talla, peso, biotipo)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoExtrabucal[
                  "aspectoDelPaciente (Raza, talla, peso, biotipo)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoExtrabucal.aspectoDelPaciente (Raza, talla, peso," +
                " biotipo)"
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>Cabeza y Cara (Forma, tamaño, inseción del cabello)</Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoExtrabucal.cabezaYCara (Forma, tamaño, inseción del cabello)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoExtrabucal[
                  "cabezaYCara (Forma, tamaño, inseción del cabello)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoExtrabucal[
                  "cabezaYCara (Forma, tamaño, inseción del cabello)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoExtrabucal.cabezaYCara (Forma, tamaño, inseción del cabello)"
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>
              Ganglios linfáticos (Tamaño, consistencia, movilidad, localización
              y dolor)
            </Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoExtrabucal.gangliosLinfáticos (tamaño, consistencia, movilidad," +
                " localización y dolor)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoExtrabucal[
                  "gangliosLinfáticos (tamaño, consistencia, movilidad, localización y dolor)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoExtrabucal[
                  "gangliosLinfáticos (tamaño, consistencia, movilidad, localización y dolor)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoExtrabucal.gangliosLinfáticos (tamaño, consistencia, movilidad," +
                " localización y dolor)"
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>
              Palpación tiroidea (Tamaño, consistencia, movilidad, superficie,
              dolor)
            </Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoExtrabucal.palpaciónTiroidea (Tamaño, consistencia, movilidad," +
                " superficie, dolor)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoExtrabucal[
                  "palpaciónTiroidea (Tamaño, consistencia, movilidad, superficie, dolor)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoExtrabucal[
                  "palpaciónTiroidea (Tamaño, consistencia, movilidad, superficie, dolor)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoExtrabucal.palpaciónTiroidea (Tamaño, consistencia, movilidad," +
                " superficie, dolor)"
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>Palpación muscular (Tono muscular, dolor)</Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoExtrabucal.palpaciónMuscular (Tono muscular, dolor)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoExtrabucal[
                  "palpaciónMuscular (Tono muscular, dolor)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoExtrabucal[
                  "palpaciónMuscular (Tono muscular, dolor)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoExtrabucal.palpaciónMuscular (Tono muscular, dolor)"
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>
              Articulación temporomandibular (Ruidos articular, movimientos
              patológicos mandibulares, dolor)
            </Label>
            <Textarea
              name={
                "historiaClinica.examenClinicoExtrabucal.articulaciónTemporomandibular (Ruidos articular," +
                " movimientos patológicos mandibulares, dolor)"
              }
              isinvalid={
                safeErrors.historiaClinica.examenClinicoExtrabucal[
                  "articulaciónTemporomandibular (Ruidos articular, movimientos patológicos mandibulares, dolor)"
                ]() &&
                safeTouched.historiaClinica.examenClinicoExtrabucal[
                  "articulaciónTemporomandibular (Ruidos articular, movimientos patológicos mandibulares, dolor)"
                ]()
                  ? 1
                  : 0
              }
            />
            <InputError
              name={
                "historiaClinica.examenClinicoExtrabucal.articulaciónTemporomandibular (Ruidos articular," +
                " movimientos patológicos mandibulares, dolor)"
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

export default StepTwo;
