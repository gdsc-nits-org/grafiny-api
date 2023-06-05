import prisma from "src/utils/prisma";

const createDepartment = async (name: string, instituteName: string) => {
  try {
    const institute = await prisma.institution.findFirst({
      where: {
        name: instituteName,
      },
    });

    if (!institute) {
      throw new Error("No Such Institute");
    }

    const department = await prisma.department.create({
      data: {
        name: name,
        institution: {
          connect: {
            id: institute.id,
          },
        },
      },
    });

    return department;
  } catch (err) {
    return null;
  }
};

export default createDepartment;
