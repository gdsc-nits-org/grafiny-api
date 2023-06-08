import hashedPassword from "../passwordhash";
import prisma from "src/utils/prisma";
import { User } from "src/interfaces";

const createAdminUser = async (user: User) => {
  const hash = hashedPassword(user.password);
  const createdUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hash,
      isAdmin: 1,
    },
  });
  return createdUser;
};

const createSuperAdminUser = async (user: User) => {
  const hash = hashedPassword(user.password);
  const createdUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hash,
      isAdmin: 2,
    },
  });
  return createdUser;
};

export { createAdminUser, createSuperAdminUser };
