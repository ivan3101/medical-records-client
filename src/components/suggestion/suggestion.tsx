import React from "react";
import { IPersonal } from "../../services/personal/types";
import { IStudent } from "../../services/student/types";
import { IPatient } from "../../services/types";
import { IFilteredResults } from "../../views/dashboard/assignPatient/assignPatient";

const Suggestion = (
  suggestion: IFilteredResults<IStudent | IPatient | IPersonal>
) => {
  return (
    <div>{suggestion._source.nombre + " " + suggestion._source.apellido}</div>
  );
};

export default Suggestion;
