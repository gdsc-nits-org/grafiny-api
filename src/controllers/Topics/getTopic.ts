import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";
import * as Error from "../../globals/errors/index";

const getTopic: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const topicId = req.query.id as string;
    if (!topicId) {
      return res.json(Error.invalidDetails);
    }
    const topic = await Utils.prisma.topic.findFirst({
      where: {
        id: topicId,
      },
      include: {
        items: true,
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

export default getTopic;
