import { IPatient } from "../types";

export interface IGetAllPatientsResponse {
  patients: IPatient[];
  startIndex: string;
}

export interface IAddPatientRequest {
  paciente: IPatient;
}
