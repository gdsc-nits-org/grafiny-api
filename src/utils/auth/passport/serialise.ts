import { User } from "@prisma/client";

const serialiseUserFunction = (
  user: User,
  done: (err: any, userobj?: User) => void
) => {
  user.password = "";
  done(null, user);
};

export default serialiseUserFunction;
