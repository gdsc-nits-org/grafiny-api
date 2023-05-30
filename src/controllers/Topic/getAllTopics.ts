import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const getAllTopics: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const courseId: string = req.query.id as string;
    if (!courseId) {
      throw new Error("Please Provide Course Id");
    }
    const topics = await Utils.Topic.getAllTopics(courseId);
    if (!topics) {
      throw new Error("No Topics Yet");
    }
    return res.json(
      Utils.Response.success({
        topics: topics,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getAllTopics;
