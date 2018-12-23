import React from "react";
import ReactDOM from "react-dom";
import Appbar from "./components/appbar/appbar";
import AppContainer from "./components/appContainer/appContainer";
import GlobalStyles from "./components/globalStyles/globalStyles";
import TopLevelRoutes from "./routes/topLevelRoutes";

ReactDOM.render(
    <AppContainer>
      <GlobalStyles/>
      <Appbar/>
      <TopLevelRoutes/>
    </AppContainer>
    , document.getElementById("root"));