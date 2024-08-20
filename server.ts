import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "dotenv/config";
import * as admin from "firebase-admin";
import * as Middlewares from "./src/middlewares";
import * as Routers from "./src/routers";
import * as Constants from "./src/globals/constants";

const app = express();

// Middlewares
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

app
  .use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://dev--grafiny-nits.netlify.app",
        "https://grafiny-client.vercel.app",
        "https://main--grafiny-gdsc-nits.netlify.app",
        "https://grafiny-gdsc-nits.netlify.app",
        "https://grafiny-nits.netlify.app",
        "https://grafiny.gdscnits.in",
      ],
      credentials: true,
      exposedHeaders: ["set-cookie"],
    })
  )
  .use(helmet())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser());

// Routers
app.use(`${Constants.System.ROOT}/`, Routers.Health);
app.use(`${Constants.System.ROOT}/auth`, Routers.authRouter);
app.use(`${Constants.System.ROOT}/institute`, Routers.instituteRouter);
app.use(`${Constants.System.ROOT}/department`, Routers.departmentRouter);
app.use(`${Constants.System.ROOT}/semester`, Routers.semesterRouter);
app.use(`${Constants.System.ROOT}/course`, Routers.courseRouter);
app.use(`${Constants.System.ROOT}/topic`, Routers.topicRouter);
app.use(`${Constants.System.ROOT}/items`, Routers.itemsRouter);
app.use(`${Constants.System.ROOT}/profile`, Routers.profileRouter);
app.use(`${Constants.System.ROOT}/like`, Routers.toggleLikesRouter);
app.use(`${Constants.System.ROOT}/bookmark`, Routers.toggleBookmarkRouter);

// Error Handlers
app.use(Middlewares.Error.errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
