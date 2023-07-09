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
app.use(`${Constants.System.ROOT}/auth`, Routers.authRouter);
app.use(`${Constants.System.ROOT}/institute`, Routers.instituteRouter);
app.use(`${Constants.System.ROOT}/department`, Routers.departmentRouter);
app.use(`${Constants.System.ROOT}/course`, Routers.courseRouter);
app.use(`${Constants.System.ROOT}/topic`, Routers.topicRouter);
app.use(`${Constants.System.ROOT}/items`, Routers.itemsRouter);

// Error Handlers
app.use(Middlewares.Error.errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
