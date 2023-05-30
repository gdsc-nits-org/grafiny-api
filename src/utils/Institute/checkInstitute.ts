import { CustomValidator } from "express-validator";
import prisma from "src/utils/prisma";

const checkInstitute: CustomValidator = async (name: string) => {
  const user = await prisma.user.findFirst({
    where: {
      name: name.toUpperCase(),
    },
  });

  if (user) {
    throw new Error("Institute With This Name Already Exists");
  }
};

export default checkInstitute;
