import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class Service {
  protected readonly axios: AxiosInstance;

  constructor(protected readonly axiosConfig: AxiosRequestConfig) {
    this.axios = Axios.create(axiosConfig);
  }
}
