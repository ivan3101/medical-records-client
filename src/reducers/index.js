import {combineReducers} from "redux";
import themeReducer from "./theme.reducer";
import authReducer from "./auth.reducer";

const reducers = combineReducers({
    theme: themeReducer,
    auth: authReducer
});

export default reducers;
