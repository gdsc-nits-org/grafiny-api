import prisma from "src/utils/prisma";

const getAllDepartments = async () => {
  try {
    const departments = await prisma.department.findMany();
    return departments;
  } catch (err) {
    return null;
  }
};

export default getAllDepartments;
