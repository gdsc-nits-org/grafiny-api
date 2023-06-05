import prisma from "src/utils/prisma";

const getDepartment = async (id: string) => {
  try {
    const department = await prisma.department.findFirst({
      where: {
        id: id,
      },
      include: {
        courses: true,
      },
    });
    return department;
  } catch (err) {
    return null;
  }
};

export default getDepartment;
