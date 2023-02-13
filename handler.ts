import app from "./server";
import serverless, { Handler } from "serverless-http";

const serverlessApp = serverless(app);

const handler: Handler = async (event, context) => {
  return await serverlessApp(event, context);
};

export { handler };
