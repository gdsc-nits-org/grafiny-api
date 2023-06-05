import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cookieSession from "cookie-session";
import passport from "passport";

import * as Middlewares from "./src/middlewares";
import * as Routers from "./src/routers";
import * as Constants from "./src/globals/constants";
import * as Utils from "./src/utils";
import { authRouter, instituteRouter, departmentRouter } from "./src/routers";

const app = express();

// Middlewares
app
  .use(
    cors({
      origin: ["http://127.0.0.1:3000"],
      credentials: true,
    })
  )
  .use(helmet())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(
    cookieSession({
      name: "session",
      keys: ["graffinykey"],
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session());

//passport
passport.use(Utils.Auth.passport.passportLocalStrategy);
passport.serializeUser(Utils.Auth.passport.serialiseUserFunction as any);
passport.deserializeUser(Utils.Auth.passport.deserialiseUserFunction);

// Routers
app.use(`${Constants.System.ROOT}/`, Routers.Health);
app.use(`${Constants.System.ROOT}/auth`, authRouter);
app.use(`${Constants.System.ROOT}/institute`, instituteRouter);
app.use(`${Constants.System.ROOT}/department`, departmentRouter);

// Error Handlers
app.use(Middlewares.Error.errorHandler);

export default app;
