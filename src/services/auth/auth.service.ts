import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import { bind } from "decko";
import { IApiResponse } from "../types";
import { ILoginStudentRequest, ILoginStudentResponse } from "./types";

const apiURL = process.env.REACT_APP_API_URL;

export class AuthService {
  private readonly axiosConfig: AxiosRequestConfig = {
    baseURL: apiURL,
    responseType: "json"
  };
  private readonly axios: AxiosInstance = Axios.create(this.axiosConfig);

  @bind
  loginStudent(
    tempPassword: ILoginStudentRequest
  ): AxiosPromise<IApiResponse<ILoginStudentResponse>> {
    return this.axios.post("/auth/student", tempPassword);
  }
}
