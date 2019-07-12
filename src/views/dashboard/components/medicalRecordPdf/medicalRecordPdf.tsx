import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";
import React from "react";
import ujapLogo from "../../../../assets/logo/ujap.png";
import { IMedicalRecord, IPatient, ITriage } from "../../../../services/types";

Font.register(`http://localhost:3000/OpenSans-Bold.ttf`, {
  family: "Oswald"
});

Font.register(`http://localhost:3000/OpenSans-Regular.ttf`, {
  family: "Open-sans"
});

const styles = StyleSheet.create({
  openSans: {
    fontFamily: "Open-sans"
  },
  fontBold: {
    fontFamily: "Oswald"
  },
  image: {
    height: "500px"
  }
});

const StyledPage = styled.Page`
  padding: 30pt 35pt;
  font-size: 12pt;
`;

const UjapLogo = styled.Image`
  width: 50px;
  height: 50px;
`;

const Section = styled.View`
  margin-bottom: 40pt;
`;

const Header = styled.View`
  display: inline-flex;
  flex-direction: row;
  margin-bottom: 40pt;
  justify-content: flex-start;
`;

const HeaderTitle = styled.View`
  justify-self: flex-start;
`;

const Title = styled.Text`
  text-align: center;
  margin-bottom: 10pt;
`;

const Row = styled.View`
  border-bottom-color: black;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  display: flex;
  flex-direction: row;
`;

const Table = styled.View`
  border: 1px solid black;
`;

const Left = styled.View`
  border-right-color: black;
  border-right-width: 1px;
  border-right-style: solid;
  width: 35%;
  padding: 5pt;
`;

const Right = styled.View`
  margin-left: 15pt;
  padding: 5pt;
  width: 65%;
`;

const getAnamnesis = (anamnesis: Map<string, any>) => {
  const rows = [];

  for (const [key, value] of anamnesis.entries()) {
    if (key !== "observaciones") {
      const words = key.replace(/([A-Z])/g, " $1");

      let camelCaseText;

      if (/^[a-z]$/.test(words.charAt(0))) {
        camelCaseText = words.charAt(0).toUpperCase() + words.slice(1);
      } else {
        camelCaseText =
          words.charAt(0) + words.charAt(1).toUpperCase() + words.slice(2);
      }

      const row = (
        <Row>
          <Left>
            <Text style={styles.fontBold}>{camelCaseText}:</Text>
          </Left>
          <Right>
            <Text style={styles.openSans}>
              {value.respuesta}. {value.observacion}
            </Text>
          </Right>
        </Row>
      );

      rows.push(row);
    }
  }

  return rows;
};

