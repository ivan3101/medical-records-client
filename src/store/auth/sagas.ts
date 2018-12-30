import { AxiosResponse } from "axios";
import { all, call, cancel, fork, put, take } from "redux-saga/effects";
import { PayloadAction } from "typesafe-actions/dist/types";
import { AuthService } from "../../services/auth/auth.service";
import { ILoginStudentResponse } from "../../services/auth/types";
import { IApiErrorResponse, IApiResponse } from "../../services/types";
import { putLoginUserStudent } from "./actions";
import { AuthActionTypes, IFetchLoginUserStudent } from "./types";

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

function* authSaga() {
  yield all([fork(watchLoginUserStudentFetch)]);
}

export default authSaga;
