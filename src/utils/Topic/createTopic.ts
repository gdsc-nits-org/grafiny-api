import prisma from "src/utils/prisma";

const createTopic = async (name: string, id: string) => {
  try {
    const course = await prisma.course.findFirst({
      where: {
        id: id,
      },
    });

    if (!course) {
      throw new Error("No Such Course");
    }

    const topic = await prisma.topic.create({
      data: {
        name: name,
        department: {
          connect: {
            id: course.id,
          },
        },
      },
    });

    return topic;
  } catch (err) {
    return null;
  }
};

export default createTopic;
