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
  token: string;
}
