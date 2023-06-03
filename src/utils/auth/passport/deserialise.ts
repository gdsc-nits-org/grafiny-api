import { Done } from "./strategy";
//import prisma from "src/utils/prisma";
import { User } from "@prisma/client";

const deserialiseUserFunction = async (user: User, done: Done) => {
  try {
    //console.log(email);
    /*  const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    */
    console.log(user, "xxxxxxxx");

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
