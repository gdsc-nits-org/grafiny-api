import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const deleteTopic: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const topicId: string = req.query.id as string;
    if (!topicId) {
      throw new Error("Please Provide a Topic Id");
    }
    const deletedTopic = await Utils.prisma.topic.delete({
      where: {
        id: topicId,
      },
    });

    if (!deletedTopic) {
      throw new Error("Topic Could not be deleted");
    }

    return res.json(
      Utils.Response.success({
        msg: deletedTopic,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default deleteTopic;
