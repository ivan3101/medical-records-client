import React, { FunctionComponent } from "react";
import CardListTitle from "../../../../components/cardList/cardListTitle/cardListTitle";
import Container from "../../../../components/container/container";
import { IPatient, ITriage } from "../../../../services/types";

const PatientInfo: FunctionComponent<{ triage: ITriage }> = ({ triage }) => {
  const patient: IPatient = triage.paciente as IPatient;

  return (
    <Container>
      <h2>Paciente</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <CardListTitle>Nombre</CardListTitle>
          {patient.nombre + " " + patient.apellido}
        </li>
        <li>
          <CardListTitle>Cedula</CardListTitle>
          {patient.cedula}
        </li>
        <li>
          <CardListTitle>Genero</CardListTitle>
          {patient.genero}
        </li>
        <li>
          <CardListTitle>Edad</CardListTitle>
          {patient.edad} años
        </li>
        <li>
          <CardListTitle>Telefono</CardListTitle>
          {patient.telefono}
        </li>
      </ul>
    </Container>
  );
};

export default PatientInfo;
