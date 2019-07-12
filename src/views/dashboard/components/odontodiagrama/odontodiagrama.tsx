import React, { FunctionComponent } from "react";
import Container from "../../../../components/container/container";
import { ITriage } from "../../../../services/types";

const publicUrl = process.env.REACT_APP_PUBLIC_URL;

const Odontodiagrama: FunctionComponent<{ triage: ITriage }> = ({ triage }) => {
  const documentMap = new Map(Object.entries(triage.documento));

  return (
    <Container>
      <h2>Odontodiagrama</h2>
      <img
        src={publicUrl + "/" + documentMap.get("odontodiagrama")}
        alt="odontodiagrama"
      />
    </Container>
  );
};

export default Odontodiagrama;
