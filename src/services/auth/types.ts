import { UserRole } from "../../store/auth/types";
import { IMedicalRecord, IPatient, ITriage } from "../types";

export interface IUser {
  id: number;
  nombre: string;
  apellido: string;
  rol?: UserRole;
}

export interface ILoginStudentRequest {
  tempPassword: {
    cedula: string;
    contraseña: string;
  };
}

export interface ILoginPersonalRequest {
  personal: {
    nombreDeUsuario: string;
    contraseña: string;
  };
}

export interface ILoginPersonalResponse {
  personal: IUser;
  token: string;
}

export interface ILoginStudentResponse {
  estudiante: IUser;
  historiaMedica: IMedicalRecord;
  paciente: IPatient;
  token: string;
  triaje: ITriage;
}
