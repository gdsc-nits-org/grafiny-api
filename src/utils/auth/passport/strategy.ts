import { Strategy } from "passport-local";
import { User } from "@prisma/client";
import * as Errors from "../../../globals/errors/index";
import login from "../login";

type Done = (err: any, user?: User | false) => void;

const passportStrategyCallback = async (
  email: string,
  password: string,
  done: Done
) => {
  try {
    console.log(email, password, "yyyyyyyy");
    const user = await login(email, password);
    if (user) {
      return done(null, user);
    } else {
      return done(Errors.Auth.invalidCredentials, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

const passportLocalStrategy = new Strategy(
  { usernameField: "email" },
  passportStrategyCallback
);
export { Done };
export default passportLocalStrategy;
