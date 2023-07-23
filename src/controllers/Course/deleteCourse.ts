import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const deleteCourse: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const id: string = req.query.id as string;
    if (!id) {
      return res.json(Error.invalidDetails);
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
