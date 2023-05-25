import prisma from "src/utils/prisma";

const getInstitute = async (name: string) => {
  try {
    const institute = await prisma.institution.findFirst({
      where: {
        name: name.toUpperCase(),
      },
    });

    return institute;
  } catch (err) {
    return undefined;
  }
};

export default getInstitute;
