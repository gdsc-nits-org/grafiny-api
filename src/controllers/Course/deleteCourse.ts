import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const deleteCourse: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const id: string = req.query.id as string;
    if (!id) {
      throw new Error("Please Provide a Course Id");
    }
    const deletedCourse = await Utils.prisma.course.delete({
      where: {
        id,
      },
    });

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
