import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const createCourse: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { name, id } = req.body as Interfaces.CourseAndTopic;

    if (!name || !id) {
      throw new Error("Please Provide department id and course name");
    }

    const department = await Utils.prisma.department.findFirst({
      where: {
        id,
      },
    });

    if (!department) {
      throw new Error("No Such Department Found!!!");
    }

    const course = await Utils.prisma.course.create({
      data: {
        name,
        department: {
          connect: {
            id: department.id,
          },
        },
      },
    });

    return res.json(
      Utils.Response.success({
        course,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default createCourse;
