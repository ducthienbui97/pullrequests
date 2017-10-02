import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";

import App from "./components/app/App";
import registerServiceWorker from "./services/registerServiceWorker";

import "./assets/styles.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
