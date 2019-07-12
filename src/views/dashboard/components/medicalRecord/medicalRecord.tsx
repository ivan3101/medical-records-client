import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { IMedicalRecord, ITriage } from "../../../../services/types";
import Odontodiagrama from "../odontodiagrama/odontodiagrama";
import PatientInfo from "../patientInfo/patientInfo";
import TriageDocument from "../triageDocument/triageDocument";
import Anamnesis from "../anamnesis/anamnesis";
import AntecedentesFamiliares from "../antecedentesFamiliares/antecedentesFamiliares";
import VitalSigns from "../vitalSigns/vitalSigns";
import Extrabucal from "../extrabucal/extrabucal";
import Intrabucal from "../intrabucal/intrabucal";
import Encias from "../encias/encias";
import Periodontodiagrama from "../periodontodiagrama/periodontodiagrama";
import Placa from "../placa/placa";
import Diagnostico from "../diagnostico/diagnostico";

export interface IMedicalRecordProps {
  triage: ITriage | null;
  medicalRecord: IMedicalRecord | null;
}

const MedicalRecordContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 5rem;
  margin-top: 3rem;
`;

const MedicalRecord: FunctionComponent<IMedicalRecordProps> = ({
  medicalRecord,
  triage
}) => {
  if (!triage && !medicalRecord) {
    return <h1>No se encontro la historia medica del paciente</h1>;
  } else {
    return (
      <MedicalRecordContainer>
        <div>
          {!!triage && <PatientInfo triage={triage} />}
          <br />
          {!!triage && <Odontodiagrama triage={triage} />}
          <br />
          {!!medicalRecord && (
            <AntecedentesFamiliares medicalRecord={medicalRecord} />
          )}
          <br />
          {!!medicalRecord && <VitalSigns medicalRecord={medicalRecord} />}
          <br />
          {!!medicalRecord && <Extrabucal medicalRecord={medicalRecord} />}
          <br />
          {!!medicalRecord && <Intrabucal medicalRecord={medicalRecord} />}
          <br />
          {!!medicalRecord && <Encias medicalRecord={medicalRecord} />}
          <br />
          {!!medicalRecord && (
            <Periodontodiagrama medicalRecord={medicalRecord} />
          )}
          <br />
          {!!medicalRecord && <Placa medicalRecord={medicalRecord} />}
          <br />
          {!!medicalRecord && <Diagnostico medicalRecord={medicalRecord} />}
        </div>
        <div>
          {!!triage && <TriageDocument triage={triage} />}
          <br />
          {!!medicalRecord && <Anamnesis medicalRecord={medicalRecord} />}
        </div>
      </MedicalRecordContainer>
    );
  }
};

export default MedicalRecord;
