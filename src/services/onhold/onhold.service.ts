import { AxiosPromise, AxiosRequestConfig } from "axios";
import { Service } from "../service";
import { bind } from "decko";
import { IApiResponse } from "../types";
import { IAddOnHoldRequest, IGetOnholdResponse } from "./types";

const apiUrl: string = process.env.REACT_APP_API_URL!;

export class OnholdService extends Service {
  constructor(token: string) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: apiUrl + "/onhold",
      responseType: "json",
      headers: {
        Authorization: `bearer ${token}`
      }
    };

    super(axiosConfig);
  }

  @bind
  addOnhold(onhold: IAddOnHoldRequest): AxiosPromise<IApiResponse> {
    return this.axios.post(`/${onhold.studentId}`, onhold.enespera, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  @bind
  getOnHoldsByProfessor(
    professorId: string
  ): AxiosPromise<IApiResponse<IGetOnholdResponse>> {
    return this.axios.get(`/${professorId}`);
  }

  @bind
  approveOnHold(
    onholdId: string,
    professorId: string
  ): AxiosPromise<IApiResponse> {
    return this.axios.post(`/${onholdId}/approve/${professorId}`);
  }

  @bind
  rejectOnHold(
    onholdId: string,
    professorId: string
  ): AxiosPromise<IApiResponse> {
    return this.axios.post(`/${onholdId}/reject/${professorId}`);
  }

  @bind
  getOnHoldsByStudent(
    studentId: string,
    patientId: string
  ): AxiosPromise<IApiResponse<IGetOnholdResponse>> {
    return this.axios.get(`/student/${studentId}/patient/${patientId}`);
  }
}
