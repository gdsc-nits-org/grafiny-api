import prisma from "src/utils/prisma";

const getTopic = async (id: string) => {
  try {
    const topic = await prisma.topic.findFirst({
      where: {
        id: id,
      },
    });

    return topic;
  } catch (err) {
    return null;
  }
};

export default getTopic;
