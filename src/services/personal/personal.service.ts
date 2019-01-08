import { AxiosPromise, AxiosRequestConfig } from "axios";
import { bind } from "decko";
import { Service } from "../service";
import { IApiResponse } from "../types";
import { IGetAllPersonalsResponse } from "./types";

const apiUrl = process.env.REACT_APP_API_URL;

export class PersonalService extends Service {
  constructor(token: string) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: apiUrl + "/personal",
      responseType: "json",
      headers: {
        Authorization: `bearer ${token}`
      }
    };

    super(axiosConfig);
  }

  @bind
  getAllPersonals(
    startIndex?: string
  ): AxiosPromise<IApiResponse<IGetAllPersonalsResponse>> {
    return this.axios.get("", {
      params: {
        startIndex
      }
    });
  }
}
