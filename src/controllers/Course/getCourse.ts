import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";
import { invalidDetails } from "src/globals/errors";

const getCourse: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const id = req.query.id as string;
    if (!id) {
      return res.json(invalidDetails);
    }
    const course = await Utils.prisma.course.findFirst({
      where: {
        id,
      },
      include: {
        topic: true,
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

export default getCourse;
