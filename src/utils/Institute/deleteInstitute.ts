import prisma from "src/utils/prisma";

const deleteInstitute = async (name: string) => {
  try {
    const deletedInstitute = await prisma.institution.delete({
      where: {
        name: name.toUpperCase(),
      },
    });

    return deletedInstitute;
  } catch (err) {
    return null;
  }
};

export default deleteInstitute;
