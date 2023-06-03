import { Done } from "./strategy";
import { User } from "@prisma/client";

const deserialiseUserFunction = async (user: User, done: Done) => {
  try {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
};

export default deserialiseUserFunction;
