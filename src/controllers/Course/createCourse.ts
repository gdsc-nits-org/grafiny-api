import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";
import { invalidDetails } from "src/globals/errors";

const createCourse: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { name, id } = req.body as Interfaces.CourseAndTopic;

    if (!name || !id) {
      return res.json(invalidDetails);
    }

    const department = await Utils.prisma.department.findFirst({
      where: {
        id,
      },
    });

    if (!department) {
      return res.json(invalidDetails);
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
