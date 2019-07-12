import { action } from "typesafe-actions";
import { IUser } from "../../services/auth/types";
import { IPersonal } from "../../services/personal/types";
import { IMedicalRecord, IPatient, ITriage } from "../../services/types";
import {
  AuthActionTypes,
  IFetchLoginUserPersonal,
  IFetchLoginUserStudent,
  IPutLoginUser,
  IPutRedirectUrl,
  UserRole
} from "./types";

export const fetchLoginUserStudent = (loginInfo: IFetchLoginUserStudent) =>
  action<AuthActionTypes.FETCH_LOGIN_USER_STUDENT, IFetchLoginUserStudent>(
    AuthActionTypes.FETCH_LOGIN_USER_STUDENT,
    {
      ...loginInfo
    }
  );

export const putLoginUserStudent = (
  user: IUser,
  token: string,
  medicalRecord: IMedicalRecord,
  triage: ITriage,
  professor: IPersonal,
  patient: IPatient
) =>
  action<AuthActionTypes.PUT_LOGIN_USER_STUDENT, IPutLoginUser>(
    AuthActionTypes.PUT_LOGIN_USER_STUDENT,
    {
      user,
      token,
      medicalRecord,
      professor,
      triage,
      patient,
      role: UserRole.STUDENT
    }
  );

export const fetchLoginUserPersonal = (loginInfo: IFetchLoginUserPersonal) =>
  action<AuthActionTypes.FETCH_LOGIN_USER_PERSONAL, IFetchLoginUserPersonal>(
    AuthActionTypes.FETCH_LOGIN_USER_PERSONAL,
    {
      ...loginInfo
    }
  );

export const putLoginUserPersonal = (
  user: IUser,
  token: string,
  role: UserRole
) =>
  action<AuthActionTypes.PUT_LOGIN_USER_PERSONAL, IPutLoginUser>(
    AuthActionTypes.PUT_LOGIN_USER_PERSONAL,
    {
      user,
      token,
      triage: undefined,
      professor: undefined,
      medicalRecord: undefined,
      patient: undefined,
      role
    }
  );

export const putRedirectUrl = (redirectUrl: string) =>
  action<AuthActionTypes.PUT_REDIRECT_URL, IPutRedirectUrl>(
    AuthActionTypes.PUT_REDIRECT_URL,
    {
      redirectUrl
    }
  );

export const putLogout = () =>
  action<AuthActionTypes.PUT_LOGOUT>(AuthActionTypes.PUT_LOGOUT);
