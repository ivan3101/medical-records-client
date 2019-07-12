import { AxiosResponse } from "axios";
import { Formik } from "formik";
import { cloneDeep } from "lodash";
import React, { Component, Fragment } from "react";
import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps } from "react-router";
import { number, object, string } from "yup";
import Button from "../../../../components/button/button";
import Container from "../../../../components/container/container";
import { MedicalRecordService } from "../../../../services/medicalRecord/medicalRecord.service";
import { IApiErrorResponse } from "../../../../services/types";
import { IApplicationState } from "../../../../store";
import MedicalRecordForm from "../../components/medicalRecordForm/medicalRecordForm";

export interface IAddMedicalRecord {
  historiaClinica: {
    motivoDeConsulta: string;
    enfermedadActual: string;
    anamnesis: {
      "¿alteracionesCardiovasculares?": {
        respuesta: string;
        observacion: string;
      };
      "¿hemorragiasOSangradosFrecuentes?": {
        respuesta: string;
        observacion: string;
      };
      "¿anemiaUOtraAlteraciónSanguinea?": {
        respuesta: string;
        observacion: string;
      };
      "¿enfermedadesRenales?": {
        respuesta: string;
        observacion: string;
      };
      "¿enfermedadesHepáticas?": {
        respuesta: string;
        observacion: string;
      };
      "¿asmaOAlgunaDificultadParaRespirar?": {
        respuesta: string;
        observacion: string;
      };
      "¿enfermedadesRespiratorias?": {
        respuesta: string;
        observacion: string;
      };
      "¿diabetesMellitus?": {
        respuesta: string;
        observacion: string;
      };
      "¿hipertensión?": {
        respuesta: string;
        observacion: string;
      };
      "¿doloresDeCabezaFrecuentes,Migrañas,Jaquecas?": {
        respuesta: string;
        observacion: string;
      };
      "¿fiebreReumática?": {
        respuesta: string;
        observacion: string;
      };
      "¿enfermedadesInfecciosas?": {
        respuesta: string;
        observacion: string;
      };
      "¿enfermedadesDeTransmisiónSexual?": {
        respuesta: string;
        observacion: string;
      };
      "¿enfermedadesGastrointestinales?": {
        respuesta: string;
        observacion: string;
      };
      "¿doloresDeOídosOZumbidos?": {
        respuesta: string;
        observacion: string;
      };
      "¿seLeInflamanLosPiesOArticulacionesFrecuentemente?": {
        respuesta: string;
        observacion: string;
      };
      "¿enfermedadesDeLosSenosParanasales (Sinusitis)?": {
        respuesta: string;
        observacion: string;
      };
      "¿respiradorBucal?": {
        respuesta: string;
        observacion: string;
      };
      "¿enfermedadCongenita?": {
        respuesta: string;
        observacion: string;
      };
      "¿tieneAlgúnTipoDeDesordenHormonal?": {
        respuesta: string;
        observacion: string;
      };
      "¿algunaVezHaEstadoGravementeEnfermo?": {
        respuesta: string;
        observacion: string;
      };
      "¿haSidoIntervenidoQuirúrgicamente?": {
        respuesta: string;
        observacion: string;
      };
      "¿tomaMasDe8VasosDeAguaAlDía?": {
        respuesta: string;
        observacion: string;
      };
      "¿tomaFrecuentementeAspirinaOSimilar?": {
        respuesta: string;
        observacion: string;
      };
      "¿orinaFrecuentementeDuranteElDia (MasDe6VecesAlDía)?": {
        respuesta: string;
        observacion: string;
      };
      "¿estaBajoAlgunTipoDeMedicamenteOEstáBajoAlgúnTipoDeTratamientoMedico?": {
        respuesta: string;
        observacion: string;
      };
      "¿seCansaFacilmenteAlRealizarAlgúnEsfuerzoFísico?": {
        respuesta: string;
        observacion: string;
      };
      "¿hayAlgúnAlimentoQueUstedNoPuedeComer?": {
        respuesta: string;
        observacion: string;
      };
      "¿seSienteUstedNerviosoDuranteLaConsulta?": {
        respuesta: string;
        observacion: string;
      };
      "¿esAlergicoAAlgunaSustanciaOMedicamento?": {
        respuesta: string;
        observacion: string;
      };
      "¿estáUstedEmbarazada?": {
        respuesta: string;
        observacion: string;
      };
      "¿tomaAlgúnTipoDeTerapiaHormonalOAnticonceptivos?": {
        respuesta: string;
        observacion: string;
      };
      "¿fuma?": {
        respuesta: string;
        observacion: string;
      };
      "¿consumeAlcohol?": {
        respuesta: string;
        observacion: string;
      };
      "¿seMuerdeLasUñas?": {
        respuesta: string;
        observacion: string;
      };
      "¿seMuerdeLosLabios?": {
        respuesta: string;
        observacion: string;
      };
      "¿abreCosasConLosDientes?": {
        respuesta: string;
        observacion: string;
      };
      "¿otros?": {
        respuesta: string;
        observacion: string;
      };
      "¿haPresentadoAlgunaReacciónAlAnestesicoLocal?": {
        respuesta: string;
        observacion: string;
      };
      "¿haPresentadoMalOlorOSaborDeBoca (halitosis)?": {
        respuesta: string;
        observacion: string;
      };
      "¿estaSatisfechoConLaAparienciaDeSusDientes?": {
        respuesta: string;
        observacion: string;
      };
      "¿leSangranLasEncíasFrecuentemente?": {
        respuesta: string;
        observacion: string;
      };
      "¿sienteQueSusDientesSeMueven?": {
        respuesta: string;
        observacion: string;
      };
      "¿tieneSensibilidadODolorEnAlgunoDeSusDientes?": {
        respuesta: string;
        observacion: string;
      };
      "¿consumeMuchosAlimentosÁcidos,CalientesOFríos?": {
        respuesta: string;
        observacion: string;
      };
      "¿sienteResequedadEnLaBocaFrecuentemente?": {
        respuesta: string;
        observacion: string;
      };
      "¿sienteMolestiasPorUlceracionesEnLaBoca?": {
        respuesta: string;
        observacion: string;
      };
      "¿leMolestaOLeSuenaLaMandíbulaAlMasticar?": {
        respuesta: string;
        observacion: string;
      };
      observaciones: string;
    };
    antecedentesFamiliares: {
      "¿alteracionesCardiovasculares?": {
        respuesta: string;
        observacion: string;
      };
      "¿enfermedadesHemorrágicas?": {
        respuesta: string;
        observacion: string;
      };
      "¿alteracionesRenalesHepáticasOGastrointestinales?": {
        respuesta: string;
        observacion: string;
      };
      "¿diabetesMellitus?": {
        respuesta: string;
        observacion: string;
      };
      "¿hipertensiónOHipotensiónArterial?": {
        respuesta: string;
        observacion: string;
      };
      "¿enfermedadesInfecciosas?": {
        respuesta: string;
        observacion: string;
      };
      "¿enfermedadesDeTransmisiónSexual?": {
        respuesta: string;
        observacion: string;
      };
      "¿alergias?": {
        respuesta: string;
        observacion: string;
      };
      "¿cancer?": {
        respuesta: string;
        observacion: string;
      };
      observaciones: string;
    };
    signosVitales: {
      frecuenciaRespiratoria: string;
      pulso: string;
      temperatura: string;
      tensiónArterial: string;
    };
    examenClinicoExtrabucal: {
      "aspectoDelPaciente (Raza, talla, peso, biotipo)": string;
      "cabezaYCara (Forma, tamaño, inseción del cabello)": string;
      "gangliosLinfáticos (tamaño, consistencia, movilidad, localización y dolor)": string;
      "palpaciónTiroidea (Tamaño, consistencia, movilidad, superficie, dolor)": string;
      "palpaciónMuscular (Tono muscular, dolor)": string;
      "articulaciónTemporomandibular (Ruidos articular, movimientos patológicos mandibulares, dolor)": string;
    };
    examenClinicoIntrabucal: {
      "labiosYComisuraLabia (Patología o aspecto general)": string;
      "carrillos (Patología o aspecto general)": string;
      "paladarDuroYPaladarBlando (Patología o aspecto general de la mucosa)": string;
      "regiónAmigdalina (Patología o aspecto general de la mucosa)": string;
      "lenguaYPisoDeBoca (Patología o aspecto general mucosa)": string;
      "maxilares (Tipo y forma)": string;
      "saliva (Presencia, viscosidad, color)": string;
      "oclusión (Relación molar, proyección, perfil)": string;
    };
    examenPeriodontal: {
      color: string;
      consistencia: string;
      contorno: string;
      tamaño: string;
      textura: string;
      posición: string;
      tendenciaAlSangrado: {
        respuesta: string;
        porcentaje: number;
      };
      presenciaDePlacaBacteriana: string;
    };
    periodontodiagrama: File | null;
    registroDeControlDePlaca: File | null;
    diagnosticoDiferencial: string;
    diagnosticoDefinitivo: string;
    pronóstico: string;
    planDeTratamiento: string;
  };
}

