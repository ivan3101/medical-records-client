import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Appbar from "./components/appbar/appbar";
import AppContainer from "./components/appContainer/appContainer";
import GlobalStyles from "./components/globalStyles/globalStyles";
import configureStore from "./configureStore";
import TopLevelRoutes from "./routes/topLevelRoutes";
import { rootReducer } from "./store";

const store = configureStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer>
      <GlobalStyles />
      <Appbar />
      <TopLevelRoutes />
    </AppContainer>
  </Provider>,

  document.getElementById("root")
);
