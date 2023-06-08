import prisma from "src/utils/prisma";

const getAllInstitute = async () => {
  try {
    const institutes = await prisma.institution.findMany({
      include: {
        departments: true,
      },
    });
    return institutes;
  } catch (err) {
    throw new Error("Something went wrong...");
  }
};

export default getAllInstitute;
