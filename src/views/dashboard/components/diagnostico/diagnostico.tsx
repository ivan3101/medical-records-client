import React, { FunctionComponent } from "react";
import CardListTitle from "../../../../components/cardList/cardListTitle/cardListTitle";
import Container from "../../../../components/container/container";
import { IMedicalRecordInfo } from "../vitalSigns/vitalSigns";

const Diagnostico: FunctionComponent<IMedicalRecordInfo> = ({
  medicalRecord
}) => {
  const documentMap = new Map(Object.entries(medicalRecord.documento));

  return (
    <Container>
      <h2>Diagnostico</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <CardListTitle>Diagnostico Diferencial</CardListTitle>
          {documentMap.get("diagnosticoDiferencial")}
        </li>
        <li>
          <CardListTitle>Diagnostico Definitivo</CardListTitle>
          {documentMap.get("diagnosticoDefinitivo")}
        </li>
        <li>
          <CardListTitle>Pronóstico</CardListTitle>
          {documentMap.get("pronóstico")}
        </li>
        <li>
          <CardListTitle>Plan de Tratamiento</CardListTitle>
          {documentMap.get("planDeTratamiento")}
        </li>
      </ul>
    </Container>
  );
};

export default Diagnostico;
