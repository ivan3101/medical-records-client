export interface IPersonal {
  active: boolean;
  apellido: string;
  cedula: string;
  contraseña: string;
  email: string;
  _id: string;
  nombreDeUsuario: string;
  nombre: string;
  rol: string;
  telefono: string;
}

export interface IGetAllPersonalsResponse {
  personals: IPersonal[];
  startIndex: string;
}
