import { Done } from "./strategy";
import prisma from "src/utils/prisma";

const deserialiseUserFunction = async (email: string, done: Done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

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
