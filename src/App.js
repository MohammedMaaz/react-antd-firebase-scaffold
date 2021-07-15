import React from "react";
import dva from "dva";
import Router from "./Router";
import auth from "models/auth";
import router from "models/router";
import { globalErrorHandler } from "utils/errorHandler";
import "antd/dist/antd.css";
import "styles/lib.scss";
import "styles/global.scss";

export const app = dva({
  onError: globalErrorHandler,
});

app.model(auth);
app.model(router);

app.router(() => <Router />);
export default app.start();
