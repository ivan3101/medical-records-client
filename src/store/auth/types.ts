import { FormikActions } from "formik";
import { IUser } from "../../services/auth/types";
import { ILoginStudent } from "../../views/login/loginStudent/components/loginForm/loginFormContainer";

export interface IPutLoginUserStudent {
  user: IUser;
  role: UserRole;
  token: string;
}

export interface IFetchLoginUserStudent {
  formikActions: FormikActions<ILoginStudent>;
  tempPassword: {
    cedula: string;
    contraseña: string;
  };
}

export enum AuthActionTypes {
  FETCH_LOGIN_USER_STUDENT = "@@auth/LOGIN_USER_STUDENT/FETCH",
  PUT_LOGIN_USER_STUDENT = "@@auth/LOGIN_USER_STUDENT/PUT"
}

export enum UserRole {
  STUDENT = "estudiante",
  PROFESSOR = "profesor",
  ARCHIVE = "archivo",
  ADMIN = "admin"
}

export interface IAuthState {
  readonly user: IUser | undefined;
  readonly role: UserRole | undefined;
  readonly isAuthenticated: boolean;
}

export type ActionsPayloads = IPutLoginUserStudent;
