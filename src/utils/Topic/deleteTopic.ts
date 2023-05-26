import prisma from "src/utils/prisma";

const deleteTopic = async (id: string) => {
  try {
    const deletedTopic = await prisma.topic.delete({
      where: {
        id: id,
      },
    });

    return deletedTopic;
  } catch (err) {
    return null;
  }
};

export default deleteTopic;
