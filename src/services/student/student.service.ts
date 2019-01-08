import { AxiosPromise, AxiosRequestConfig } from "axios";
import { bind } from "decko";
import { Service } from "../service";
import { IApiResponse } from "../types";
import { IGetAllStudentsResponse } from "./types";

const apiUrl = process.env.REACT_APP_API_URL;

export class StudentService extends Service {
  constructor(token: string) {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: `${apiUrl}/student`,
      responseType: "json",
      headers: {
        Authorization: "Bearer " + token
      }
    };

    super(axiosConfig);
  }

  @bind
  getAllStudents(
    startIndex?: string
  ): AxiosPromise<IApiResponse<IGetAllStudentsResponse>> {
    return this.axios.get("", {
      params: {
        startIndex
      }
    });
  }
}
