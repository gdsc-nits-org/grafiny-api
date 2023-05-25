import prisma from "src/utils/prisma";

const createCourse = async (name: string, id: string) => {
  try {
    const department = await prisma.department.findFirst({
      where: {
        id: id,
      },
    });

    if (!department) {
      throw new Error("No Such Department Found!!!");
    }

    const course = await prisma.course.create({
      data: {
        name: name,
        department: {
          connect: {
            id: department.id,
          },
        },
      },
    });

    return course;
  } catch (err) {
    return null;
  }
};

export default createCourse;
