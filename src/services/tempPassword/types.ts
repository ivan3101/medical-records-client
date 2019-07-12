export interface IGeneratePasswordRequest {
  tempPassword: {
    cedula: string;
    estudiante: string;
    paciente: string;
    profesor: string;
  };
}

export interface IGeneratePasswordResponse {
  contraseña: string;
}
