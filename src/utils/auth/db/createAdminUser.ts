import hashedPassword from "../passwordhash";
import prisma from "src/utils/prisma";
import { User } from "src/interfaces";
import { AUTH_LEVEL } from "@prisma/client";

const createAdminUser = async (user: User) => {
  const hash = hashedPassword(user.password);
  const createdUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hash,
      authorisationLevel: AUTH_LEVEL.ADMIN,
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
      authorisationLevel: AUTH_LEVEL.SUPERADMIN,
    },
  });
  return createdUser;
};

export { createAdminUser, createSuperAdminUser };
