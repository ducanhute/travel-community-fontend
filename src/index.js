import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

import App from "./App";
import "./index.css";
// import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId="845951462549-s21gnijajo9b813a49n8dib2064mcmeq.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </Provider>,
    document.getElementById("root")
);

// reportWebVitals();
