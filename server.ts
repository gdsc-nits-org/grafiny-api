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
import { authRouter } from "./src/routers";

const app = express();

// Middlewares
app
  .use(cors())
  .use(helmet())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(
    cookieSession({
      name: "session",
      keys: [process.env.COOKIE_SECRET ?? "mysessionkey"],
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod",
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

// Error Handlers
app.use(Middlewares.Error.errorHandler);

export default app;
