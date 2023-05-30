import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const getTopic: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const topicId = req.query.id as string;
    if (!topicId) {
      throw new Error("Please Provide a Id");
    }
    const topic = await Utils.Topic.getTopic(topicId);
    if (!topic) {
      throw new Error("No Topic Found");
    }
    return res.json(
      Utils.Response.success({
        topic: topic,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getTopic;
