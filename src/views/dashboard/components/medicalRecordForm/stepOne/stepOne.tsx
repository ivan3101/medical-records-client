import { Field, FormikProps } from "formik";
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
import { IMedicalRecordFormStatus } from "../stepSix/stepSix";
import SubmitSuccess from "../../../../../components/form/submitMessage/submitSuccess/submitSuccess";

class StepOne extends Component<
  RouteComponentProps & FormikProps<IAddMedicalRecord>
> {
  isInvalid = (): boolean => {
    const { errors, dirty } = this.props;

    const safeErrors = oc(errors);

    return (
      !!safeErrors.historiaClinica.motivoDeConsulta() ||
      !!safeErrors.historiaClinica.enfermedadActual() ||
      !dirty
    );
  };

  onNextStep = () => {
    const { history, match } = this.props;

    window.scrollTo(0, 0);

    history.push(`${match.url}/paso-2`);
  };

  render() {
    const { touched, errors, status } = this.props;

    const safeErrors = oc(errors);
    const safeTouched = oc(touched);
    const safeStatus = oc<IMedicalRecordFormStatus>(status);

    return (
      <Fragment>
        <h1>Historia Clinica</h1>

        {!!safeStatus.error() && (
          <SubmitSuccess>{safeStatus.success()}</SubmitSuccess>
        )}

        <br />

        <FormGroup>
          <Label>Motivo de Consulta</Label>
          <FastInput
            name={"historiaClinica.motivoDeConsulta"}
            isinvalid={
              safeErrors.historiaClinica.motivoDeConsulta() &&
              safeTouched.historiaClinica.motivoDeConsulta()
                ? 1
                : 0
            }
          />
          <InputError name={"historiaClinica.motivoDeConsulta"} />
        </FormGroup>

        <FormGroup>
          <Label>Enfermedad Actual</Label>
          <Textarea
            name={"historiaClinica.enfermedadActual"}
            isinvalid={
              safeErrors.historiaClinica.enfermedadActual() &&
              safeTouched.historiaClinica.enfermedadActual()
                ? 1
                : 0
            }
          />
          <InputError name={"historiaClinica.enfermedadActual"} />
        </FormGroup>

        <FieldSet>
          <Legend>Anamnesis</Legend>

          <Label>Padece usted o ha padecido de</Label>

          <FormGroup>
            <Label>¿Alteraciones Cardiovasculares?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿alteracionesCardiovasculares?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿alteracionesCardiovasculares?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿alteracionesCardiovasculares?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿alteracionesCardiovasculares?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Hemorragías o sangrados frecuentes?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿hemorragiasOSangradosFrecuentes?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿hemorragiasOSangradosFrecuentes?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿hemorragiasOSangradosFrecuentes?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿hemorragiasOSangradosFrecuentes?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Anemia u otra alteración sanguínea?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿anemiaUOtraAlteraciónSanguinea?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿anemiaUOtraAlteraciónSanguinea?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿anemiaUOtraAlteraciónSanguinea?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿anemiaUOtraAlteraciónSanguinea?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Enfermedades Renales?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesRenales?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesRenales?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.anamnesis.¿enfermedadesRenales?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿enfermedadesRenales?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Enfermedades hepáticas?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesHepáticas?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesHepáticas?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿enfermedadesHepáticas?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿enfermedadesHepáticas?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Asma o alguna dificultad para respirar?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿asmaOAlgunaDificultadParaRespirar?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿asmaOAlgunaDificultadParaRespirar?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿asmaOAlgunaDificultadParaRespirar?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿asmaOAlgunaDificultadParaRespirar?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Enfermedades Respiratorias?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesRespiratorias?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesRespiratorias?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿enfermedadesRespiratorias?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿enfermedadesRespiratorias?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Diabetes Mellitus?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿diabetesMellitus?.respuesta"}
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿diabetesMellitus?.respuesta"}
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.anamnesis.¿diabetesMellitus?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿diabetesMellitus?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Hipertensión?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿hipertensión?.respuesta"}
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿hipertensión?.respuesta"}
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.anamnesis.¿hipertensión?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea
                name={"historiaClinica.anamnesis.¿hipertensión?.observacion"}
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Dolores de Cabeza frecuentes, Migrañas, Jaquecas?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿doloresDeCabezaFrecuentes,Migrañas,Jaquecas?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿doloresDeCabezaFrecuentes,Migrañas,Jaquecas?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿doloresDeCabezaFrecuentes,Migrañas,Jaquecas?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿doloresDeCabezaFrecuentes,Migrañas,Jaquecas?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Fiebre Reumática?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿fiebreReumática?.respuesta"}
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿fiebreReumática?.respuesta"}
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.anamnesis.¿fiebreReumática?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea
                name={"historiaClinica.anamnesis.¿fiebreReumática?.observacion"}
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Enfermdades Infecciosas?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesInfecciosas?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesInfecciosas?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿enfermedadesInfecciosas?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿enfermedadesInfecciosas?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Enfermedades de Transmisión Sexual?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesDeTransmisiónSexual?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesDeTransmisiónSexual?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿enfermedadesDeTransmisiónSexual?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿enfermedadesDeTransmisiónSexual?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Enfermedades gastrointestinales?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesGastrointestinales?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesGastrointestinales?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿enfermedadesGastrointestinales?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿enfermedadesGastrointestinales?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Dolores de Oído Frecuentes o Zumbidos?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿doloresDeOídosOZumbidos?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿doloresDeOídosOZumbidos?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿doloresDeOídosOZumbidos?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿doloresDeOídosOZumbidos?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>
              ¿Se le Inflaman los Pies o Articulaciones Frecuentemente?
            </Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿seLeInflamanLosPiesOArticulacionesFrecuentemente?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿seLeInflamanLosPiesOArticulacionesFrecuentemente?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿seLeInflamanLosPiesOArticulacionesFrecuentemente?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿seLeInflamanLosPiesOArticulacionesFrecuentemente?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Enfermedades de los Senos Paranasales (sinusitis)?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesDeLosSenosParanasales (Sinusitis)?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadesDeLosSenosParanasales (Sinusitis)?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿enfermedadesDeLosSenosParanasales (Sinusitis)?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿enfermedadesDeLosSenosParanasales (Sinusitis)?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Respirador Bucal?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿respiradorBucal?.respuesta"}
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿respiradorBucal?.respuesta"}
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.anamnesis.¿respiradorBucal?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea
                name={"historiaClinica.anamnesis.¿respiradorBucal?.observacion"}
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Enfermedad Congenita?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadCongenita?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿enfermedadCongenita?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.anamnesis.¿enfermedadCongenita?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿enfermedadCongenita?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Tiene algún tipo de Desarreglo Hormonal?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿tieneAlgúnTipoDeDesordenHormonal?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿tieneAlgúnTipoDeDesordenHormonal?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿tieneAlgúnTipoDeDesordenHormonal?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿tieneAlgúnTipoDeDesordenHormonal?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <Label>Historia General</Label>

          <FormGroup>
            <Label>¿Alguna vez ha estado gravemente enfermo?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿algunaVezHaEstadoGravementeEnfermo?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿algunaVezHaEstadoGravementeEnfermo?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿algunaVezHaEstadoGravementeEnfermo?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿algunaVezHaEstadoGravementeEnfermo?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Ha sido intervenido Quirúrgicamente?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿haSidoIntervenidoQuirúrgicamente?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿haSidoIntervenidoQuirúrgicamente?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿haSidoIntervenidoQuirúrgicamente?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿haSidoIntervenidoQuirúrgicamente?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Toma mas de 8 vasos de agua al día?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿tomaMasDe8VasosDeAguaAlDía?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿tomaMasDe8VasosDeAguaAlDía?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿tomaMasDe8VasosDeAguaAlDía?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿tomaMasDe8VasosDeAguaAlDía?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Toma frecuentemente aspirinas o similar?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿tomaFrecuentementeAspirinaOSimilar?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿tomaFrecuentementeAspirinaOSimilar?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿tomaFrecuentementeAspirinaOSimilar?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿tomaFrecuentementeAspirinaOSimilar?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>
              ¿Orina frecuentemente durante el día (Más de 6 veces)?
            </Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿orinaFrecuentementeDuranteElDia (MasDe6VecesAlDía)?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿orinaFrecuentementeDuranteElDia (MasDe6VecesAlDía)?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿orinaFrecuentementeDuranteElDia (MasDe6VecesAlDía)?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿orinaFrecuentementeDuranteElDia (MasDe6VecesAlDía)?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>
              ¿Esta tomando algún tipo de Medicamente o está bajo algún
              tratamiento medico?
            </Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿estaBajoAlgunTipoDeMedicamenteOEstáBajoAlgúnTipoDeTratamientoMedico?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿estaBajoAlgunTipoDeMedicamenteOEstáBajoAlgúnTipoDeTratamientoMedico?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿estaBajoAlgunTipoDeMedicamenteOEstáBajoAlgúnTipoDeTratamientoMedico?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿estaBajoAlgunTipoDeMedicamenteOEstáBajoAlgúnTipoDeTratamientoMedico?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>
              ¿Se cansa fácilmente al realizar algún esfuerzo físico?
            </Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿seCansaFacilmenteAlRealizarAlgúnEsfuerzoFísico?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿seCansaFacilmenteAlRealizarAlgúnEsfuerzoFísico?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿seCansaFacilmenteAlRealizarAlgúnEsfuerzoFísico?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿seCansaFacilmenteAlRealizarAlgúnEsfuerzoFísico?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Hay algún alimento que usted no puede comer?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿hayAlgúnAlimentoQueUstedNoPuedeComer?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿hayAlgúnAlimentoQueUstedNoPuedeComer?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿hayAlgúnAlimentoQueUstedNoPuedeComer?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿hayAlgúnAlimentoQueUstedNoPuedeComer?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Se siente nervioso durante la consulta?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿seSienteUstedNerviosoDuranteLaConsulta?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿seSienteUstedNerviosoDuranteLaConsulta?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿seSienteUstedNerviosoDuranteLaConsulta?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿seSienteUstedNerviosoDuranteLaConsulta?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Es alérgico a alguna sustancia o medicamento?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿esAlergicoAAlgunaSustanciaOMedicamento?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿esAlergicoAAlgunaSustanciaOMedicamento?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿esAlergicoAAlgunaSustanciaOMedicamento?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿esAlergicoAAlgunaSustanciaOMedicamento?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Está usted embarazada?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿estáUstedEmbarazada?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿estáUstedEmbarazada?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.anamnesis.¿estáUstedEmbarazada?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿estáUstedEmbarazada?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>
              ¿Toma algún tipo de terapia hormonal o anticonceptivos?
            </Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿tomaAlgúnTipoDeTerapiaHormonalOAnticonceptivos?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿tomaAlgúnTipoDeTerapiaHormonalOAnticonceptivos?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿tomaAlgúnTipoDeTerapiaHormonalOAnticonceptivos?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿tomaAlgúnTipoDeTerapiaHormonalOAnticonceptivos?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <Label>Habitos</Label>

          <FormGroup>
            <Label>¿Fuma?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿fuma?.respuesta"}
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿fuma?.respuesta"}
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.anamnesis.¿fuma?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea name={"historiaClinica.anamnesis.¿fuma?.observacion"} />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Consume alcohol?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿consumeAlcohol?.respuesta"}
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿consumeAlcohol?.respuesta"}
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.anamnesis.¿consumeAlcohol?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea
                name={"historiaClinica.anamnesis.¿consumeAlcohol?.observacion"}
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Se muerde las uñas?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿seMuerdeLasUñas?.respuesta"}
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿seMuerdeLasUñas?.respuesta"}
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.anamnesis.¿seMuerdeLasUñas?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea
                name={"historiaClinica.anamnesis.¿seMuerdeLasUñas?.observacion"}
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Se muerde los labios?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿seMuerdeLosLabios?.respuesta"}
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿seMuerdeLosLabios?.respuesta"}
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.anamnesis.¿seMuerdeLosLabios?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿seMuerdeLosLabios?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Abre cosas con los dientes?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿abreCosasConLosDientes?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿abreCosasConLosDientes?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿abreCosasConLosDientes?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿abreCosasConLosDientes?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Otros?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿otros?.respuesta"}
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={"historiaClinica.anamnesis.¿otros?.respuesta"}
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.anamnesis.¿otros?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea
                name={"historiaClinica.anamnesis.¿otros?.observacion"}
              />
            </ConditionalField>
          </FormGroup>

          <Label>Historia bucal</Label>

          <FormGroup>
            <Label>Ha presentado alguna reacción al anestésico local</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿haPresentadoAlgunaReacciónAlAnestesicoLocal?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿haPresentadoAlgunaReacciónAlAnestesicoLocal?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿haPresentadoAlgunaReacciónAlAnestesicoLocal?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿haPresentadoAlgunaReacciónAlAnestesicoLocal?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Ha presentado mal olor o sabor de boca (halitosis)?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿haPresentadoMalOlorOSaborDeBoca (halitosis)?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿haPresentadoMalOlorOSaborDeBoca (halitosis)?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿haPresentadoMalOlorOSaborDeBoca (halitosis)?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿haPresentadoMalOlorOSaborDeBoca (halitosis)?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Esta satisfecho con la apariencia de sus dientes?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿estaSatisfechoConLaAparienciaDeSusDientes?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿estaSatisfechoConLaAparienciaDeSusDientes?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿estaSatisfechoConLaAparienciaDeSusDientes?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿estaSatisfechoConLaAparienciaDeSusDientes?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Le sangran las encías frecuentemente?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿leSangranLasEncíasFrecuentemente?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿leSangranLasEncíasFrecuentemente?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿leSangranLasEncíasFrecuentemente?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿leSangranLasEncíasFrecuentemente?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Siente que sus dientes se mueven?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿sienteQueSusDientesSeMueven?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿sienteQueSusDientesSeMueven?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿sienteQueSusDientesSeMueven?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿sienteQueSusDientesSeMueven?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Tiene sensibilidad o dolor en alguno de sus dientes?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿tieneSensibilidadODolorEnAlgunoDeSusDientes?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿tieneSensibilidadODolorEnAlgunoDeSusDientes?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿tieneSensibilidadODolorEnAlgunoDeSusDientes?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿tieneSensibilidadODolorEnAlgunoDeSusDientes?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Consume muchos alimentos ácidos, calientes o fríos?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿consumeMuchosAlimentosÁcidos,CalientesOFríos?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿consumeMuchosAlimentosÁcidos,CalientesOFríos?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿consumeMuchosAlimentosÁcidos,CalientesOFríos?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿consumeMuchosAlimentosÁcidos,CalientesOFríos?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Siente resequedad en la boca frecuentemente?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿sienteResequedadEnLaBocaFrecuentemente?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿sienteResequedadEnLaBocaFrecuentemente?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿sienteResequedadEnLaBocaFrecuentemente?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿sienteResequedadEnLaBocaFrecuentemente?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Siente molestias por ulceraciones en la boca?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿sienteMolestiasPorUlceracionesEnLaBoca?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿sienteMolestiasPorUlceracionesEnLaBoca?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿sienteMolestiasPorUlceracionesEnLaBoca?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿sienteMolestiasPorUlceracionesEnLaBoca?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Le molesta o le suena la mandíbula al masticar?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿leMolestaOLeSuenaLaMandíbulaAlMasticar?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.anamnesis.¿leMolestaOLeSuenaLaMandíbulaAlMasticar?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.anamnesis.¿leMolestaOLeSuenaLaMandíbulaAlMasticar?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.anamnesis.¿leMolestaOLeSuenaLaMandíbulaAlMasticar?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>Observaciones</Label>
            <Textarea name={"historiaClinica.anamnesis.obversaciones"} />
          </FormGroup>
        </FieldSet>

        <FieldSet>
          <Legend>Antecedentes familiares</Legend>

          <Label>Padece o ha padecido</Label>

          <FormGroup>
            <Label>¿Alteraciones Cardiovasculares?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿alteracionesCardiovasculares?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿alteracionesCardiovasculares?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.antecedentesFamiliares.¿alteracionesCardiovasculares?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.antecedentesFamiliares.¿alteracionesCardiovasculares?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Enfermedades Hemorrágicas?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿enfermedadesHemorrágicas?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿enfermedadesHemorrágicas?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.antecedentesFamiliares.¿enfermedadesHemorrágicas?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.antecedentesFamiliares.¿enfermedadesHemorrágicas?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>
              ¿Alteraciones renales, hepáticas o gastrointestinales?
            </Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿alteracionesRenalesHepáticasOGastrointestinales?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿alteracionesRenalesHepáticasOGastrointestinales?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.antecedentesFamiliares.¿alteracionesRenalesHepáticasOGastrointestinales?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.antecedentesFamiliares.¿alteracionesRenalesHepáticasOGastrointestinales?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Diabetes Mellitus?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿diabetesMellitus?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿diabetesMellitus?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.antecedentesFamiliares.¿diabetesMellitus?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.antecedentesFamiliares.¿diabetesMellitus?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Hipertensón o Hipotensión Arterial?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿hipertensiónOHipotensiónArterial?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿hipertensiónOHipotensiónArterial?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.antecedentesFamiliares.¿hipertensiónOHipotensiónArterial?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.antecedentesFamiliares.¿hipertensiónOHipotensiónArterial?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Enfermedades infecciosas?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿enfermedadesInfecciosas?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿enfermedadesInfecciosas?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.antecedentesFamiliares.¿enfermedadesInfecciosas?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.antecedentesFamiliares.¿enfermedadesInfecciosas?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Enfermedades de transmisión sexual?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿enfermedadesDeTransmisiónSexual?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿enfermedadesDeTransmisiónSexual?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.antecedentesFamiliares.¿enfermedadesDeTransmisiónSexual?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.antecedentesFamiliares.¿enfermedadesDeTransmisiónSexual?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Alergias?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿alergias?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿alergias?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={
                "historiaClinica.antecedentesFamiliares.¿alergias?.respuesta"
              }
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.antecedentesFamiliares.¿alergias?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>¿Cancer?</Label>

            <FormGroup>
              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿cancer?.respuesta"
                }
                value={"Si"}
                label={"Si"}
              />

              <Field
                component={RadioInput}
                name={
                  "historiaClinica.antecedentesFamiliares.¿cancer?.respuesta"
                }
                value={"No"}
                label={"No"}
              />
            </FormGroup>

            <ConditionalField
              name={"historiaClinica.antecedentesFamiliares.¿cancer?.respuesta"}
            >
              <Label>Especifique</Label>
              <Textarea
                name={
                  "historiaClinica.antecedentesFamiliares.¿cancer?.observacion"
                }
              />
            </ConditionalField>
          </FormGroup>

          <FormGroup>
            <Label>Observaciones</Label>
            <Textarea
              name={"historiaClinica.antecedentesFamiliares.observaciones"}
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

export default StepOne;
