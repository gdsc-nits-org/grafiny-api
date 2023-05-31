import prisma from "src/utils/prisma";

const getAllCourses = async (id: string) => {
  try {
    const department = await prisma.department.findFirst({
      where: {
        id: id,
      },
    });

    if (!department) {
      throw new Error("No Such Department");
    }

    const courses = await prisma.course.findMany({
      where: {
        departmentId: department.id,
      },
      include: {
        topic: true,
      },
    });

    return courses;
  } catch (err) {
    return null;
  }
};

export default getAllCourses;
