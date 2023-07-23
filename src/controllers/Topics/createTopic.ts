import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const createTopic: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { name, id } = req.body as Interfaces.CourseAndTopic;

    if (!name || !id) {
      return res.json(Error.invalidDetails);
    }
    const course = await Utils.prisma.course.findFirst({
      where: {
        id,
      },
    });

    if (!course) {
      return res.json(Error.invalidDetails);
    }

    const existingTopic = await Utils.prisma.topic.findFirst({
      where: {
        name,
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
