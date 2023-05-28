import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const deleteCourse: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const courseId: string = req.query.id as string;
    if (!courseId) {
      throw new Error("Please Provide a Course Id");
    }
    const deletedCourse = await Utils.Course.deleteCourse(courseId);

    if (deletedCourse === null) {
      throw new Error("Course Could not be deleted");
    }

    return res.json(
      Utils.Response.success({
        msg: deletedCourse,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default deleteCourse;
