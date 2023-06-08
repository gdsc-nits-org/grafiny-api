import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const getCourse: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const courseId = req.query.id as string;
    if (!courseId) {
      throw new Error("Please Provide a Id");
    }
    const course = await Utils.Course.getCourse(courseId);

    return res.json(
      Utils.Response.success({
        course: course,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getCourse;
