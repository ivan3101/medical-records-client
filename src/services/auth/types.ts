import { IMedicalRecord, IPatient, ITriage } from "../types";

export interface IUser {
  id: number;
  nombre: string;
  apellido: string;
}

export interface ILoginStudentRequest {
  tempPassword: {
    cedula: string;
    contraseña: string;
  };
}

export interface ILoginStudentResponse {
  estudiante: IUser;
  historiaMedica: IMedicalRecord;
  paciente: IPatient;
  token: string;
  triaje: ITriage;
}
