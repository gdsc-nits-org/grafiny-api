import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const getAllTopics: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const courseId: string = req.query.id as string;
    if (!courseId) {
      throw new Error("Please Provide Course Id");
    }
    const course = await Utils.prisma.course.findFirst({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new Error("No Such Course");
    }

    const topics = await Utils.prisma.topic.findMany({
      where: {
        courseId: course.id,
      },
      include: {
        items: true,
      },
    });

    if (!topics) {
      throw new Error("No Topics Yet");
    }
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
