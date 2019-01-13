import { UserRole } from "../../store/auth/types";

export interface IPersonal {
  active?: boolean;
  apellido: string;
  cedula: string;
  contraseña: string;
  email: string;
  _id?: string;
  nombreDeUsuario: string;
  nombre: string;
  rol: UserRole.ARCHIVE | UserRole.PROFESSOR;
  telefono: string;
}

export interface IGetAllPersonalsResponse {
  personals: IPersonal[];
  startIndex: string;
}

export interface IAddPersonalRequest {
  personal: IPersonal;
}

export interface IGetPersonalByIdRequest {
  personalId: string;
}

export interface IGetPersonalByIdResponse {
  personal: IPersonal;
}

export interface IModifyPersonalRequest {
  personalId: string;
  personal: IPersonal;
}
