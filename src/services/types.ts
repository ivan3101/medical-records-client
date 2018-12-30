export interface IApiResponse<T> {
  data: T;
  httpStatus: number;
  message: string;
  status: string;
}

export interface IApiErrorResponse {
  httpStatus: number;
  message: string;
  status: string;
}
