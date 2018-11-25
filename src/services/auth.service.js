import axios from "axios";
import {authEndPoints} from "./api.service";

export const loginStudentRequest = (data) => {
    return axios.post(authEndPoints.loginStudent, data);
};

export const loginPersonalRequest = (data) => {
    return axios.post(authEndPoints.loginPersonal, data);
};