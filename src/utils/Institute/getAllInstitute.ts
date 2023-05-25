import prisma from "src/utils/prisma";

const getAllInstitute = async () => {
  try {
    const institutes = await prisma.institution.findMany();
    return institutes;
  } catch (err) {
    return null;
  }
};

export default getAllInstitute;
