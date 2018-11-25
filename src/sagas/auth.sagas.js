import {loginPersonalRequest, loginStudentRequest} from "../services/auth.service";
import {call, put} from "redux-saga/effects";
import {loginFailed, loginPersonalPut, loginStudentPut} from "../actions/auth.actions";


export function *loginStudentFetch(action) {
    try {
        const response = yield call(loginStudentRequest, {tempPassword: action.tempPassword});
        const responseBody = response.data;
        const { token, estudiante } = responseBody.data;

        yield put(loginStudentPut({
            token,
            name: `${estudiante.nombre} ${estudiante.apellido}`
        }));

    } catch (error) {
        const responseBody = error.response.data;
        yield put(loginFailed({ errorMsg: responseBody.message, errorType: 'student' }));
    }
}

export function *loginPersonalFetch(action) {
    try {
        const response = yield call(loginPersonalRequest, { personal: action.personal });
        const responseBody = response.data;
        const { token, personal } = responseBody.data;

        yield put(loginPersonalPut({
            token,
            name: `${personal.nombre} ${personal.apellido}`,
            rol: personal.rol
        }));

    } catch (error) {
        const responseBody = error.response.data;
        yield put(loginFailed({ errorMsg: responseBody.message, errorType: 'personal' }))
    }
}