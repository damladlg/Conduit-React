import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactValidatableFormProvider } from "react-validatable-form";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ReactValidatableFormProvider>
      <App />
    </ReactValidatableFormProvider>
  </Provider>
);

reportWebVitals();
