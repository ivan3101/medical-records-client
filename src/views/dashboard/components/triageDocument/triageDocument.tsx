import React, { FunctionComponent } from "react";
import CardListTitle from "../../../../components/cardList/cardListTitle/cardListTitle";
import Container from "../../../../components/container/container";
import { ITriage } from "../../../../services/types";

const TriageDocument: FunctionComponent<{ triage: ITriage }> = ({ triage }) => {
  const documentMap = new Map(Object.entries(triage.documento));

  return (
    <Container>
      <h2>Triaje</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <CardListTitle>Numero de Historia</CardListTitle>
          {triage.numeroDeHistoria.codigo +
            "-" +
            triage.numeroDeHistoria.numero}
        </li>
        <li>
          <CardListTitle>Observaciones</CardListTitle>
          {documentMap.get("observaciones")}
        </li>
        <li>
          <CardListTitle>Requerimientos Clinicos del Paciente</CardListTitle>
          {documentMap.get("requerimientosClinicosDelPaciente").join(", ")}
        </li>
      </ul>
    </Container>
  );
};

export default TriageDocument;