export const medicalRecordInitialValues: IAddMedicalRecord = {
  historiaClinica: {
    motivoDeConsulta: "",
    enfermedadActual: "",
    anamnesis: {
      "¿alteracionesCardiovasculares?": {
        respuesta: "No",
        observacion: ""
      },
      "¿hemorragiasOSangradosFrecuentes?": {
        respuesta: "No",
        observacion: ""
      },
      "¿anemiaUOtraAlteraciónSanguinea?": {
        respuesta: "No",
        observacion: ""
      },
      "¿enfermedadesRenales?": {
        respuesta: "No",
        observacion: ""
      },
      "¿enfermedadesHepáticas?": {
        respuesta: "No",
        observacion: ""
      },
      "¿asmaOAlgunaDificultadParaRespirar?": {
        respuesta: "No",
        observacion: ""
      },
      "¿enfermedadesRespiratorias?": {
        respuesta: "No",
        observacion: ""
      },
      "¿diabetesMellitus?": {
        respuesta: "No",
        observacion: ""
      },
      "¿hipertensión?": {
        respuesta: "No",
        observacion: ""
      },
      "¿doloresDeCabezaFrecuentes,Migrañas,Jaquecas?": {
        respuesta: "No",
        observacion: ""
      },
      "¿fiebreReumática?": {
        respuesta: "No",
        observacion: ""
      },
      "¿enfermedadesInfecciosas?": {
        respuesta: "No",
        observacion: ""
      },
      "¿enfermedadesDeTransmisiónSexual?": {
        respuesta: "No",
        observacion: ""
      },
      "¿enfermedadesGastrointestinales?": {
        respuesta: "No",
        observacion: ""
      },
      "¿doloresDeOídosOZumbidos?": {
        respuesta: "No",
        observacion: ""
      },
      "¿seLeInflamanLosPiesOArticulacionesFrecuentemente?": {
        respuesta: "No",
        observacion: ""
      },
      "¿enfermedadesDeLosSenosParanasales (Sinusitis)?": {
        respuesta: "No",
        observacion: ""
      },
      "¿respiradorBucal?": {
        respuesta: "No",
        observacion: ""
      },
      "¿enfermedadCongenita?": {
        respuesta: "No",
        observacion: ""
      },
      "¿tieneAlgúnTipoDeDesordenHormonal?": {
        respuesta: "No",
        observacion: ""
      },
      "¿algunaVezHaEstadoGravementeEnfermo?": {
        respuesta: "No",
        observacion: ""
      },
      "¿haSidoIntervenidoQuirúrgicamente?": {
        respuesta: "No",
        observacion: ""
      },
      "¿tomaMasDe8VasosDeAguaAlDía?": {
        respuesta: "No",
        observacion: ""
      },
      "¿tomaFrecuentementeAspirinaOSimilar?": {
        respuesta: "No",
        observacion: ""
      },
      "¿orinaFrecuentementeDuranteElDia (MasDe6VecesAlDía)?": {
        respuesta: "No",
        observacion: ""
      },
      "¿estaBajoAlgunTipoDeMedicamenteOEstáBajoAlgúnTipoDeTratamientoMedico?": {
        respuesta: "No",
        observacion: ""
      },
      "¿seCansaFacilmenteAlRealizarAlgúnEsfuerzoFísico?": {
        respuesta: "No",
        observacion: ""
      },
      "¿hayAlgúnAlimentoQueUstedNoPuedeComer?": {
        respuesta: "No",
        observacion: ""
      },
      "¿seSienteUstedNerviosoDuranteLaConsulta?": {
        respuesta: "No",
        observacion: ""
      },
      "¿esAlergicoAAlgunaSustanciaOMedicamento?": {
        respuesta: "No",
        observacion: ""
      },
      "¿estáUstedEmbarazada?": {
        respuesta: "No",
        observacion: ""
      },
      "¿tomaAlgúnTipoDeTerapiaHormonalOAnticonceptivos?": {
        respuesta: "No",
        observacion: ""
      },
      "¿fuma?": {
        respuesta: "No",
        observacion: ""
      },
      "¿consumeAlcohol?": {
        respuesta: "No",
        observacion: ""
      },
      "¿seMuerdeLasUñas?": {
        respuesta: "No",
        observacion: ""
      },
      "¿seMuerdeLosLabios?": {
        respuesta: "No",
        observacion: ""
      },
      "¿abreCosasConLosDientes?": {
        respuesta: "No",
        observacion: ""
      },
      "¿otros?": {
        respuesta: "No",
        observacion: ""
      },
      "¿haPresentadoAlgunaReacciónAlAnestesicoLocal?": {
        respuesta: "No",
        observacion: ""
      },
      "¿haPresentadoMalOlorOSaborDeBoca (halitosis)?": {
        respuesta: "No",
        observacion: ""
      },
      "¿estaSatisfechoConLaAparienciaDeSusDientes?": {
        respuesta: "No",
        observacion: ""
      },
      "¿leSangranLasEncíasFrecuentemente?": {
        respuesta: "No",
        observacion: ""
      },
      "¿sienteQueSusDientesSeMueven?": {
        respuesta: "No",
        observacion: ""
      },
      "¿tieneSensibilidadODolorEnAlgunoDeSusDientes?": {
        respuesta: "No",
        observacion: ""
      },
      "¿consumeMuchosAlimentosÁcidos,CalientesOFríos?": {
        respuesta: "No",
        observacion: ""
      },
      "¿sienteResequedadEnLaBocaFrecuentemente?": {
        respuesta: "No",
        observacion: ""
      },
      "¿sienteMolestiasPorUlceracionesEnLaBoca?": {
        respuesta: "No",
        observacion: ""
      },
      "¿leMolestaOLeSuenaLaMandíbulaAlMasticar?": {
        respuesta: "No",
        observacion: ""
      },
      observaciones: ""
    },
    antecedentesFamiliares: {
      "¿alteracionesCardiovasculares?": {
        respuesta: "No",
        observacion: ""
      },
      "¿enfermedadesHemorrágicas?": {
        respuesta: "No",
        observacion: ""
      },
      "¿alteracionesRenalesHepáticasOGastrointestinales?": {
        respuesta: "No",
        observacion: ""
      },
      "¿diabetesMellitus?": {
        respuesta: "No",
        observacion: ""
      },
      "¿hipertensiónOHipotensiónArterial?": {
        respuesta: "No",
        observacion: ""
      },
      "¿enfermedadesInfecciosas?": {
        respuesta: "No",
        observacion: ""
      },
      "¿enfermedadesDeTransmisiónSexual?": {
        respuesta: "No",
        observacion: ""
      },
      "¿alergias?": {
        respuesta: "No",
        observacion: ""
      },
      "¿cancer?": {
        respuesta: "No",
        observacion: ""
      },
      observaciones: ""
    },
    signosVitales: {
      frecuenciaRespiratoria: "",
      pulso: "",
      temperatura: "",
      tensiónArterial: ""
    },
    examenClinicoExtrabucal: {
      "aspectoDelPaciente (Raza, talla, peso, biotipo)": "",
      "cabezaYCara (Forma, tamaño, inseción del cabello)": "",
      "gangliosLinfáticos (tamaño, consistencia, movilidad, localización y dolor)":
        "",
      "palpaciónTiroidea (Tamaño, consistencia, movilidad, superficie, dolor)":
        "",
      "palpaciónMuscular (Tono muscular, dolor)": "",
      "articulaciónTemporomandibular (Ruidos articular, movimientos patológicos mandibulares, dolor)":
        ""
    },
    examenClinicoIntrabucal: {
      "labiosYComisuraLabia (Patología o aspecto general)": "",
      "carrillos (Patología o aspecto general)": "",
      "paladarDuroYPaladarBlando (Patología o aspecto general de la mucosa)":
        "",
      "regiónAmigdalina (Patología o aspecto general de la mucosa)": "",
      "lenguaYPisoDeBoca (Patología o aspecto general mucosa)": "",
      "maxilares (Tipo y forma)": "",
      "saliva (Presencia, viscosidad, color)": "",
      "oclusión (Relación molar, proyección, perfil)": ""
    },
    examenPeriodontal: {
      color: "",
      consistencia: "",
      contorno: "",
      tamaño: "",
      textura: "",
      posición: "",
      tendenciaAlSangrado: {
        respuesta: "No",
        porcentaje: 0
      },
      presenciaDePlacaBacteriana: ""
    },
    periodontodiagrama: null,
    registroDeControlDePlaca: null,
    diagnosticoDiferencial: "",
    diagnosticoDefinitivo: "",
    pronóstico: "",
    planDeTratamiento: ""
  }
};

