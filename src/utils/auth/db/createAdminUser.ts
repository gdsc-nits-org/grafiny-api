import hashedPassword from "../passwordhash";
import prisma from "src/utils/prisma";
import { User } from "src/interfaces";
import { LEVEL } from "@prisma/client";

const createAdminUser = async (user: User) => {
  const hash = hashedPassword(user.password);
  const status: LEVEL = "ONE";
  const createdUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hash,
      authorisationLevel: status,
    },
  });
  return createdUser;
};

const createSuperAdminUser = async (user: User) => {
  const hash = hashedPassword(user.password);
  const status: LEVEL = "TWO";
  const createdUser = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hash,
      authorisationLevel: status,
    },
  });
  return createdUser;
};

export { createAdminUser, createSuperAdminUser };
