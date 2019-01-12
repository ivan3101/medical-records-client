export interface IGetAllStudentsResponse {
  students: IStudent[];
  startIndex: string;
}

export interface IStudent {
  apellido: string;
  cedula: string;
  email: string;
  _id?: string;
  nombre: string;
  telefono: string;
}

export interface IAddStudentRequest {
  estudiante: IStudent;
}

export interface IGetStudentByIdResponse {
  estudiante: IStudent;
}

export interface IModifyStudentRequest {
  studentId: string;
  estudiante: IStudent;
}
