import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";
import { invalidDetails } from "src/globals/errors";

const getAllTopics: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const courseId: string = req.query.id as string;
    if (!courseId) {
      return res.json(invalidDetails);
    }
    const course = await Utils.prisma.course.findFirst({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return res.json(invalidDetails);
    }

    const topics = await Utils.prisma.topic.findMany({
      where: {
        courseId: course.id,
      },
      include: {
        items: true,
      },
    });

    return res.json(
      Utils.Response.success({
        topics,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getAllTopics;
