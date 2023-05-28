import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const searchCourse: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const courseId = req.query.id as string;
    if (!courseId) {
      throw new Error("Please Provide a Id");
    }
    const course = await Utils.Course.getCourse(courseId);
    if (!course) {
      throw new Error("No Course Found");
    }
    return res.json(
      Utils.Response.success({
        course: course,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default searchCourse;