export const medicalRecordValidationSchema = object().shape({
  historiaClinica: object().shape({
    motivoDeConsulta: string()
      .trim()
      .required("Debe ingresar el motivo de la consulta"),
    enfermedadActual: string()
      .trim()
      .required("Debe ingresar la enfermedad actual"),
    signosVitales: object().shape({
      frecuenciaRespiratoria: string()
        .trim()
        .required("Debe ingresar la frecuencia respiratoria del paciente"),
      pulso: string()
        .trim()
        .required("Debe ingresar el pulso del paciente"),
      temperatura: string()
        .trim()
        .required("Debe ingresar la temperatura del paciente"),
      tensiónArterial: string()
        .trim()
        .required("Debe ingresar la tensión arterial del paciente")
    }),
    examenClinicoExtrabucal: object().shape({
      "aspectoDelPaciente (Raza, talla, peso, biotipo)": string()
        .trim()
        .required("Debe ingresar este campo"),
      "cabezaYCara (Forma, tamaño, inseción del cabello)": string()
        .trim()
        .required("Debe ingresar este campo"),
      "gangliosLinfáticos (tamaño, consistencia, movilidad, localización y dolor)": string()
        .trim()
        .required("Debe ingresar este campo"),
      "palpaciónTiroidea (Tamaño, consistencia, movilidad, superficie, dolor)": string()
        .trim()
        .required("Debe ingresar este campo"),
      "palpaciónMuscular (Tono muscular, dolor)": string()
        .trim()
        .required("Debe ingresar este campo"),
      "articulaciónTemporomandibular (Ruidos articular, movimientos patológicos mandibulares, dolor)": string()
        .trim()
        .required("Debe ingresar este campo")
    }),
    examenClinicoIntrabucal: object().shape({
      "labiosYComisuraLabia (Patología o aspecto general)": string()
        .trim()
        .required("Debe ingresar este campo"),
      "carrillos (Patología o aspecto general)": string()
        .trim()
        .required("Debe ingresar este campo"),
      "paladarDuroYPaladarBlando (Patología o aspecto general de la mucosa)": string()
        .trim()
        .required("Debe ingresar este campo"),
      "regiónAmigdalina (Patología o aspecto general de la mucosa)": string()
        .trim()
        .required("Debe ingresar este campo"),
      "lenguaYPisoDeBoca (Patología o aspecto general mucosa)": string()
        .trim()
        .required("Debe ingresar este campo"),
      "maxilares (Tipo y forma)": string()
        .trim()
        .required("Debe ingresar este campo"),
      "saliva (Presencia, viscosidad, color)": string()
        .trim()
        .required("Debe ingresar este campo"),
      "oclusión (Relación molar, proyección, perfil)": string()
        .trim()
        .required("Debe ingresar este campo")
    }),
    examenPeriodontal: object().shape({
      color: string()
        .trim()
        .required("Debe ingresar este campo"),
      consistencia: string()
        .trim()
        .required("Debe ingresar este campo"),
      contorno: string()
        .trim()
        .required("Debe ingresar este campo"),
      tamaño: string()
        .trim()
        .required("Debe ingresar este campo"),
      textura: string()
        .trim()
        .required("Debe ingresar este campo"),
      posición: string()
        .trim()
        .required("Debe ingresar este campo"),
      tendenciaAlSangrado: object().shape({
        respuesta: string()
          .trim()
          .required("Debe seleccionar una opción"),
        porcentaje: number()
          .min(0)
          .max(100)
      }),
      presenciaDePlacaBacteriana: string()
        .trim()
        .required("Debe ingresar este campo")
    }),
    diagnosticoDiferencial: string()
      .trim()
      .required("Debe ingresar este campo"),
    diagnosticoDefinitivo: string()
      .trim()
      .required("Debe ingresar este campo"),
    pronóstico: string()
      .trim()
      .required("Debe ingresar este campo"),
    planDeTratamiento: string()
      .trim()
      .required("Debe ingresar este campo")
  })
});

