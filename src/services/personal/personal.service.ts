import { AxiosPromise, AxiosRequestConfig } from "axios";
import { bind } from "decko";
import { Service } from "../service";
import { IApiResponse } from "../types";
import {
  IAddPersonalRequest,
  IGetAllPersonalsResponse,
  IGetPersonalByIdRequest,
  IGetPersonalByIdResponse,
  IModifyPersonalRequest
} from "./types";

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

  @bind
  addPersonal(personal: IAddPersonalRequest): AxiosPromise<IApiResponse> {
    return this.axios.post("", personal);
  }

  @bind
  getPersonalById(
    personalId: IGetPersonalByIdRequest
  ): AxiosPromise<IApiResponse<IGetPersonalByIdResponse>> {
    return this.axios.get(`/${personalId}`);
  }

  @bind
  modifyPersonal(personal: IModifyPersonalRequest): AxiosPromise<IApiResponse> {
    return this.axios.patch(`/${personal.personalId}`, {
      personal: personal.personal
    });
  }

  @bind
  removePersonal(personalId: string): AxiosPromise<IApiResponse> {
    return this.axios.delete(`/${personalId}`);
  }
}
