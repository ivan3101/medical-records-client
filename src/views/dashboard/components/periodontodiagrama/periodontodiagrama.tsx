import React, { FunctionComponent } from "react";
import { IMedicalRecordInfo } from "../vitalSigns/vitalSigns";
import Container from "../../../../components/container/container";

const publicUrl = process.env.REACT_APP_PUBLIC_URL;

const Periodontodiagrama: FunctionComponent<IMedicalRecordInfo> = ({
  medicalRecord
}) => {
  const documentMap = new Map(Object.entries(medicalRecord.documento));

  return (
    <Container>
      <h2>Periodontodiagrama</h2>
      <img
        src={publicUrl + "/" + documentMap.get("periodontodiagrama")}
        alt="periodontodiagrama"
      />
    </Container>
  );
};

export default Periodontodiagrama;
