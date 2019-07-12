import { AxiosPromise, AxiosRequestConfig } from "axios";
import { bind } from "decko";
import { Service } from "../service";
import { IApiResponse } from "../types";
import { IAddTriageRequest, IModifyTriageRequest } from "./types";

const apiUrl: string = process.env.REACT_APP_API_URL || "";

export class TriageService extends Service {
  constructor(token: string) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: `${apiUrl}/triage`,
      responseType: "json",
      headers: {
        Authorization: "Bearer " + token
      }
    };

    super(axiosConfig);
  }

  @bind
  addTriage(triage: IAddTriageRequest): AxiosPromise<IApiResponse> {
    return this.axios.post(`/${triage.patientId}`, triage.triaje, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  @bind
  modifyTriage(triage: IModifyTriageRequest): AxiosPromise<IApiResponse> {
    return this.axios.patch(`/${triage.patientId}`, triage.triaje, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }
}
