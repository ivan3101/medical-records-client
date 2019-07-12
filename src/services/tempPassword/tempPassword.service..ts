import { AxiosPromise, AxiosRequestConfig } from "axios";
import { bind } from "decko";
import { Service } from "../service";
import { IApiResponse } from "../types";
import { IGeneratePasswordRequest, IGeneratePasswordResponse } from "./types";

const apiUrl = process.env.REACT_APP_API_URL;

export class TempPasswordService extends Service {
  constructor(token: string) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: `${apiUrl}/temppassword`,
      responseType: "json",
      headers: {
        Authorization: "Bearer " + token
      }
    };

    super(axiosConfig);
  }

  @bind
  generatePassword(
    data: IGeneratePasswordRequest
  ): AxiosPromise<IApiResponse<IGeneratePasswordResponse>> {
    return this.axios.post("", {
      tempPassword: data.tempPassword
    });
  }
}
