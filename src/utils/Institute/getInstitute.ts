import prisma from "src/utils/prisma";

const getInstitute = async (name: string) => {
  try {
    const institute = await prisma.institution.findFirst({
      where: {
        name: {
          contains: name.toUpperCase(),
        },
      },
      include: {
        departments: true,
      },
    });

    return institute;
  } catch (err) {
    return null;
  }
};

export default getInstitute;
