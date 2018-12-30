import { Reducer } from "redux";
import { PayloadAction } from "typesafe-actions/dist/types";
import { ActionsPayloads, AuthActionTypes, IAuthState } from "./types";

const initialState: IAuthState = {
  isAuthenticated: false,
  role: undefined,
  user: undefined
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
        isAuthenticated: true,
        role: action.payload.role,
        user: action.payload.user,
        token: action.payload.token
      };
    }

    default: {
      return state;
    }
  }
};

export { reducer as AuthReducer };
