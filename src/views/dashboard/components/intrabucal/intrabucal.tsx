import React, { FunctionComponent } from "react";
import Container from "../../../../components/container/container";
import { IMedicalRecordInfo } from "../vitalSigns/vitalSigns";
import CardList from "../../../../components/cardList/cardList";

const Intrabucal: FunctionComponent<IMedicalRecordInfo> = ({
  medicalRecord
}) => {
  const documentMap = new Map(Object.entries(medicalRecord.documento));

  return (
    <Container>
      <h2>Examen Clinico Intrabucal</h2>
      <CardList elements={documentMap.get("examenClinicoIntrabucal")} />
    </Container>
  );
};

export default Intrabucal;