const MedicalRecordPdf = (medicalRecord: IMedicalRecord, triage: ITriage) => {
  if (medicalRecord && triage) {
    const mdDocument = new Map(Object.entries(medicalRecord.documento));
    const triageDocument = new Map(Object.entries(triage.documento));
    const publicUrl = process.env.REACT_APP_PUBLIC_URL;
    const anamnesisMap = new Map(Object.entries(mdDocument.get("anamnesis")));
    const Anamnesis = getAnamnesis(anamnesisMap);
    const antecedentesFamiliaresMap = new Map(
      Object.entries(mdDocument.get("antecedentesFamiliares"))
    );
    const AntecedentesFamiliares = getAnamnesis(antecedentesFamiliaresMap);
    const signosVitalesMap = new Map(
      Object.entries(mdDocument.get("signosVitales"))
    );
    const extrabucalMap = new Map(
      Object.entries(mdDocument.get("examenClinicoExtrabucal"))
    );
    const intrabucalMap = new Map(
      Object.entries(mdDocument.get("examenClinicoIntrabucal"))
    );
    const periodontalMap = new Map(
      Object.entries(mdDocument.get("examenPeriodontal"))
    );
    const sangradoMap = new Map(
      Object.entries(periodontalMap.get("tendenciaAlSangrado")!)
    );
    const patient = triage.paciente as IPatient;

    return (
      <Document>
        {/* Triaje */}
        <StyledPage wrap>
          <View style={styles.openSans}>
            <Header fixed>
              <View>
                <UjapLogo src={ujapLogo} />
              </View>
              <View>
                <View>
                  <Text> UNIVERSIDAD JOSÉ ANTONIO PÁEZ</Text>
                </View>
                <View>
                  <Text>FACULTAD DE CIENCAS DE LA SALUD</Text>
                </View>
                <View>
                  <Text>ESCUELA DE ODONTOLOGIA</Text>
                </View>
              </View>
            </Header>

            {/* Paciente Info */}
            <Section>
              <View>
                <Title style={styles.fontBold}>HOJA DE TRIAJE</Title>
              </View>
              <View>
                <Text style={styles.fontBold}>
                  NOMBRES Y APELLIDOS:{" "}
                  <Text style={styles.openSans}>
                    {patient.nombre + " " + patient.apellido}
                  </Text>{" "}
                </Text>
              </View>
              <View>
                <Text style={styles.fontBold}>
                  C.I.: <Text style={styles.openSans}>{patient.cedula}</Text>{" "}
                  EDAD:{" "}
                  <Text style={styles.openSans}>{patient.edad + " años"}</Text>{" "}
                  GENERO: <Text style={styles.openSans}>{patient.genero}</Text>{" "}
                  TELEFONO:{" "}
                  <Text style={styles.openSans}>{patient.telefono}</Text>
                </Text>
              </View>
              <View>
                <Text style={styles.fontBold}>
                  LUGAR Y FECHA DE NACIMIENTO:{" "}
                  <Text style={styles.openSans}>
                    {patient.lugarDeNacimiento +
                      " " +
                      format(
                        new Date(patient.fechaDeNacimiento),
                        "DD [de] MMMM [de] YYYY",
                        { locale: esLocale }
                      )}
                  </Text>
                </Text>
              </View>
              <View>
                <Text style={styles.fontBold}>
                  DIRECCIÓN:{" "}
                  <Text style={styles.openSans}>{patient.direccion}</Text>
                </Text>
              </View>
            </Section>

            {/* Odontodiagrama */}
            <Section>
              <View>
                <Title style={styles.fontBold}>Odontodiagrama</Title>
              </View>

              <View>
                <Image
                  src={`${publicUrl}/${triageDocument.get("odontodiagrama")}`}
                />
              </View>
            </Section>

            {/* Observaciones y Requerimientos Clinicos */}
            <Section>
              <View>
                <Text style={styles.fontBold}>
                  OBSERVACIONES:{" "}
                  <Text style={styles.openSans}>
                    {triageDocument.get("observaciones")}
                  </Text>
                </Text>
              </View>

              <View>
                <Text style={styles.fontBold}>
                  REQUERIMIENTOS CLÍNICOS DEL PACIENTE:{" "}
                  <Text style={styles.openSans}>
                    {triageDocument
                      .get("requerimientosClinicosDelPaciente")
                      .join(", ")}
                  </Text>
                </Text>
              </View>
            </Section>
          </View>
        </StyledPage>

        {/* Historia Clinica */}
        <StyledPage wrap>
          <View style={styles.openSans}>
            <Header fixed>
              <UjapLogo src={ujapLogo} />

              <HeaderTitle>
                <Text> UNIVERSIDAD JOSÉ ANTONIO PÁEZ</Text>
                <Text>FACULTAD DE CIENCAS DE LA SALUD</Text>
                <Text>ESCUELA DE ODONTOLOGIA</Text>
              </HeaderTitle>
            </Header>

            <Section>
              <View>
                <Text style={styles.fontBold}>
                  MOTIVO DE CONSULTA:{" "}
                  <Text style={styles.openSans}>
                    {mdDocument.get("motivoDeConsulta")}
                  </Text>
                </Text>
              </View>
              <View>
                <Text style={styles.fontBold}>
                  ENFERMEDAD ACTUAL:{" "}
                  <Text style={styles.openSans}>
                    {mdDocument.get("enfermedadActual")}
                  </Text>
                </Text>
              </View>
            </Section>

            {/* Anamnesis */}
            <Section>
              <View>
                <Title style={styles.fontBold}>ANAMENSIS</Title>
              </View>
              <Table>
                <Row>
                  <Text style={styles.fontBold}>
                    Padece usted o ha padecido de:
                  </Text>
                </Row>
                {Anamnesis}
              </Table>
              <Section>
                <Text style={styles.fontBold}>
                  OBSERVACIONES:{" "}
                  <Text style={styles.openSans}>
                    {anamnesisMap.get("observaciones")}
                  </Text>
                </Text>
              </Section>
            </Section>

            {/* Antecedentes Familiares */}
            <Section>
              <View>
                <Title style={styles.fontBold}>ANTECEDENTES FAMILIARES</Title>
              </View>
              <Table>
                <Row>
                  <Text style={styles.fontBold}>
                    Padece usted o ha padecido de:
                  </Text>
                </Row>
                {AntecedentesFamiliares}
              </Table>
              <Section>
                <View>
                  <Text style={styles.fontBold}>
                    OBSERVACIONES:{" "}
                    <Text style={styles.openSans}>
                      {antecedentesFamiliaresMap.get("observaciones")}
                    </Text>
                  </Text>
                </View>
              </Section>
            </Section>
          </View>
        </StyledPage>

        {/* Extrabucal */}
        <StyledPage wrap>
          <View style={styles.openSans}>
            <Header fixed>
              <UjapLogo src={ujapLogo} />

              <HeaderTitle>
                <Text> UNIVERSIDAD JOSÉ ANTONIO PÁEZ</Text>
                <Text>FACULTAD DE CIENCAS DE LA SALUD</Text>
                <Text>ESCUELA DE ODONTOLOGIA</Text>
              </HeaderTitle>
            </Header>

            <Section>
              <View>
                <Title style={styles.fontBold}>SIGNOS VITALES</Title>
              </View>

              <View>
                <Text style={styles.fontBold}>
                  FRECUENCIA RESPIRATORIA:{" "}
                  <Text style={styles.openSans}>
                    {signosVitalesMap.get("frecuenciaRespiratoria")}
                  </Text>
                </Text>
              </View>

              <View>
                <Text style={styles.fontBold}>
                  PULSO:{" "}
                  <Text style={styles.openSans}>
                    {signosVitalesMap.get("pulso")}
                  </Text>
                </Text>
              </View>

              <View>
                <Text style={styles.fontBold}>
                  TEMPERATURA:{" "}
                  <Text style={styles.openSans}>
                    {signosVitalesMap.get("temperatura")}
                  </Text>
                </Text>
              </View>

              <View>
                <Text style={styles.fontBold}>
                  TENSIÓN ARTERIAL:{" "}
                  <Text style={styles.openSans}>
                    {signosVitalesMap.get("tensiónArterial")}
                  </Text>
                </Text>
              </View>
            </Section>

            <Section>
              <View>
                <Title style={styles.fontBold}>
                  EXAMEN CLINICO EXTRABUCAL (Cabeza y Cuello)
                </Title>
              </View>

              <Table>
                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Aspecto del Paciente (Raza, talla, peso, biotipo)
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {extrabucalMap.get(
                        "aspectoDelPaciente (Raza, talla, peso, biotipo)"
                      )}
                    </Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Cabeza y Cara (Forma, tamaño, inseción del cabello)
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {extrabucalMap.get(
                        "cabezaYCara (Forma, tamaño, inseción del cabello)"
                      )}
                    </Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Ganglios Linfáticos (Tamaño, consistencia, movilidad,
                      localización y dolor)
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {extrabucalMap.get(
                        "gangliosLinfáticos (tamaño, consistencia, movilidad, localización y dolor)"
                      )}
                    </Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Palpación Tiroidea (Tamaño, consistencia, movilidad,
                      superficie, dolor)
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {extrabucalMap.get(
                        "palpaciónTiroidea (Tamaño, consistencia, movilidad, superficie, dolor)"
                      )}
                    </Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Palpación Muscular (Tono muscular, dolor)
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {extrabucalMap.get(
                        "palpaciónMuscular (Tono muscular, dolor)"
                      )}
                    </Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Articulación Temporomandibular (Ruidos articular,
                      movimientos patológicos mandibulares, dolor)
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {extrabucalMap.get(
                        "articulaciónTemporomandibular (Ruidos articular, movimientos patológicos mandibulares, dolor)"
                      )}
                    </Text>
                  </Right>
                </Row>
              </Table>
            </Section>
          </View>
        </StyledPage>

        {/* Intrabucal */}
        <StyledPage wrap>
          <View style={styles.openSans}>
            <Header fixed>
              <UjapLogo src={ujapLogo} />

              <HeaderTitle>
                <Text> UNIVERSIDAD JOSÉ ANTONIO PÁEZ</Text>
                <Text>FACULTAD DE CIENCAS DE LA SALUD</Text>
                <Text>ESCUELA DE ODONTOLOGIA</Text>
              </HeaderTitle>
            </Header>

            <Section>
              <View>
                <Title style={styles.fontBold}>EXAMEN CLINICO INTRABUCAL</Title>
              </View>

              <Table>
                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Labios y Comisura Labial (Patología o aspecto general)
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {intrabucalMap.get(
                        "labiosYComisuraLabia (Patología o aspecto general)"
                      )}
                    </Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Carrillos (Patología o aspecto general)
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {intrabucalMap.get(
                        "carrillos (Patología o aspecto general)"
                      )}
                    </Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Paladar Duro y Paladar Blando (Patología o aspecto general
                      de la mucosa)
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {intrabucalMap.get(
                        "paladarDuroYPaladarBlando (Patología o aspecto general de la mucosa)"
                      )}
                    </Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Región Amigdalina (Patología o aspecto general de la
                      mucosa)
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {intrabucalMap.get(
                        "regiónAmigdalina (Patología o aspecto general de la mucosa)"
                      )}
                    </Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Lengua y Piso de Boca (Patologia o aspecto general de la
                      mucosa)
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {intrabucalMap.get(
                        "lenguaYPisoDeBoca (Patología o aspecto general mucosa)"
                      )}
                    </Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Maxilares (Tipo y forma)
                    </Text>
                  </Left>
                  <Right>
                    <Text>{intrabucalMap.get("maxilares (Tipo y forma)")}</Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Saliva (Presencia, viscosidad, color)
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {intrabucalMap.get(
                        "saliva (Presencia, viscosidad, color)"
                      )}
                    </Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>Oclusión</Text>
                  </Left>
                  <Right>
                    <Text>
                      {intrabucalMap.get(
                        "oclusión (Relación molar, proyección, perfil)"
                      )}
                    </Text>
                  </Right>
                </Row>
              </Table>
            </Section>
          </View>
        </StyledPage>

        {/* Periodontal */}
        <StyledPage wrap>
          <View style={styles.openSans}>
            <Header fixed>
              <UjapLogo src={ujapLogo} />

              <HeaderTitle>
                <Text> UNIVERSIDAD JOSÉ ANTONIO PÁEZ</Text>
                <Text>FACULTAD DE CIENCAS DE LA SALUD</Text>
                <Text>ESCUELA DE ODONTOLOGIA</Text>
              </HeaderTitle>
            </Header>

            <Section>
              <View>
                <Title style={styles.fontBold}>EXAMEN PERIODONTAL</Title>
              </View>

              <Table>
                <Row>
                  <Left>
                    <Text style={styles.fontBold}>Color</Text>
                  </Left>
                  <Right>
                    <Text>{periodontalMap.get("color")}</Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>Consistencia</Text>
                  </Left>
                  <Right>
                    <Text>{periodontalMap.get("consistencia")}</Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>Contorno</Text>
                  </Left>
                  <Right>
                    <Text>{periodontalMap.get("Contorno")}</Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>Tamaño</Text>
                  </Left>
                  <Right>
                    <Text>{periodontalMap.get("tamaño")}</Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>Textura</Text>
                  </Left>
                  <Right>
                    <Text>{periodontalMap.get("textura")}</Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>Posición</Text>
                  </Left>
                  <Right>
                    <Text>{periodontalMap.get("posición")}</Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>Tendencia al sangrado</Text>
                  </Left>
                  <Right>
                    <Text>
                      {sangradoMap.get("respuesta")}.{" "}
                      {sangradoMap.get("porcentaje")}%
                    </Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>
                      Presencia de Placa Bacteriana
                    </Text>
                  </Left>
                  <Right>
                    <Text>
                      {periodontalMap.get("presenciaDePlacaBacteriana")}
                    </Text>
                  </Right>
                </Row>
              </Table>
            </Section>
          </View>
        </StyledPage>

        {/* Periodontodiagrama */}
        <StyledPage>
          <View style={styles.openSans}>
            <Header fixed>
              <UjapLogo src={ujapLogo} />

              <HeaderTitle>
                <Text>UNIVERSIDAD JOSÉ ANTONIO PÁEZ</Text>
                <Text>FACULTAD DE CIENCAS DE LA SALUD</Text>
                <Text>ESCUELA DE ODONTOLOGIA</Text>
              </HeaderTitle>
            </Header>

            <Section>
              <View>
                <Title style={styles.fontBold}>PERIODONTODIAGRAMA</Title>
              </View>
              <View>
                <Image
                  style={styles.image}
                  src={`${publicUrl}/${mdDocument.get("periodontodiagrama")}`}
                />
              </View>
            </Section>
          </View>
        </StyledPage>

        {/* Placa */}
        <StyledPage>
          <View style={styles.openSans}>
            <Header fixed>
              <UjapLogo src={ujapLogo} />

              <HeaderTitle>
                <Text>UNIVERSIDAD JOSÉ ANTONIO PÁEZ</Text>
                <Text>FACULTAD DE CIENCAS DE LA SALUD</Text>
                <Text>ESCUELA DE ODONTOLOGIA</Text>
              </HeaderTitle>
            </Header>

            <Section>
              <View>
                <Title style={styles.fontBold}>
                  REGISTRO DE CONTROL DE PLACA
                </Title>
              </View>
              <View>
                <Image
                  style={styles.image}
                  src={`${publicUrl}/${mdDocument.get(
                    "registroDeControlDePlaca"
                  )}`}
                />
              </View>
            </Section>
          </View>
        </StyledPage>

        {/* Diagnostico */}
        <StyledPage wrap>
          <View style={styles.openSans}>
            <Header fixed>
              <UjapLogo src={ujapLogo} />

              <HeaderTitle>
                <Text> UNIVERSIDAD JOSÉ ANTONIO PÁEZ</Text>
                <Text>FACULTAD DE CIENCAS DE LA SALUD</Text>
                <Text>ESCUELA DE ODONTOLOGIA</Text>
              </HeaderTitle>
            </Header>

            <Section>
              <Table>
                <Row>
                  <Left>
                    <Text style={styles.fontBold}>DIAGNOSTICO DIFERENCIAL</Text>
                  </Left>
                  <Right>
                    <Text>{mdDocument.get("diagnosticoDiferencial")}</Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>Diagnostico Definitivo</Text>
                  </Left>
                  <Right>
                    <Text>{mdDocument.get("diagnosticoDefinitivo")}</Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>PRONÓSTICO</Text>
                  </Left>
                  <Right>
                    <Text>{mdDocument.get("pronóstico")}</Text>
                  </Right>
                </Row>

                <Row>
                  <Left>
                    <Text style={styles.fontBold}>PLAN DE TRATAMIENTO</Text>
                  </Left>
                  <Right>
                    <Text>{mdDocument.get("planDeTratamiento")}</Text>
                  </Right>
                </Row>
              </Table>
            </Section>
          </View>
        </StyledPage>
      </Document>
    );
  } else {
    return <Document />;
  }
};

export default MedicalRecordPdf;
