import prisma from "src/utils/prisma";

const getCourse = async (id: string) => {
  try {
    const course = await prisma.course.findFirst({
      where: {
        id: id,
      },
    });

    return course;
  } catch (err) {
    return null;
  }
};

export default getCourse;
