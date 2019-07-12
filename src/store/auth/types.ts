import { FormikActions } from "formik";
import { IUser } from "../../services/auth/types";
import { IPersonal } from "../../services/personal/types";
import { IMedicalRecord, IPatient, ITriage } from "../../services/types";
import { ILoginPersonal } from "../../views/login/loginPersonal/components/loginForm/loginFormContainer";
import { ILoginStudent } from "../../views/login/loginStudent/components/loginForm/loginFormContainer";

export interface IPutLoginUser {
  user: IUser;
  role: UserRole;
  token: string;
  medicalRecord: IMedicalRecord | undefined;
  triage: ITriage | undefined;
  professor: IPersonal | undefined;
  patient: IPatient | undefined;
}

export interface IFetchLoginUserStudent {
  formikActions: FormikActions<ILoginStudent>;
  tempPassword: {
    cedula: string;
    contraseña: string;
  };
}

export interface IFetchLoginUserPersonal {
  formikActions: FormikActions<ILoginPersonal>;
  personal: {
    nombreDeUsuario: string;
    contraseña: string;
  };
}

export interface IPutRedirectUrl {
  redirectUrl: string;
}

export enum AuthActionTypes {
  FETCH_LOGIN_USER_STUDENT = "@@auth/LOGIN_USER_STUDENT/FETCH",
  PUT_LOGIN_USER_STUDENT = "@@auth/LOGIN_USER_STUDENT/PUT",
  FETCH_LOGIN_USER_PERSONAL = "@@auth/LOGIN_USER_PERSONAL/FETCH",
  PUT_LOGIN_USER_PERSONAL = "@@auth/LOGIN_USER_PERSONAL/PUT",
  PUT_REDIRECT_URL = "@auth/REDIRECT_URL/PUT",
  PUT_LOGOUT = "@auth/LOGOUT/PUT"
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
  readonly redirectUrl: string;
  readonly token: string;
  readonly medicalRecord: IMedicalRecord | undefined;
  readonly triage: ITriage | undefined;
  readonly professor: IPersonal | undefined;
  readonly patient: IPatient | undefined;
}

export type ActionsPayloads = IPutLoginUser & IPutRedirectUrl;
