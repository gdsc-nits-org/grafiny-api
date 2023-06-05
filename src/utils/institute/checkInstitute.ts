import { CustomValidator } from "express-validator";
import prisma from "src/utils/prisma";

const checkInstitute: CustomValidator = async (name: string) => {
  const institute = await prisma.institution.findFirst({
    where: {
      name: name,
    },
  });

  if (institute) {
    throw new Error("Institute With This Name Already Exists");
  }
};

export default checkInstitute;
