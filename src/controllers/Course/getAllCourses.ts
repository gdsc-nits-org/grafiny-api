import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const getAllCourses: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const id: string = req.query.id as string;
    if (!id) {
      throw new Error("Please Provide Department Id");
    }
    const department = await Utils.prisma.department.findFirst({
      where: {
        id,
      },
    });

    if (!department) {
      throw new Error("No Such Department");
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
