import { invalidDetails } from "src/globals/errors";
import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const createTopic: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { name, id } = req.body as Interfaces.CourseAndTopic;

    if (!name || !id) {
      return res.json(invalidDetails);
    }
    const course = await Utils.prisma.course.findFirst({
      where: {
        id,
      },
    });

    if (!course) {
      return res.json(invalidDetails);
    }

    const existingTopic = await Utils.prisma.topic.findFirst({
      where: {
        name: name,
        courseId: course.id,
      },
    });

    if (existingTopic) {
      return res.json(
        Utils.Response.error(
          "Topic With This Name Already Exists. Please Try a With Different Name",
          409
        )
      );
    }

    const topic = await Utils.prisma.topic.create({
      data: {
        name,
        course: {
          connect: {
            id: course.id,
          },
        },
      },
    });

    return res.json(
      Utils.Response.success({
        topic,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default createTopic;
