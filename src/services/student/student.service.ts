import { AxiosPromise, AxiosRequestConfig } from "axios";
import { bind } from "decko";
import { Service } from "../service";
import { IApiResponse } from "../types";
import {
  IAddStudentRequest,
  IGetAllStudentsResponse,
  IGetFilteredStudentsResponse,
  IGetStudentByIdResponse,
  IModifyStudentRequest,
  IStudent
} from "./types";
import { IFilteredResults } from "../../views/dashboard/assignPatient/assignPatient";

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

  @bind
  getStudentById(
    studentId: string
  ): AxiosPromise<IApiResponse<IGetStudentByIdResponse>> {
    return this.axios.get(`/${studentId}`);
  }

  @bind
  addStudent(student: IAddStudentRequest): AxiosPromise<IApiResponse> {
    return this.axios.post("", student);
  }

  @bind
  modifyStudent(student: IModifyStudentRequest): AxiosPromise<IApiResponse> {
    return this.axios.patch(`/${student.studentId}`, {
      estudiante: student.estudiante
    });
  }

  @bind
  removeStudent(studentIndex: string): AxiosPromise<IApiResponse> {
    return this.axios.delete(`/${studentIndex}`);
  }

  @bind
  getFilteredStudents(
    filterText: string
  ): AxiosPromise<IApiResponse<IGetFilteredStudentsResponse>> {
    return this.axios.get("/filter", {
      params: {
        matchText: filterText
      }
    });
  }
}
