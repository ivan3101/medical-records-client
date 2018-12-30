import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { AuthReducer } from "./auth/reducer";
import authSaga from "./auth/sagas";
import { IAuthState } from "./auth/types";

export interface IApplicationState {
  auth: IAuthState;
}

export const rootReducer = combineReducers<IApplicationState>({
  auth: AuthReducer
});

export function* rootSaga() {
  yield all([fork(authSaga)]);
}
