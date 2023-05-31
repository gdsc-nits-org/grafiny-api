import prisma from "src/utils/prisma";

const getAllTopics = async (id: string) => {
  try {
    const course = await prisma.course.findFirst({
      where: {
        id: id,
      },
    });

    if (!course) {
      return null;
    }

    const topics = await prisma.topic.findMany({
      where: {
        courseId: course.id,
      },
      include: {
        items: true,
      },
    });

    return topics;
  } catch (err) {
    return null;
  }
};

export default getAllTopics;
