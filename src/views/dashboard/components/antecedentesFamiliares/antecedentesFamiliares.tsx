import React, { FunctionComponent } from "react";
import CardList from "../../../../components/cardList/cardList";
import Container from "../../../../components/container/container";
import { IMedicalRecord } from "../../../../services/types";

const AntecedentesFamiliares: FunctionComponent<{
  medicalRecord: IMedicalRecord;
}> = ({ medicalRecord }) => {
  const documentMap = new Map(Object.entries(medicalRecord.documento));

  return (
    <Container>
      <h2>Antecedentes Familiares</h2>
      <CardList elements={documentMap.get("antecedentesFamiliares")} />
    </Container>
  );
};

export default AntecedentesFamiliares;
