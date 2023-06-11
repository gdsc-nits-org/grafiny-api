import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const createTopic: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const { name, id } = req.body as Interfaces.CourseAndTopic;

    if (!name || !id) {
      throw new Error("Please Provide course id and topic name");
    }
    const course = await Utils.prisma.course.findFirst({
      where: {
        id,
      },
    });

    if (!course) {
      throw new Error("No Such Course");
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

    if (!topic) {
      throw new Error("Could not create Topic");
    }

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
