import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const createCourse: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const data: Interfaces.Course = req.body;
    const name: string = data.name;
    const departmentId: string = req.body.instituteName;

    if (!name || !departmentId) {
      throw new Error("Please Provide department id and course name");
    }
    const course = await Utils.Course.createCourse(name, departmentId);
    if (course === null) {
      throw new Error("Could not create Course");
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

export default createCourse;
