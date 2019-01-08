import { AxiosPromise, AxiosRequestConfig } from "axios";
import { bind } from "decko";
import { Service } from "../service";
import { IApiResponse } from "../types";
import {
  ILoginPersonalRequest,
  ILoginStudentRequest,
  ILoginStudentResponse
} from "./types";

const apiURL = process.env.REACT_APP_API_URL;

export class AuthService extends Service {
  constructor() {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: apiURL + "/auth",
      responseType: "json"
    };

    super(axiosConfig);
  }

  @bind
  loginStudent(
    tempPassword: ILoginStudentRequest
  ): AxiosPromise<IApiResponse<ILoginStudentResponse>> {
    return this.axios.post("/student", tempPassword);
  }

  @bind
  loginPersonal(
    personal: ILoginPersonalRequest
  ): AxiosPromise<IApiResponse<ILoginStudentResponse>> {
    return this.axios.post("/personal", personal);
  }
}
