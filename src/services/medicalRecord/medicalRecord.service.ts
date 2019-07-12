import { AxiosPromise, AxiosRequestConfig } from "axios";
import { bind } from "decko";
import { Service } from "../service";
import { IApiResponse } from "../types";
import { IAddMedicalRecordRequest, IModifyMedicalRecordRequest } from "./types";

const apiUrl: string = process.env.REACT_APP_API_URL!;

export class MedicalRecordService extends Service {
  constructor(token: string) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: apiUrl + "/medicalrecord",
      responseType: "json",
      headers: {
        Authorization: `bearer ${token}`
      }
    };

    super(axiosConfig);
  }

  @bind
  addMedicalRecord(
    medicalRecord: IAddMedicalRecordRequest
  ): AxiosPromise<IApiResponse> {
    return this.axios.post(
      `/${medicalRecord.patientId}`,
      medicalRecord.historiaMedica,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  }

  @bind
  modifyMedicalRecord(
    medicalRecord: IModifyMedicalRecordRequest
  ): AxiosPromise<IApiResponse> {
    return this.axios.patch(
      `/${medicalRecord.patientId}`,
      medicalRecord.historiaMedica,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
  }
}
