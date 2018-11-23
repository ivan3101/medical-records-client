import {combineReducers, createStore} from "redux";
import themeReducer from "../reducers/theme.reducer";


export default () => {
    return createStore(
        combineReducers({
            theme: themeReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
}