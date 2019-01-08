import { AxiosPromise, AxiosRequestConfig } from "axios";
import { bind } from "decko";
import { Service } from "../service";
import { IApiResponse } from "../types";
import { IAddPatientRequest, IGetAllPatientsResponse } from "./types";

const apiUrl = process.env.REACT_APP_API_URL;

export class PatientService extends Service {
  constructor(token: string) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: apiUrl + "/patient",
      responseType: "json",
      headers: {
        Authorization: `bearer ${token}`
      }
    };

    super(axiosConfig);
  }

  @bind
  getAllPatients(
    startIndex?: string
  ): AxiosPromise<IApiResponse<IGetAllPatientsResponse>> {
    return this.axios.get("", {
      params: {
        startIndex
      }
    });
  }

  @bind
  addPatient(patient: IAddPatientRequest): AxiosPromise<IApiResponse> {
    return this.axios.post("", patient);
  }
}
