import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const createCourse: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const data: Interfaces.CourseAndTopic = req.body;
    const name: string = data.name;
    const departmentId: string = req.body.departmentId;

    if (!name || !departmentId) {
      throw new Error("Please Provide department id and course name");
    }
    const course = await Utils.Course.createCourse(name, departmentId);

    return res.json(
      Utils.Response.success({
        course: course,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default createCourse;
