import {all, fork, takeLatest} from "redux-saga/effects";
import {loginPersonalFetch, loginStudentFetch} from "./auth.sagas";

export function *sagas() {
    yield all([
        fork(takeLatest, 'LOGIN_STUDENT/FETCH', loginStudentFetch),
        fork(takeLatest, 'LOGIN_PERSONAL/FETCH', loginPersonalFetch)
    ])
}