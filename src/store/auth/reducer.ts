import { Reducer } from "redux";
import { PayloadAction } from "typesafe-actions/dist/types";
import { ActionsPayloads, AuthActionTypes, IAuthState } from "./types";

const initialState: IAuthState = {
  isAuthenticated: false,
  role: undefined,
  user: undefined,
  medicalRecord: undefined,
  triage: undefined,
  professor: undefined,
  patient: undefined,
  redirectUrl: "/",
  token: ""
};

const reducer: Reducer<
  IAuthState,
  PayloadAction<AuthActionTypes, ActionsPayloads>
> = (
  state = initialState,
  action: PayloadAction<AuthActionTypes, ActionsPayloads>
) => {
  switch (action.type) {
    case AuthActionTypes.PUT_LOGIN_USER_STUDENT: {
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload
      };
    }

    case AuthActionTypes.PUT_LOGIN_USER_PERSONAL: {
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload
      };
    }

    case AuthActionTypes.PUT_REDIRECT_URL: {
      return {
        ...state,
        redirectUrl: action.payload.redirectUrl
      };
    }

    case AuthActionTypes.PUT_LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export { reducer as AuthReducer };
