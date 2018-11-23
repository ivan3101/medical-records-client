import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import configureStore from './stores/configStore';
import ThemeProviderConnected from "./components/themeProviderConnected/themeProviderConnected";
import Container from "./components/container/container";
import GlobalStyles from "./components/globalstyles/globalstyles";
import Card from "./components/card/card";
import CardHeader from "./components/card/cardHeader/cardHeader";
import CardBody from "./components/card/cardBody/cardBody";
import CardGrid from "./components/cardGrid/cardGrid";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ThemeProviderConnected>
            <div>
                <GlobalStyles/>
            </div>
        </ThemeProviderConnected>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();