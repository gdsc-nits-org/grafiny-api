import prisma from "src/utils/prisma";

const getAllDepartments = async (id: string) => {
  try {
    const institute = await prisma.institution.findFirst({
      where: {
        id: id,
      },
    });

    if (!institute) {
      throw new Error("No Such Institute Found");
    }

    const departments = await prisma.department.findMany({
      where: {
        instituteID: institute.id,
      },
      include: {
        courses: true,
      },
    });
    return departments;
  } catch (err) {
    throw new Error("Something Went Wrong...");
  }
};

export default getAllDepartments;
