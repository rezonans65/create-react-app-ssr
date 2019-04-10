import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import configureStore from "./store/configureStore";

const store = configureStore(window.__REDUX_STATE__ || {});

const AppBundle = (
  <ReduxProvider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>
);

window.onload = () => {
  const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;
  Loadable.preloadReady().then(() => {
    renderMethod(AppBundle, document.getElementById("root"));
  });
};

serviceWorker.unregister();
