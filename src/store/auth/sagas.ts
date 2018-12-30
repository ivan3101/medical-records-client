import { AxiosResponse } from "axios";
import { all, call, cancel, fork, put, take } from "redux-saga/effects";
import { PayloadAction } from "typesafe-actions/dist/types";
import { AuthService } from "../../services/auth/auth.service";
import {
  ILoginPersonalResponse,
  ILoginStudentResponse
} from "../../services/auth/types";
import { IApiErrorResponse, IApiResponse } from "../../services/types";
import { putLoginUserPersonal, putLoginUserStudent } from "./actions";
import {
  AuthActionTypes,
  IFetchLoginUserPersonal,
  IFetchLoginUserStudent,
  UserRole
} from "./types";

const authService = new AuthService();

function* loginUserStudentFetch(
  action: PayloadAction<
    AuthActionTypes.FETCH_LOGIN_USER_STUDENT,
    IFetchLoginUserStudent
  >
) {
  try {
    const response: AxiosResponse<
      IApiResponse<ILoginStudentResponse>
    > = yield call(authService.loginStudent, {
      tempPassword: action.payload.tempPassword
    });

    const { estudiante, token } = response.data.data;

    yield put(
      putLoginUserStudent(
        {
          id: estudiante.id,
          nombre: estudiante.nombre,
          apellido: estudiante.apellido
        },
        token
      )
    );
  } catch (error) {
    if (error.response) {
      const response: AxiosResponse<IApiErrorResponse> = error.response;

      action.payload.formikActions.setStatus({
        error: response.data.message
      });
    } else if (error.request) {
      action.payload.formikActions.setStatus({
        error:
          "No se pudo establecer una conexión con el servidor. Por favor, vuelva a intentarlo mas tarde"
      });
    } else {
      action.payload.formikActions.setStatus({
        error: "Ha ocurrido un error. Por favor, vuelva a intentarlo mas tarde"
      });
    }
  }

  action.payload.formikActions.setSubmitting(false);
}

function* loginUserPersonalFetch(
  action: PayloadAction<
    AuthActionTypes.FETCH_LOGIN_USER_PERSONAL,
    IFetchLoginUserPersonal
  >
) {
  try {
    const response: AxiosResponse<
      IApiResponse<ILoginPersonalResponse>
    > = yield call(authService.loginPersonal, {
      personal: action.payload.personal
    });

    const { personal, token } = response.data.data;

    yield put(
      putLoginUserPersonal(
        {
          id: personal.id,
          nombre: personal.nombre,
          apellido: personal.apellido
        },
        token,
        personal.rol || UserRole.PROFESSOR
      )
    );
  } catch (error) {
    if (error.response) {
      const response: AxiosResponse<IApiErrorResponse> = error.response;

      action.payload.formikActions.setStatus({
        error: response.data.message
      });
    } else if (error.request) {
      action.payload.formikActions.setStatus({
        error:
          "No se pudo establecer una conexión con el servidor. Por favor, vuelva a intentarlo mas tarde"
      });
    } else {
      action.payload.formikActions.setStatus({
        error: "Ha ocurrido un error. Por favor, vuelva a intentarlo mas tarde"
      });
    }
  }

  action.payload.formikActions.setSubmitting(false);
}

function* watchLoginUserStudentFetch() {
  let lastTask;

  while (true) {
    const action: PayloadAction<
      AuthActionTypes.FETCH_LOGIN_USER_STUDENT,
      IFetchLoginUserStudent
    > = yield take(AuthActionTypes.FETCH_LOGIN_USER_STUDENT);

    if (lastTask) {
      yield cancel(lastTask);
    }

    lastTask = yield fork(loginUserStudentFetch, action);
  }
}

function* watchLoginUserPersonalFetch() {
  let lastTask;

  while (true) {
    const action: PayloadAction<
      AuthActionTypes.FETCH_LOGIN_USER_PERSONAL,
      IFetchLoginUserPersonal
    > = yield take(AuthActionTypes.FETCH_LOGIN_USER_PERSONAL);

    if (lastTask) {
      yield cancel(lastTask);
    }

    lastTask = yield fork(loginUserPersonalFetch, action);
  }
}

function* authSaga() {
  yield all([
    fork(watchLoginUserStudentFetch),
    fork(watchLoginUserPersonalFetch)
  ]);
}

export default authSaga;