export interface IAddMedicalRecordRouteParams {
  id: string;
}

export interface IAddMedicalRecordMapStateToProps {
  token: string;
}

export type AddMedicalRecordPropsType = IAddMedicalRecordMapStateToProps &
  RouteComponentProps<IAddMedicalRecordRouteParams>;

class AddMedicalRecord extends Component<AddMedicalRecordPropsType> {
  medicalRecordService = new MedicalRecordService(this.props.token);

  onClickReturn = (): void => {
    const { history, match } = this.props;

    history.push(`/dashboard/pacientes/${match.params.id}/historiaclinica`);
  };

  render() {
    return (
      <Fragment>
        <Button onClick={this.onClickReturn}>Regresar</Button>

        <Container>
          <Formik
            initialValues={medicalRecordInitialValues}
            validationSchema={medicalRecordValidationSchema}
            onSubmit={async (values: IAddMedicalRecord, formikActions) => {
              window.scrollTo(0, 0);

              formikActions.setSubmitting(true);
              formikActions.setStatus({});

              try {
                const document = cloneDeep(values.historiaClinica);

                delete document.periodontodiagrama;
                delete document.registroDeControlDePlaca;

                const documentStringify = JSON.stringify(document);

                const formData = new FormData();

                formData.append("historiaClinica", documentStringify);
                formData.append(
                  "periodontodiagrama",
                  values.historiaClinica.periodontodiagrama!
                );
                formData.append(
                  "registroDeControlDePlaca",
                  values.historiaClinica.registroDeControlDePlaca!
                );

                const response = await this.medicalRecordService.addMedicalRecord(
                  {
                    historiaMedica: formData,
                    patientId: this.props.match.params.id
                  }
                );

                formikActions.resetForm();

                this.props.history.push(
                  `/dashboard/pacientes/${
                    this.props.match.params.id
                  }/historiaclinica/agregar/paso-1`
                );

                formikActions.setStatus({
                  success: response.data.message
                });
              } catch (error) {
                if (error.response) {
                  const response: AxiosResponse<IApiErrorResponse> =
                    error.response;

                  formikActions.setStatus({
                    error: response.data.message
                  });
                } else if (error.request) {
                  formikActions.setStatus({
                    error:
                      "No se pudo establecer una conexión con el servidor. Por favor, vuelva a intentarlo mas tarde"
                  });
                } else {
                  formikActions.setStatus({
                    error:
                      "Ha ocurrido un error. Por favor, vuelva a intentarlo mas tarde"
                  });
                }
              }

              formikActions.setSubmitting(false);
            }}
            component={MedicalRecordForm}
          />
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<
  IAddMedicalRecordMapStateToProps,
  RouteComponentProps<IAddMedicalRecordRouteParams>,
  IApplicationState
> = state => ({
  token: state.auth.token
});

export default connect<
  IAddMedicalRecordMapStateToProps,
  {},
  RouteComponentProps<IAddMedicalRecordRouteParams>,
  IApplicationState
>(mapStateToProps)(AddMedicalRecord);
