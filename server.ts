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
import {
  authRouter,
  instituteRouter,
  departmentRouter,
  courseRouter,
  topicRouter,
  profileRouter,
  uploadRouter,
} from "./src/routers";

const app = express();

// Middlewares
app
  .use(
    cors({
      origin: "*",
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
      keys: [process.env.GRAFINY_KEY!],
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "prod",
    })
  )
  .use(passport.initialize())
  .use(passport.session());

//passport
passport.use(Utils.Auth.passport.passportLocalStrategy);
passport.serializeUser(Utils.Auth.passport.serialiseUserFunction);
passport.deserializeUser(Utils.Auth.passport.deserialiseUserFunction);

// Routers
app.use(`${Constants.System.ROOT}/`, Routers.Health);
app.use(`${Constants.System.ROOT}/auth`, authRouter);
app.use(`${Constants.System.ROOT}/institute`, instituteRouter);
app.use(`${Constants.System.ROOT}/department`, departmentRouter);
app.use(`${Constants.System.ROOT}/course`, courseRouter);
app.use(`${Constants.System.ROOT}/topic`, topicRouter);
app.use(`${Constants.System.ROOT}/profile`, profileRouter);
app.use(`${Constants.System.ROOT}/file`, uploadRouter);

// Error Handlers
app.use(Middlewares.Error.errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
