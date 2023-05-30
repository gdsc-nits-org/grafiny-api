import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const createTopic: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const data: Interfaces.CourseAndTopic = req.body;
    const name: string = data.name;
    const courseId: string = req.body.courseId;

    if (!name || !courseId) {
      throw new Error("Please Provide course id and topic name");
    }
    const topic = await Utils.Topic.createTopic(name, courseId);
    if (topic === null) {
      throw new Error("Could not create Course");
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

export default createTopic;
