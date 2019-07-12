import React, { FunctionComponent } from "react";
import CardList from "../../../../components/cardList/cardList";
import CardListTitle from "../../../../components/cardList/cardListTitle/cardListTitle";
import Container from "../../../../components/container/container";
import { IMedicalRecord } from "../../../../services/types";

const Anamnesis: FunctionComponent<{ medicalRecord: IMedicalRecord }> = ({
  medicalRecord
}) => {
  const documentMap = new Map(Object.entries(medicalRecord.documento));

  return (
    <Container>
      <h2>Historia clinica</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <CardListTitle>Motivo de Consulta</CardListTitle>
          {documentMap.get("motivoDeConsulta")}
        </li>
        <li>
          <CardListTitle>Enfermedad Actual</CardListTitle>
          {documentMap.get("enfermedadActual")}
        </li>
        <li>
          <CardListTitle>Anamnesis</CardListTitle>
          <CardList elements={documentMap.get("anamnesis")} />
        </li>
      </ul>
    </Container>
  );
};

export default Anamnesis;
