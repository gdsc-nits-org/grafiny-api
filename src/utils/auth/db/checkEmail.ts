import { CustomValidator } from "express-validator";
import prisma from "src/utils/prisma";

const checkEmail: CustomValidator = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    throw new Error("User With This Email Already Exists");
  }
};

export default checkEmail;
