import { User } from "@prisma/client";

const serialiseUserFunction = (
  user: User,
  done: (err: any, email?: string) => void
) => {
  done(null, user.email);
};

export default serialiseUserFunction;
