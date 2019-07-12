import { IPersonal } from "../personal/types";
import { IStudent } from "../student/types";
import { IMedicalRecord, IPatient, ITriage } from "../types";

export interface IAddOnHoldRequest {
  enespera: FormData;
  studentId: string;
}

export interface IOnhold {
  _id?: string;
  documento: Map<string, any>;
  estado: string;
  estudiante: string | IStudent;
  fechaDeCreacion: Date;
  modificacion: boolean;
  paciente: string | IPatient;
  profesor: string | IPersonal;
  tipo: string;
}

export interface IGetOnholdResponse {
  enEspera: IOnhold[];
}
