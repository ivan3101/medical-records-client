import React, { FunctionComponent } from "react";
import Container from "../../../../components/container/container";
import { IMedicalRecordInfo } from "../vitalSigns/vitalSigns";

const publicUrl = process.env.REACT_APP_PUBLIC_URL;

const Placa: FunctionComponent<IMedicalRecordInfo> = ({ medicalRecord }) => {
  const documentMap = new Map(Object.entries(medicalRecord.documento));

  return (
    <Container>
      <h2>Registro de Control de Placa</h2>
      <img
        src={publicUrl + "/" + documentMap.get("registroDeControlDePlaca")}
        alt="registro de control de placa"
      />
    </Container>
  );
};

export default Placa;
