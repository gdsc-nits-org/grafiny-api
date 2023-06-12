import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";
import { invalidDetails } from "src/globals/errors";

const getAllCourses: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const id: string = req.query.id as string;
    if (!id) {
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

    const courses = await Utils.prisma.course.findMany({
      where: {
        departmentId: department.id,
      },
      include: {
        topic: true,
      },
    });

    return res.json(
      Utils.Response.success({
        courses,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getAllCourses;
