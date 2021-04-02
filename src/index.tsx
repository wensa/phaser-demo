import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

/*
import Amplify from "aws-amplify";
import {
  region,
  userPoolId,
  identityPoolId,
  userPoolWebClientId,
  authDomain,
  baseUrl,
} from "./config";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region,
    userPoolId,
    identityPoolId,
    userPoolWebClientId,
  },
  oauth: {
    domain: authDomain,
    scope: [
      "phone",
      "email",
      "profile",
      "openid",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: `${baseUrl}/login_complete`,
    redirectSignOut: baseUrl,
    responseType: "code",
  },
});
*/
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
