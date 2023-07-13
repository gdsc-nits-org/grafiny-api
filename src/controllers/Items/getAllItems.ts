import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const getAllItems: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    if (!req.query.id) {
      const items = await Utils.prisma.items.findMany({
        include: {
          file: true,
          likedBy: true,
          dislikedBy: true,
          bookmarkedBy: true,
          profile: true,
        },
      });
      return res.json(
        Utils.Response.success({
          items,
        })
      );
    } else {
      const topicId = req.query.id as string;
      const items = await Utils.prisma.items.findMany({
        where: {
          topicId,
        },
        include: {
          file: true,
          likedBy: true,
          dislikedBy: true,
          bookmarkedBy: true,
          profile: true,
        },
      });

      return res.json(
        Utils.Response.success({
          items,
        })
      );
    }
  } catch (err) {
    return next(err);
  }
};

export default getAllItems;
