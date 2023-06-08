import prisma from "src/utils/prisma";

const getCourse = async (id: string) => {
  try {
    const course = await prisma.course.findFirst({
      where: {
        id: id,
      },
      include: {
        topic: true,
      },
    });

    return course;
  } catch (err) {
    throw new Error("Something Went Wrong...");
  }
};

export default getCourse;
