import React, { FunctionComponent } from "react";
import CardList from "../../../../components/cardList/cardList";
import Container from "../../../../components/container/container";
import { IMedicalRecordInfo } from "../vitalSigns/vitalSigns";

const Encias: FunctionComponent<IMedicalRecordInfo> = ({ medicalRecord }) => {
  const documentMap = new Map(Object.entries(medicalRecord.documento));

  return (
    <Container>
      <h2>Examen Periodontal</h2>
      <CardList elements={documentMap.get("examenPeriodontal")} />
    </Container>
  );
};

export default Encias;
