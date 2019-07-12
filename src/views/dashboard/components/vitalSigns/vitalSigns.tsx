import React, { FunctionComponent } from "react";
import CardList from "../../../../components/cardList/cardList";
import Container from "../../../../components/container/container";
import { IMedicalRecord } from "../../../../services/types";

export interface IMedicalRecordInfo {
  medicalRecord: IMedicalRecord;
}

const VitalSigns: FunctionComponent<IMedicalRecordInfo> = ({
  medicalRecord
}) => {
  const documentMap = new Map(Object.entries(medicalRecord.documento));

  return (
    <Container>
      <h2>Signos vitales</h2>
      <CardList elements={documentMap.get("signosVitales")} />
    </Container>
  );
};

export default VitalSigns;
