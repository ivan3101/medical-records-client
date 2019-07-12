import { AxiosPromise, AxiosRequestConfig } from "axios";
import { bind } from "decko";
import { Service } from "../service";
import { IApiResponse, IPatient } from "../types";
import {
  IAddPatientRequest,
  IGetAllPatientsResponse,
  IGetFilteredPatientsResponse,
  IGetMedicalRecordByPatient,
  IGetPatientByIdResponse,
  IGetTriageByPatientResponse,
  IModifyPatientRequest
} from "./types";
import { IGetFilteredStudentsResponse } from "../student/types";

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

  @bind
  removePatient(patientId: string): AxiosPromise<IApiResponse> {
    return this.axios.delete(`/${patientId}`);
  }

  @bind
  getPatientById(
    patientId: string
  ): AxiosPromise<IApiResponse<IGetPatientByIdResponse>> {
    return this.axios.get(`/${patientId}`);
  }

  @bind
  modifyPatient(patient: IModifyPatientRequest): AxiosPromise<IApiResponse> {
    return this.axios.patch(`/${patient.patientId}`, {
      paciente: patient.paciente
    });
  }

  @bind
  getFilteredPatients(
    filterText: string
  ): AxiosPromise<IApiResponse<IGetFilteredPatientsResponse>> {
    return this.axios.get("/filter", {
      params: {
        matchText: filterText
      }
    });
  }

  @bind
  getTriageByPatient(
    patientId: string
  ): AxiosPromise<IApiResponse<IGetTriageByPatientResponse>> {
    return this.axios.get(`/${patientId}/triage`);
  }

  @bind
  getMedicalRecordByPatient(
    patientId: string
  ): AxiosPromise<IApiResponse<IGetMedicalRecordByPatient>> {
    return this.axios.get(`/${patientId}/medicalrecord`);
  }

  @bind
  clone(patientId: string, data: any): AxiosPromise<IApiResponse> {
    return this.axios.post(`/${patientId}/triage`, data);
  }
}
