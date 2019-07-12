import React, { FunctionComponent } from "react";
import CardList from "../../../../components/cardList/cardList";
import Container from "../../../../components/container/container";
import { IMedicalRecordInfo } from "../vitalSigns/vitalSigns";

const Extrabucal: FunctionComponent<IMedicalRecordInfo> = ({
  medicalRecord
}) => {
  const documentMap = new Map(Object.entries(medicalRecord.documento));

  return (
    <Container>
      <h2>Examen Clinico Extrabucal (Cabeza y Cuello)</h2>
      <CardList elements={documentMap.get("examenClinicoExtrabucal")} />
    </Container>
  );
};

export default Extrabucal;
