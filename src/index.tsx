import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter  } from "react-router-dom";
import "normalize.css";
import "./index.css";
import App from "./copmonents/App/App";
import { store } from "./store/Store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter >
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
