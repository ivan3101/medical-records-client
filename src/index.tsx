import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Appbar from "./components/appbar/appbar";
import GlobalStyles from "./components/globalStyles/globalStyles";
import * as serviceWorker from "./serviceWorker";
import Background from "./components/background/background";

ReactDOM.render(
    <Fragment>
      <GlobalStyles/>
      <Appbar/>
      <Background />
    </Fragment>
    , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
