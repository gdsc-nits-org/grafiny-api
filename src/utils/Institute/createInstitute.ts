import prisma from "src/utils/prisma";

const createInstitute = async (name: string) => {
  try {
    const institute = await prisma.institution.create({
      data: {
        name: name.toUpperCase(),
      },
    });

    return institute;
  } catch (err) {
    return undefined;
  }
};

export default createInstitute;
