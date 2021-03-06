export interface IApiResponse<T = {}> {
  data: T;
  httpStatus: number;
  message: string;
  status: string;
}

export interface IApiErrorResponse {
  httpStatus: number;
  message: string;
  status: string;
}

export interface IMedicalRecord {
  active: boolean;
  documento: Map<string, string> | object;
  fechaDeCreacion: Date;
  paciente: string;
}

export interface IPatient {
  active?: boolean;
  apellido: string;
  cedula: string;
  direccion: string;
  edad: number;
  fechaDeNacimiento: Date;
  genero: string;
  _id?: string;
  lugarDeNacimiento: string;
  nombre: string;
  telefono: string;
  email: string;
}

export interface ITriage {
  active: boolean;
  documento: Map<string, string> | object;
  fechaDeCreacion: Date;
  numeroDeHistoria: {
    codigo: string;
    numero: number;
  };
  paciente: IPatient | string;
}
