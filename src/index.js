import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import store from './stores/configStore';
import ThemeProviderConnected from "./components/themeProviderConnected/themeProviderConnected";
import GlobalStyles from "./components/globalstyles/globalstyles";
import Appbar from "./components/appbar/appbar";
import {BrowserRouter as Router} from "react-router-dom";
import TopLevelRoutes from "./routes/topLevelRoutes";

ReactDOM.render(
    <Provider store={store}>
        <ThemeProviderConnected>
            <div>
                <GlobalStyles/>
                <Appbar/>
                <Router>
                    <TopLevelRoutes/>
                </Router>
            </div>
        </ThemeProviderConnected>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();