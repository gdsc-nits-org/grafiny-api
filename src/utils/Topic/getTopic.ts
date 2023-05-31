import prisma from "src/utils/prisma";

const getTopic = async (id: string) => {
  try {
    const topic = await prisma.topic.findFirst({
      where: {
        id: id,
      },
      include: {
        items: true,
      },
    });

    return topic;
  } catch (err) {
    return null;
  }
};

export default getTopic;
