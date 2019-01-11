import { IPatient } from "../types";

export interface IGetAllPatientsResponse {
  patients: IPatient[];
  startIndex: string;
}

export interface IAddPatientRequest {
  paciente: IPatient;
}

export interface IModifyPatientRequest {
  patientId: string;
  paciente: IPatient;
}

export interface IGetPatientByIdResponse {
  paciente: IPatient;
}
