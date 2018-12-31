import { action } from "typesafe-actions";
import { IUser } from "../../services/auth/types";
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

export const putLoginUserStudent = (user: IUser, token: string) =>
  action<AuthActionTypes.PUT_LOGIN_USER_STUDENT, IPutLoginUser>(
    AuthActionTypes.PUT_LOGIN_USER_STUDENT,
    {
      user,
      token,
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
