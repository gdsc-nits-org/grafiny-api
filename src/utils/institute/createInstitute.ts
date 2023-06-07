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
    console.log(err);
    throw new Error("Could not create Institute...");
  }
};

export default createInstitute;
