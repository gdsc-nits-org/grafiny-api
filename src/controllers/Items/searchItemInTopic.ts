import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";
import * as Error from "../../globals/errors/index";

const searchItemsByNameInTopic: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const { name, topicId } = req.body as Interfaces.Item;
    if (!name || !topicId) {
      return res.json(Error.invalidDetails);
    }
    const items = await Utils.prisma.items.findMany({
      where: {
        AND: [
          { topicId },
          {
            name: {
              contains: name,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        file: true,
        profile: true,
        likedBy: true,
        dislikedBy: true,
        bookmarkedBy: true,
      },
    });

    return res.json(
      Utils.Response.success({
        items,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default searchItemsByNameInTopic;
