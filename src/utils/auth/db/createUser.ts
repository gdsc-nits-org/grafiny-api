import hashedPassword from "../passwordhash";
import prisma from "src/utils/prisma";
import { User } from "src/interfaces";

const createUser = async (user: User) => {
  const hash = hashedPassword(user.password);
  const createdUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hash,
    },
  });
  return createdUser;
};

export default createUser;
