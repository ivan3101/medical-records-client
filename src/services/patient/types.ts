import { IMedicalRecord, IPatient, ITriage } from "../types";
import { IFilteredResults } from "../../views/dashboard/assignPatient/assignPatient";

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

export interface IGetFilteredPatientsResponse {
  patients: Array<IFilteredResults<IPatient>>;
}

export interface IGetTriageByPatientResponse {
  triaje: ITriage;
}

export interface IGetMedicalRecordByPatient {
  historiaMedica: IMedicalRecord;
}
