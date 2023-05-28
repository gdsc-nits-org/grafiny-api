import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const getAllCourses: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const departmentId: string = req.query.id as string;
    if (!departmentId) {
      throw new Error("Please Provide Department Id");
    }
    const courses = await Utils.Course.getAllCourses(departmentId);
    if (!courses) {
      throw new Error("No Courses Yet");
    }
    return res.json(
      Utils.Response.success({
        courses: courses,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getAllCourses;
