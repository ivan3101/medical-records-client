import { action } from "typesafe-actions";
import { IUser } from "../../services/auth/types";
import {
  AuthActionTypes,
  IFetchLoginUserStudent,
  IPutLoginUserStudent,
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
  action<AuthActionTypes.PUT_LOGIN_USER_STUDENT, IPutLoginUserStudent>(
    AuthActionTypes.PUT_LOGIN_USER_STUDENT,
    {
      user,
      token,
      role: UserRole.STUDENT
    }
  );
